import { NextResponse } from "next/server";
import { supabaseServeur } from "@/lib/supabase/serveur";
import { supabaseAdmin } from "@/lib/supabase/admin";

// Remet un lien PDF valable 60 secondes, uniquement si l'élève y a droit.
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ erreur: "Document introuvable" }, { status: 404 });
  const supabase = await supabaseServeur();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ erreur: "Connexion requise" }, { status: 401 });

  // La sécurité de la base (RLS) ne renvoie la ligne que si niveau + abonnement + publication sont valides.
  const { data: doc } = await supabase.from("ressources").select("id, fichier_path, telechargeable").eq("id", id).maybeSingle();
  if (!doc?.fichier_path) return NextResponse.json({ erreur: "Accès refusé ou document introuvable" }, { status: 403 });

  const telecharger = new URL(req.url).searchParams.get("telecharger") === "1";
  if (telecharger) {
    const { data: abo } = await supabase.from("abonnements").select("offres(telechargement)").gt("fin", new Date().toISOString()).limit(5);
    const ok = doc.telechargeable && abo?.some((a) => (a.offres as unknown as { telechargement: boolean } | null)?.telechargement);
    if (!ok) return NextResponse.json({ erreur: "Le téléchargement n'est pas inclus dans votre offre" }, { status: 403 });
  }

  const { data: lien, error } = await supabaseAdmin().storage.from("documents")
    .createSignedUrl(doc.fichier_path, 60, telecharger ? { download: true } : undefined);
  if (error || !lien) return NextResponse.json({ erreur: "Lien indisponible" }, { status: 500 });

  await supabase.from("historique").insert({ profil_id: user.id, ressource_id: doc.id });
  return NextResponse.redirect(lien.signedUrl, 302);
}
