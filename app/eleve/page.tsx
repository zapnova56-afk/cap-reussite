import Link from "next/link";
import { redirect } from "next/navigation";
import { supabaseServeur } from "@/lib/supabase/serveur";

export const metadata = { title: "Mon tableau de bord" };

export default async function Tableau() {
  const supabase = await supabaseServeur();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/connexion");
  const { data: profil } = await supabase.from("profils").select("prenom, role, niveaux(nom)").eq("id", user.id).single();
  const { data: abo } = await supabase.from("abonnements").select("fin, offres(nom)").gt("fin", new Date().toISOString()).order("fin", { ascending: false }).limit(1).maybeSingle();
  const niveau = (profil?.niveaux as unknown as { nom: string } | null)?.nom;
  const offre = (abo?.offres as unknown as { nom: string } | null)?.nom;
  return (<>
    <h1 className="text-2xl sm:text-3xl">Bonjour {profil?.prenom} 👋</h1>
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      <div className="carte p-6"><p className="text-sm text-marine/70">Ma classe</p><p className="text-2xl font-extrabold text-turquoise">{niveau ?? "—"}</p></div>
      <div className="carte p-6"><p className="text-sm text-marine/70">Mon abonnement</p>
        {abo ? <p className="text-lg font-bold">{offre} — jusqu'au {new Date(abo.fin).toLocaleDateString("fr-FR")}</p>
             : <><p className="text-lg font-bold">Aucun abonnement actif</p><Link href="/tarifs" className="btn btn-primaire mt-3 !py-2">Choisir une offre</Link></>}</div>
    </div>
    {profil?.role === "admin" && <Link href="/admin" className="btn btn-secondaire mt-6">Espace administrateur</Link>}
  </>);
}
