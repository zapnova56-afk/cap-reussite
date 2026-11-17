import { NextResponse } from "next/server";
import { signatureValide, lireSessionWave } from "@/lib/paiement/wave";
import { supabaseAdmin } from "@/lib/supabase/admin";

// Notification de Wave. Rien n'est cru sur parole : signature + confirmation directe auprès de Wave + contrôle montant/référence.
export async function POST(req: Request) {
  const corps = await req.text();
  const entete = req.headers.get("wave-signature") ?? req.headers.get("x-wave-signature");
  if (!signatureValide(corps, entete)) return NextResponse.json({ erreur: "signature" }, { status: 401 });

  let sessionId: string | undefined;
  try { const e = JSON.parse(corps); sessionId = e?.data?.id ?? e?.id; } catch { /* corps invalide */ }
  if (!sessionId) return NextResponse.json({ ok: true });                      // événement sans session : ignoré

  const session = await lireSessionWave(sessionId);                             // vérité = Wave, pas le message reçu
  if (!session || session.payment_status !== "succeeded" || session.currency !== "XOF" || !session.client_reference) return NextResponse.json({ ok: true });

  const db = supabaseAdmin();
  const { data: p } = await db.from("paiements").select("id, montant_fcfa, statut").eq("id", session.client_reference).maybeSingle();
  if (!p || Number(session.amount) !== p.montant_fcfa) return NextResponse.json({ erreur: "incohérence" }, { status: 422 });

  const { error } = await db.rpc("activer_paiement", { p_id: p.id, p_ref: session.id });
  if (error) return NextResponse.json({ erreur: "activation" }, { status: 500 });  // Wave réessaiera
  return NextResponse.json({ ok: true });
}
