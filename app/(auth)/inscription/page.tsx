import type { Metadata } from "next";
import Link from "next/link";
import { inscrire } from "../actions";
import { Champ, Erreur } from "@/components/ui/Champ";
import { NIVEAUX } from "@/lib/marque";

export const metadata: Metadata = { title: "Inscription" };

export default async function Inscription({ searchParams }: { searchParams: Promise<{ erreur?: string }> }) {
  const { erreur } = await searchParams;
  return (
    <div className="carte mx-auto w-full max-w-lg p-6 sm:p-8">
      <h1 className="text-2xl">Créer mon compte élève</h1>
      <form action={inscrire} className="mt-6 space-y-4">
        <Erreur message={erreur} />
        <div className="grid gap-4 sm:grid-cols-2"><Champ label="Prénom" name="prenom" autoComplete="given-name" /><Champ label="Nom" name="nom" autoComplete="family-name" /></div>
        <Champ label="Adresse e-mail" name="email" type="email" autoComplete="email" />
        <Champ label="Mot de passe (8 caractères minimum)" name="motdepasse" type="password" minLength={8} autoComplete="new-password" />
        <label className="block text-sm font-medium">Ma classe
          <select name="niveau" required className="mt-1 w-full rounded-lg border border-marine/20 bg-white px-3 py-2.5 text-base">
            {NIVEAUX.map((n) => <option key={n.slug} value={n.slug}>{n.nom}</option>)}
          </select>
        </label>
        <Champ label="Téléphone d'un parent ou tuteur" name="telephone_parent" type="tel" placeholder="+221 77 000 00 00" autoComplete="tel" />
        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" name="consentement" required className="mt-1 h-4 w-4 accent-turquoise" />
          <span>Je confirme que mon parent ou tuteur est informé de mon inscription et accepte les <Link href="/cgu" className="underline">conditions</Link> et la <Link href="/confidentialite" className="underline">politique de confidentialité</Link>.</span>
        </label>
        <button className="btn btn-primaire w-full">Créer mon compte</button>
      </form>
      <p className="mt-4 text-center text-sm">Déjà inscrit ? <Link href="/connexion" className="font-semibold text-turquoise">Connexion</Link></p>
    </div>
  );
}
