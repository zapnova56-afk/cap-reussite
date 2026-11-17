import { exigerAdmin } from "@/lib/admin";

export default async function Eleves() {
  const { supabase } = await exigerAdmin();
  const [{ data: eleves }, { data: abos }] = await Promise.all([
    supabase.from("profils").select("id, prenom, nom, telephone_parent, created_at, niveaux(nom)").eq("role", "eleve").order("created_at", { ascending: false }).limit(200),
    supabase.from("abonnements").select("profil_id, fin, offres(nom)").gt("fin", new Date().toISOString())]);
  const actif = new Map(abos?.map((a) => [a.profil_id, a]));
  return (<><h1 className="text-2xl sm:text-3xl">Élèves ({eleves?.length ?? 0})</h1>
    <div className="carte mt-6 overflow-x-auto"><table className="w-full text-left text-sm"><thead className="border-b border-marine/10 text-marine/60">
      <tr><th className="p-3">Élève</th><th className="p-3">Classe</th><th className="p-3">Tél. parent</th><th className="p-3">Abonnement</th></tr></thead><tbody>
      {eleves?.map((e) => { const a = actif.get(e.id); const o = (a?.offres as unknown as { nom: string } | null)?.nom;
        return (<tr key={e.id} className="border-b border-marine/5"><td className="p-3 font-medium">{e.prenom} {e.nom}</td>
          <td className="p-3">{(e.niveaux as unknown as { nom: string } | null)?.nom ?? "—"}</td><td className="p-3">{e.telephone_parent}</td>
          <td className="p-3">{a ? `${o} · jusqu'au ${new Date(a.fin).toLocaleDateString("fr-FR")}` : "Aucun"}</td></tr>); })}
    </tbody></table></div></>);
}
