import type { Metadata } from "next";
import Link from "next/link";
import { OFFRES_PAR_DEFAUT } from "@/lib/marque";

export const metadata: Metadata = { title: "Tarifs et abonnements" };

// Phase 6 : les offres seront lues depuis la table "offres" (modifiables en admin).
export default function Tarifs() {
  return (
    <section className="conteneur py-14">
      <h1 className="text-3xl sm:text-4xl">Tarifs et abonnements</h1>
      <p className="mt-3 max-w-2xl text-marine/75">Paiement par Wave ou Orange Money. L'accès est activé dès que le paiement est confirmé.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {OFFRES_PAR_DEFAUT.map((o) => (
          <article key={o.code} className={`carte flex flex-col p-6 ${o.code === "premium" ? "ring-2 ring-soleil" : ""}`}>
            <h2 className="text-xl">{o.nom}</h2>
            <p className="mt-3 text-3xl font-extrabold text-turquoise">{o.prixFcfa.toLocaleString("fr-FR")} <span className="text-sm">FCFA</span></p>
            <Link href={`/eleve/abonnement?offre=${o.code}`} className="btn btn-primaire mt-auto">Choisir</Link>
          </article>
        ))}
      </div>
    </section>
  );
}
