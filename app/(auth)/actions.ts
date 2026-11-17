"use server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { supabaseServeur } from "@/lib/supabase/serveur";
import { NIVEAUX } from "@/lib/marque";

const fin = (base: string, msg: string): never => redirect(`${base}?erreur=${encodeURIComponent(msg)}`);

const Inscription = z.object({
  prenom: z.string().trim().min(2).max(60), nom: z.string().trim().min(2).max(60),
  email: z.string().trim().email(), motdepasse: z.string().min(8, "8 caractères minimum").max(72),
  niveau: z.enum(NIVEAUX.map((n) => n.slug) as [string, ...string[]]),
  telephone_parent: z.string().trim().regex(/^\+?[0-9 ]{8,16}$/, "Numéro de téléphone invalide"),
  consentement: z.literal("on", { errorMap: () => ({ message: "Le consentement du parent est obligatoire" }) }),
});

export async function inscrire(fd: FormData) {
  const r = Inscription.safeParse(Object.fromEntries(fd));
  if (!r.success) return fin("/inscription", r.error.issues[0].message);
  const { email, motdepasse, ...meta } = r.data;
  const supabase = await supabaseServeur();
  const { data, error } = await supabase.auth.signUp({ email, password: motdepasse, options: { data: meta } });
  if (error) return fin("/inscription", "Inscription impossible. Vérifiez vos informations ou connectez-vous.");
  if (!data.session) redirect("/connexion?info=" + encodeURIComponent("Compte créé. Confirmez votre adresse e-mail grâce au message reçu, puis connectez-vous."));
  redirect("/eleve");
}

export async function connecter(fd: FormData) {
  const email = String(fd.get("email") ?? ""), password = String(fd.get("motdepasse") ?? "");
  const supabase = await supabaseServeur();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return fin("/connexion", "E-mail ou mot de passe incorrect.");
  redirect("/eleve");
}

export async function deconnecter() {
  const supabase = await supabaseServeur();
  await supabase.auth.signOut();
  redirect("/");
}
