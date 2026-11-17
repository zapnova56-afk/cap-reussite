import "server-only";
import crypto from "node:crypto";

const BASE = "https://api.wave.com";
const entetes = () => ({ Authorization: `Bearer ${process.env.WAVE_API_KEY}`, "Content-Type": "application/json" });

export async function creerSessionWave(p: { montant: number; reference: string; succes: string; erreur: string }) {
  const r = await fetch(`${BASE}/v1/checkout/sessions`, {
    method: "POST", headers: entetes(), cache: "no-store",
    body: JSON.stringify({ amount: String(p.montant), currency: "XOF", client_reference: p.reference, success_url: p.succes, error_url: p.erreur }),
  });
  if (!r.ok) throw new Error(`Wave a refusé la session (${r.status})`);
  return (await r.json()) as { id: string; wave_launch_url: string };
}

export async function lireSessionWave(id: string) {
  const r = await fetch(`${BASE}/v1/checkout/sessions/${encodeURIComponent(id)}`, { headers: entetes(), cache: "no-store" });
  if (!r.ok) return null;
  return (await r.json()) as { id: string; amount: string; currency: string; client_reference: string | null; payment_status?: string; checkout_status?: string };
}

// En-tête attendu : "t=<horodatage>,v1=<hex>". Format du contenu signé à confirmer en mode test (voir guide).
export function signatureValide(corpsBrut: string, entete: string | null): boolean {
  const secret = process.env.WAVE_WEBHOOK_SECRET;
  if (!entete || !secret) return false;
  const t = /t=(\d+)/.exec(entete)?.[1]; const v1 = /v1=([0-9a-f]+)/i.exec(entete)?.[1];
  if (!t || !v1 || Math.abs(Date.now() / 1000 - Number(t)) > 300) return false;
  return [`${t}.${corpsBrut}`, `${t}${corpsBrut}`].some((contenu) => {
    const attendu = crypto.createHmac("sha256", secret).update(contenu).digest("hex");
    return attendu.length === v1.length && crypto.timingSafeEqual(Buffer.from(attendu), Buffer.from(v1.toLowerCase()));
  });
}
