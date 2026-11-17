import { exigerAdmin } from "@/lib/admin";
import { majOffre } from "./actions";
import { Erreur } from "@/components/ui/Champ";

const I = "mt-1 w-full rounded-lg border border-marine/20 bg-white px-3 py-2";
export default async function Offres({ searchParams }: { searchParams: Promise<{ erreur?: string; ok?: string }> }) {
  const { erreur, ok } = await searchParams;
  const { supabase } = await exigerAdmin();
  const { data: offres } = await supabase.from("offres").select("*").order("prix_fcfa");
  return (<><h1 className="text-2xl sm:text-3xl">Offres et tarifs</h1>
    <p className="mt-2 text-sm text-marine/70">Un nouveau prix s'applique aux prochains achats uniquement.</p>
    <div className="mt-4 space-y-3"><Erreur message={erreur} />{ok && <p className="rounded-lg bg-turquoise-50 px-3 py-2 text-sm">{ok}</p>}</div>
    <div className="mt-6 grid gap-4 md:grid-cols-2">{offres?.map((o) => (
      <form key={o.id} action={majOffre} className="carte space-y-3 p-5 text-sm"><input type="hidden" name="id" value={o.id} />
        <label className="block font-medium">Nom<input name="nom" defaultValue={o.nom} required className={I} /></label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block font-medium">Prix (FCFA)<input name="prix_fcfa" type="number" min={0} step={100} defaultValue={o.prix_fcfa} required className={I} /></label>
          <label className="block font-medium">Durée (jours)<input name="duree_jours" type="number" min={1} defaultValue={o.duree_jours} required className={I} /></label></div>
        <label className="flex gap-2"><input type="checkbox" name="telechargement" defaultChecked={o.telechargement} className="accent-turquoise" /> Téléchargement des PDF inclus</label>
        <label className="flex gap-2"><input type="checkbox" name="actif" defaultChecked={o.actif} className="accent-turquoise" /> Offre en vente</label>
        <button className="btn btn-secondaire !py-2">Enregistrer</button></form>))}</div></>);
}
