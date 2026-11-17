"use server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { exigerAdmin } from "@/lib/admin";

const S = z.object({ id: z.coerce.number().int().positive(), nom: z.string().trim().min(2).max(40),
  prix_fcfa: z.coerce.number().int().min(0).max(1_000_000), duree_jours: z.coerce.number().int().min(1).max(730) });

export async function majOffre(fd: FormData) {
  const { supabase } = await exigerAdmin();
  const r = S.safeParse(Object.fromEntries(fd));
  if (!r.success) redirect("/admin/offres?erreur=" + encodeURIComponent("Valeurs invalides"));
  const { id, ...champs } = r.data;
  // Un nouveau prix ne concerne que les achats futurs : les paiements passés gardent leur montant.
  const { error } = await supabase.from("offres").update({ ...champs, telechargement: fd.get("telechargement") === "on", actif: fd.get("actif") === "on" }).eq("id", id);
  redirect(error ? "/admin/offres?erreur=" + encodeURIComponent("Mise à jour impossible") : "/admin/offres?ok=Offre+enregistr%C3%A9e");
}
