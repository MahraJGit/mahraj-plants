import { createClient as createSupabaseClient, type SupabaseClient } from "@supabase/supabase-js";
import { tryGetSupabaseEnv } from "./env";

/** Cookie-free anon client for public reads and build-time helpers. */
export function createPublicClient(): SupabaseClient | null {
    const env = tryGetSupabaseEnv();
    if (!env) return null;

    return createSupabaseClient(env.url, env.anonKey, {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
            detectSessionInUrl: false,
        },
    });
}
