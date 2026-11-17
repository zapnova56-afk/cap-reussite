import type { Metadata } from "next";
import Link from "next/link";
import { NIVEAUX } from "@/lib/marque";
export const metadata: Metadata = { title: "Nos classes" };
export default function Page() {
  return (<section className="conteneur py-14"><h1 className="text-3xl sm:text-4xl">Nos classes</h1>
    <div className="mt-8 grid gap-4 sm:grid-cols-2">{NIVEAUX.map((n) => (
      <div key={n.slug} id={n.slug} className="carte border-l-4 border-turquoise p-6"><h2 className="text-xl">{n.libelle}</h2>
        <p className="mt-2 text-sm text-marine/75">Cours, fiches, exercices, corrigés et évaluations de la classe de {n.nom}.</p>
        <Link href="/inscription" className="btn btn-secondaire mt-4 !py-2">Rejoindre cet espace</Link></div>))}
    </div></section>);
}
