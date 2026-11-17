import type { Metadata } from "next";
import PageTexte from "@/components/layout/PageTexte";
export const metadata: Metadata = { title: "Les ressources" };
const T = ["Cours complets", "Fiches de révision", "Résumés de chapitres", "Définitions importantes", "Exemples expliqués", "Exercices d'application", "Exercices d'approfondissement", "Corrigés détaillés", "Évaluations", "Sujets d'entraînement", "Quiz interactifs"];
export default function Page() {
  return (<PageTexte titre="Les ressources"><p>Chaque matière réunit :</p>
    <ul className="grid gap-2 sm:grid-cols-2">{T.map((t) => <li key={t} className="rounded-lg bg-white px-4 py-2 shadow-carte">{t}</li>)}</ul></PageTexte>);
}
