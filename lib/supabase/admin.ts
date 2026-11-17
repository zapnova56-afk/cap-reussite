import "server-only";
import { createClient } from "@supabase/supabase-js";
// Client à pleins pouvoirs : SERVEUR UNIQUEMENT. Ne jamais l'importer dans un composant client.
export const supabaseAdmin = () =>
  createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
