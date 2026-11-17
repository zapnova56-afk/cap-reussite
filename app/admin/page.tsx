import { exigerAdmin } from "@/lib/admin";

export default async function Admin() {
  const { supabase } = await exigerAdmin();
  const compte = async (t: string, f?: (q: any) => any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    let q = supabase.from(t).select("*", { count: "exact", head: true }); if (f) q = f(q); return (await q).count ?? 0; };
  const [eleves, docs, abos, paiements] = await Promise.all([
    compte("profils", (q) => q.eq("role", "eleve")), compte("ressources"),
    compte("abonnements", (q) => q.gt("fin", new Date().toISOString())), compte("paiements", (q) => q.eq("statut", "confirme"))]);
  const K = [["Élèves inscrits", eleves], ["Documents", docs], ["Abonnements actifs", abos], ["Paiements confirmés", paiements]] as const;
  return (<><h1 className="text-2xl sm:text-3xl">Tableau de bord</h1>
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{K.map(([l, v]) => (
      <div key={l} className="carte p-6"><p className="text-sm text-marine/70">{l}</p><p className="text-3xl font-extrabold text-turquoise">{v}</p></div>))}</div></>);
}
