import Link from "next/link";
import { MARQUE, NIVEAUX, OFFRES_PAR_DEFAUT } from "@/lib/marque";

const AVANTAGES = [
  ["Tout au même endroit", "Cours, fiches, exercices, corrigés et évaluations classés par classe, matière et chapitre."],
  ["Pensé pour le téléphone", "Pages légères, lecture simple, téléchargement facile même avec une connexion lente."],
  ["Corrigés détaillés", "Chaque exercice est accompagné d'un corrigé expliqué pas à pas."],
  ["Un suivi clair", "Favoris, historique et progression pour savoir où l'élève en est."],
];

export default function Accueil() {
  return (
    <>
      <section className="bg-gradient-to-b from-white to-nuage">
        <div className="conteneur py-16 sm:py-24">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-turquoise">La bibliothèque scolaire numérique</p>
          <h1 className="max-w-3xl text-4xl leading-tight sm:text-5xl">{MARQUE.slogan}</h1>
          <p className="mt-5 max-w-xl text-lg text-marine/80">Les ressources dont chaque élève sénégalais a besoin, de la 6e à la Seconde, accessibles à tout moment.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/inscription" className="btn btn-primaire">Créer un compte</Link>
            <Link href="/ressources" className="btn btn-contour">Découvrir les ressources</Link>
          </div>
        </div>
      </section>

      <section className="conteneur py-14">
        <h2 className="text-2xl sm:text-3xl">Choisissez votre classe</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {NIVEAUX.map((n) => (
            <Link key={n.slug} href={`/classes#${n.slug}`} className="carte border-b-4 border-turquoise p-5 text-center transition hover:-translate-y-1">
              <span className="block text-3xl font-extrabold text-turquoise">{n.nom}</span>
              <span className="mt-1 block text-xs font-medium text-marine/70">{n.libelle}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-nuage py-14">
        <div className="conteneur">
          <h2 className="text-2xl sm:text-3xl">Pourquoi CAP RÉUSSITE ?</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {AVANTAGES.map(([t, d]) => (
              <div key={t} className="carte p-6"><h3 className="text-lg">{t}</h3><p className="mt-2 text-sm text-marine/75">{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="conteneur py-14">
        <h2 className="text-2xl sm:text-3xl">Nos offres</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {OFFRES_PAR_DEFAUT.map((o) => (
            <div key={o.code} className="carte p-6">
              <h3>{o.nom}</h3>
              <p className="mt-2 text-3xl font-extrabold text-turquoise">{o.prixFcfa.toLocaleString("fr-FR")} <span className="text-sm">FCFA</span></p>
            </div>
          ))}
        </div>
        <Link href="/tarifs" className="btn btn-secondaire mt-6">Comparer les offres</Link>
      </section>
    </>
  );
}
