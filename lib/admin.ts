import "server-only";
import { redirect } from "next/navigation";
import { supabaseServeur } from "@/lib/supabase/serveur";

// À appeler dans CHAQUE page et action admin : le rôle est relu en base, jamais déduit du navigateur.
export async function exigerAdmin() {
  const supabase = await supabaseServeur();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/connexion");
  const { data } = await supabase.from("profils").select("role").eq("id", user.id).single();
  if (data?.role !== "admin") redirect("/eleve");
  return { supabase, user };
}
