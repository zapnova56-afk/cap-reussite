import type { Metadata } from "next";
import PageTexte from "@/components/layout/PageTexte";
export const metadata: Metadata = { title: "FAQ" };
const Q = [
  ["Comment payer ?", "Par Wave ou Orange Money. L'accès est activé dès que le prestataire confirme le paiement."],
  ["Qui peut s'inscrire ?", "Les élèves de la 6e à la Seconde, avec l'accord d'un parent ou tuteur."],
  ["Puis-je lire sur téléphone ?", "Oui, le site est conçu pour les smartphones et les connexions lentes."],
  ["Puis-je télécharger les documents ?", "Selon l'offre choisie. Les détails figurent sur la page Tarifs."],
];
export default function Page() {
  return (<PageTexte titre="Questions fréquentes">{Q.map(([q, r]) => (
    <details key={q} className="carte p-4"><summary className="cursor-pointer font-semibold">{q}</summary><p className="mt-2 text-sm">{r}</p></details>))}</PageTexte>);
}
