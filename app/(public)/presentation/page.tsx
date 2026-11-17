import type { Metadata } from "next";
import PageTexte from "@/components/layout/PageTexte";
export const metadata: Metadata = { title: "Présentation" };
export default function Page() {
  return (<PageTexte titre="Présentation de CAP RÉUSSITE">
    <p>CAP RÉUSSITE est une bibliothèque scolaire numérique créée pour les élèves du Sénégal, de la 6e à la Seconde.</p>
    <p>Notre mission : aider chaque élève à apprendre, comprendre, s'entraîner et réussir, grâce à des ressources claires, organisées par classe, matière et chapitre.</p>
  </PageTexte>);
}
