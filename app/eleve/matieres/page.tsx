import Link from "next/link";
import { supabaseServeur } from "@/lib/supabase/serveur";

export const metadata = { title: "Mes matières" };

export default async function Matieres() {
  const supabase = await supabaseServeur();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profil } = await supabase.from("profils").select("niveau_id").eq("id", user!.id).single();
  const { data: matieres } = await supabase.from("matieres").select("id, nom, serie").eq("niveau_id", profil?.niveau_id ?? 0).order("nom");
  return (<>
    <h1 className="text-2xl sm:text-3xl">Mes matières</h1>
    {!matieres?.length && <p className="mt-6 text-marine/70">Les matières de votre classe seront bientôt disponibles.</p>}
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {matieres?.map((m) => (
        <Link key={m.id} href={`/eleve/matieres/${m.id}`} className="carte border-l-4 border-turquoise p-5 transition hover:-translate-y-1">
          <span className="font-bold">{m.nom}</span>{m.serie && <span className="ml-2 text-xs text-marine/60">Série {m.serie}</span>}
        </Link>))}
    </div></>);
}
