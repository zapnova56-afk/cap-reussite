"use server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { supabaseServeur } from "@/lib/supabase/serveur";

const S = z.object({ nom: z.string().trim().min(2).max(100), email: z.string().trim().email(), message: z.string().trim().min(5).max(2000) });
export async function envoyerMessage(fd: FormData) {
  const r = S.safeParse(Object.fromEntries(fd));
  if (!r.success) redirect("/contact?erreur=Veuillez+v%C3%A9rifier+les+champs");
  const supabase = await supabaseServeur();
  const { error } = await supabase.from("messages_contact").insert(r.data);
  redirect(error ? "/contact?erreur=Envoi+impossible" : "/contact?ok=1");
}
