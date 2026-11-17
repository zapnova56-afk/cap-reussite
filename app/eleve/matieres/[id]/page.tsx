import { notFound } from "next/navigation";
import Link from "next/link";
import { supabaseServeur } from "@/lib/supabase/serveur";

const LIBELLE: Record<string, string> = {
  cours: "Cours", fiche_revision: "Fiche de révision", resume: "Résumé", definitions: "Définitions", exemples: "Exemples",
  exercices_application: "Exercices d'application", exercices_approfondissement: "Approfondissement", corrige: "Corrigé",
  evaluation: "Évaluation", sujet_entrainement: "Sujet d'entraînement", quiz: "Quiz",
};

export default async function Matiere({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ type?: string }> }) {
  const { id } = await params; const { type } = await searchParams;
  const supabase = await supabaseServeur();
  const { data: m } = await supabase.from("matieres").select("nom").eq("id", Number(id)).maybeSingle();
  if (!m) notFound();
  const { data: chapitres } = await supabase.from("chapitres").select("id, titre, ressources(id, titre, type)").eq("matiere_id", Number(id)).order("ordre");
  const aDesRessources = chapitres?.some((c) => c.ressources.length);
  return (<>
    <Link href="/eleve/matieres" className="text-sm text-turquoise">← Mes matières</Link>
    <h1 className="mt-2 text-2xl sm:text-3xl">{m.nom}</h1>
    <div className="mt-4 flex flex-wrap gap-2 text-sm">
      <Link href={`/eleve/matieres/${id}`} className={`rounded-full px-3 py-1 ${!type ? "bg-marine text-white" : "bg-white"}`}>Tout</Link>
      {Object.entries(LIBELLE).map(([k, v]) => (
        <Link key={k} href={`?type=${k}`} className={`rounded-full px-3 py-1 ${type === k ? "bg-marine text-white" : "bg-white"}`}>{v}</Link>))}
    </div>
    {!aDesRessources && <p className="carte mt-6 p-5 text-sm">Aucun document accessible pour le moment. Vérifiez que votre <Link href="/tarifs" className="font-semibold text-turquoise underline">abonnement</Link> est actif.</p>}
    <div className="mt-6 space-y-4">{chapitres?.map((c) => {
      const docs = c.ressources.filter((r) => !type || r.type === type);
      return docs.length ? (<section key={c.id} className="carte p-5"><h2 className="text-lg">{c.titre}</h2>
        <ul className="mt-3 divide-y divide-marine/10">{docs.map((r) => (
          <li key={r.id} className="flex items-center justify-between gap-3 py-2 text-sm">
            <span><span className="mr-2 rounded bg-turquoise-50 px-2 py-0.5 text-xs text-turquoise-700">{LIBELLE[r.type]}</span>{r.titre}</span>
            <span className="flex gap-3 whitespace-nowrap"><a href={`/api/documents/${r.id}`} target="_blank" className="font-semibold text-turquoise">Ouvrir</a>
              <a href={`/api/documents/${r.id}?telecharger=1`} className="text-marine/60">Télécharger</a></span></li>))}
        </ul></section>) : null; })}</div></>);
}
