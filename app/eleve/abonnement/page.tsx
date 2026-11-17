import { supabaseServeur } from "@/lib/supabase/serveur";
import { acheter } from "./actions";
import { Erreur } from "@/components/ui/Champ";

export const metadata = { title: "Mon abonnement" };

export default async function Abonnement({ searchParams }: { searchParams: Promise<{ erreur?: string; retour?: string; offre?: string }> }) {
  const { erreur, retour, offre } = await searchParams;
  const supabase = await supabaseServeur();
  const { data: offres } = await supabase.from("offres").select("code, nom, prix_fcfa, duree_jours").eq("actif", true).order("prix_fcfa");
  const { data: recus } = await supabase.from("paiements").select("id, montant_fcfa, statut, recu_numero, created_at").order("created_at", { ascending: false }).limit(10);
  return (<><h1 className="text-2xl sm:text-3xl">Mon abonnement</h1>
    <div className="mt-4 space-y-3"><Erreur message={erreur} />
      {retour === "succes" && <p className="rounded-lg bg-turquoise-50 p-3 text-sm">Merci ! Nous vérifions votre paiement auprès de Wave. Votre accès s'active dès sa confirmation (quelques instants). Actualisez la page pour voir votre abonnement.</p>}</div>
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{offres?.map((o) => (
      <form key={o.code} action={acheter} className={`carte flex flex-col p-6 ${offre === o.code ? "ring-2 ring-soleil" : ""}`}>
        <input type="hidden" name="offre" value={o.code} /><h2 className="text-xl">{o.nom}</h2>
        <p className="mt-2 text-3xl font-extrabold text-turquoise">{o.prix_fcfa.toLocaleString("fr-FR")} <span className="text-sm">FCFA</span></p>
        <p className="mb-4 text-xs text-marine/60">Accès {o.duree_jours} jours</p>
        <button className="btn btn-primaire mt-auto">Payer avec Wave</button></form>))}</div>
    <h2 className="mt-10 text-lg">Mes paiements</h2>
    <ul className="carte mt-3 divide-y divide-marine/10 text-sm">{recus?.map((r) => (
      <li key={r.id} className="flex justify-between p-3"><span>{new Date(r.created_at).toLocaleDateString("fr-FR")} · {r.montant_fcfa.toLocaleString("fr-FR")} FCFA</span>
        <span>{r.statut === "confirme" ? `Confirmé · reçu ${r.recu_numero}` : r.statut === "en_attente" ? "En attente" : "Non abouti"}</span></li>))}
      {!recus?.length && <li className="p-3 text-marine/60">Aucun paiement.</li>}</ul></>);
}
