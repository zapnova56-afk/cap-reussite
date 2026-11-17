import type { Metadata } from "next";
import { envoyerMessage } from "./actions";
import { Champ, Erreur } from "@/components/ui/Champ";
export const metadata: Metadata = { title: "Contact" };
export default async function Page({ searchParams }: { searchParams: Promise<{ erreur?: string; ok?: string }> }) {
  const { erreur, ok } = await searchParams;
  return (<section className="conteneur max-w-xl py-14"><h1 className="text-3xl sm:text-4xl">Contact</h1>
    {ok && <p className="mt-4 rounded-lg bg-turquoise-50 p-3 text-sm">Merci, votre message a bien été envoyé.</p>}
    <form action={envoyerMessage} className="mt-6 space-y-4"><Erreur message={erreur} />
      <Champ label="Nom" name="nom" /><Champ label="Adresse e-mail" name="email" type="email" />
      <label className="block text-sm font-medium">Message<textarea name="message" required rows={5} className="mt-1 w-full rounded-lg border border-marine/20 px-3 py-2.5" /></label>
      <button className="btn btn-secondaire">Envoyer</button></form></section>);
}
