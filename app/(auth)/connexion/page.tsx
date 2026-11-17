import type { Metadata } from "next";
import Link from "next/link";
import { connecter } from "../actions";
import { Champ, Erreur } from "@/components/ui/Champ";

export const metadata: Metadata = { title: "Connexion" };

export default async function Connexion({ searchParams }: { searchParams: Promise<{ erreur?: string; info?: string }> }) {
  const { erreur, info } = await searchParams;
  return (
    <div className="carte mx-auto w-full max-w-md p-6 sm:p-8">
      <h1 className="text-2xl">Connexion</h1>
      <form action={connecter} className="mt-6 space-y-4">
        <Erreur message={erreur} />
        {info && <p className="rounded-lg bg-turquoise-50 px-3 py-2 text-sm">{info}</p>}
        <Champ label="Adresse e-mail" name="email" type="email" autoComplete="email" />
        <Champ label="Mot de passe" name="motdepasse" type="password" autoComplete="current-password" />
        <button className="btn btn-secondaire w-full">Me connecter</button>
      </form>
      <p className="mt-4 text-center text-sm">Pas encore de compte ? <Link href="/inscription" className="font-semibold text-turquoise">S'inscrire</Link></p>
    </div>
  );
}
