import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  // Loud console warning rather than a silent failure — makes misconfiguration
  // obvious during development instead of a confusing blank admin page.
  console.warn(
    "[Supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are not set. " +
      "Copy .env.example to .env and fill in your project's values. " +
      "The public site will still work using its built-in content until then."
  );
}

// createClient throws immediately if given an empty/invalid URL, which would
// crash the whole app (blank page) before .env is set up. Fall back to a
// harmless placeholder URL in that case — isSupabaseConfigured (above) is
// what everything else checks before actually trying to read/write data.
export const supabase = createClient(
  isSupabaseConfigured ? (supabaseUrl as string) : "https://placeholder.supabase.co",
  isSupabaseConfigured ? (supabaseAnonKey as string) : "placeholder-anon-key"
);

