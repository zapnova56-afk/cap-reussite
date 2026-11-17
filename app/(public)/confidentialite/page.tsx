import type { Metadata } from "next";
import PageTexte from "@/components/layout/PageTexte";
export const metadata: Metadata = { title: "Politique de confidentialité" };
export default function Page() {
  return (<PageTexte titre="Politique de confidentialité">
    <p className="rounded-lg bg-soleil-50 p-3 text-sm">Texte provisoire à faire relire par un juriste avant la mise en ligne.</p>
    <p>Nous collectons le minimum : prénom, nom, e-mail, classe et téléphone d'un parent. Ces données servent uniquement au fonctionnement du service et ne sont jamais vendues.</p>
  </PageTexte>);
}
