import type { Metadata } from "next";
import PageTexte from "@/components/layout/PageTexte";
export const metadata: Metadata = { title: "Conditions générales d'utilisation" };
export default function Page() {
  return (<PageTexte titre="Conditions générales d'utilisation">
    <p className="rounded-lg bg-soleil-50 p-3 text-sm">Texte provisoire à faire relire par un juriste avant la mise en ligne.</p>
    <p>L'accès est personnel et réservé à l'élève inscrit. Le partage de compte ou la diffusion des documents est interdit. Les abonnements sont activés après confirmation du paiement par le prestataire.</p>
  </PageTexte>);
}
