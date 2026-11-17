import { exigerAdmin } from "@/lib/admin";
import { ajouterDocument } from "./actions";
import { Champ, Erreur } from "@/components/ui/Champ";
import { TYPES_RESSOURCE } from "@/lib/marque";

export default async function Documents({ searchParams }: { searchParams: Promise<{ erreur?: string; ok?: string }> }) {
  const { erreur, ok } = await searchParams;
  const { supabase } = await exigerAdmin();
  const { data: chapitres } = await supabase.from("chapitres").select("id, titre, matieres(nom, niveaux(nom))").order("matiere_id").order("ordre");
  const { data: docs } = await supabase.from("ressources").select("id, titre, type, publie").order("created_at", { ascending: false }).limit(20);
  const lib = (c: { titre: string; matieres: unknown }) => { const m = c.matieres as { nom: string; niveaux: { nom: string } }; return `${m.niveaux.nom} · ${m.nom} · ${c.titre}`; };
  return (<><h1 className="text-2xl sm:text-3xl">Ajouter un document</h1>
    <form action={ajouterDocument} className="carte mt-6 max-w-xl space-y-4 p-6">
      <Erreur message={erreur} />{ok && <p className="rounded-lg bg-turquoise-50 px-3 py-2 text-sm">{ok}</p>}
      <label className="block text-sm font-medium">Chapitre
        <select name="chapitre_id" required className="mt-1 w-full rounded-lg border border-marine/20 bg-white px-3 py-2.5">
          {chapitres?.map((c) => <option key={c.id} value={c.id}>{lib(c)}</option>)}</select></label>
      <label className="block text-sm font-medium">Type
        <select name="type" required className="mt-1 w-full rounded-lg border border-marine/20 bg-white px-3 py-2.5">
          {TYPES_RESSOURCE.map((t) => <option key={t} value={t}>{t.replaceAll("_", " ")}</option>)}</select></label>
      <Champ label="Titre du document" name="titre" />
      <label className="block text-sm font-medium">Fichier PDF<input type="file" name="fichier" accept="application/pdf" required className="mt-1 block w-full text-sm" /></label>
      <label className="flex gap-2 text-sm"><input type="checkbox" name="publie" className="accent-turquoise" /> Publier immédiatement</label>
      <label className="flex gap-2 text-sm"><input type="checkbox" name="telechargeable" defaultChecked className="accent-turquoise" /> Téléchargement autorisé</label>
      <button className="btn btn-primaire">Ajouter</button></form>
    <h2 className="mt-10 text-lg">Derniers documents</h2>
    <ul className="carte mt-3 divide-y divide-marine/10 text-sm">{docs?.map((d) => (
      <li key={d.id} className="flex justify-between p-3"><span>{d.titre} <em className="text-marine/50">({d.type})</em></span><span>{d.publie ? "Publié" : "Brouillon"}</span></li>))}
      {!docs?.length && <li className="p-3 text-marine/60">Aucun document pour le moment.</li>}</ul></>);
}
