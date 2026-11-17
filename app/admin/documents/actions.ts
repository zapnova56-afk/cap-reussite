"use server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { exigerAdmin } from "@/lib/admin";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { TYPES_RESSOURCE } from "@/lib/marque";

const S = z.object({ chapitre_id: z.coerce.number().int().positive(), type: z.enum(TYPES_RESSOURCE), titre: z.string().trim().min(3).max(200) });
const retour = (m: string, ok = false): never => redirect(`/admin/documents?${ok ? "ok" : "erreur"}=${encodeURIComponent(m)}`);

export async function ajouterDocument(fd: FormData) {
  const { supabase } = await exigerAdmin();
  const r = S.safeParse(Object.fromEntries(fd));
  const fichier = fd.get("fichier");
  if (!r.success || !(fichier instanceof File) || fichier.size === 0) return retour("Champs manquants ou invalides.");
  if (fichier.size > 20 * 1024 * 1024) return retour("Fichier trop lourd (20 Mo maximum).");
  const octets = new Uint8Array(await fichier.arrayBuffer());
  if (String.fromCharCode(...octets.slice(0, 5)) !== "%PDF-") return retour("Le fichier doit être un vrai PDF.");

  const chemin = `${r.data.chapitre_id}/${crypto.randomUUID()}.pdf`;
  const { error: e1 } = await supabaseAdmin().storage.from("documents").upload(chemin, octets, { contentType: "application/pdf" });
  if (e1) return retour("Échec de l'envoi du fichier.");
  const { error: e2 } = await supabase.from("ressources").insert({
    ...r.data, fichier_path: chemin, publie: fd.get("publie") === "on", telechargeable: fd.get("telechargeable") === "on" });
  if (e2) { await supabaseAdmin().storage.from("documents").remove([chemin]); return retour("Enregistrement impossible."); }
  return retour("Document ajouté.", true);
}
