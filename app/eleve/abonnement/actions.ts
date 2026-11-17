"use server";
import { redirect } from "next/navigation";
import { supabaseServeur } from "@/lib/supabase/serveur";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { creerSessionWave } from "@/lib/paiement/wave";

export async function acheter(fd: FormData) {
  const supabase = await supabaseServeur();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/connexion");
  // Le PRIX vient de la base, jamais du navigateur.
  const { data: offre } = await supabase.from("offres").select("id, prix_fcfa").eq("code", String(fd.get("offre"))).eq("actif", true).maybeSingle();
  if (!offre) redirect("/eleve/abonnement?erreur=Offre+introuvable");

  const db = supabaseAdmin();
  const { data: p, error } = await db.from("paiements").insert({ profil_id: user.id, offre_id: offre.id, montant_fcfa: offre.prix_fcfa, fournisseur: "wave" }).select("id").single();
  if (error || !p) redirect("/eleve/abonnement?erreur=Paiement+impossible");

  let url: string;
  try {
    const site = process.env.NEXT_PUBLIC_SITE_URL!;
    const s = await creerSessionWave({ montant: offre.prix_fcfa, reference: p.id, succes: `${site}/eleve/abonnement?retour=succes`, erreur: `${site}/eleve/abonnement?erreur=Paiement+annul%C3%A9` });
    await db.from("paiements").update({ reference_fournisseur: s.id }).eq("id", p.id);
    url = s.wave_launch_url;
  } catch {
    await db.from("paiements").update({ statut: "echoue" }).eq("id", p.id);
    redirect("/eleve/abonnement?erreur=Wave+est+indisponible,+r%C3%A9essayez");
  }
  redirect(url);
}
