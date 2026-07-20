import { createBrowserClient, createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

let browserClient: ReturnType<typeof createBrowserClient> | null = null;

export function createBrowserSupabaseClient() {
  if (browserClient) return browserClient;
  browserClient = createBrowserClient(supabaseUrl, supabaseAnonKey, {
    cookieEncoding: "base64url",
  });
  return browserClient;
}

export async function createServerSupabaseClient() {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookieEncoding: "base64url",
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          cookieStore.set(name, value, options)
        );
      },
    },
  });
}
