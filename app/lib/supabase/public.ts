import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { getSupabaseEnv } from "./env";

/** Cookie-free anon client for public reads and build-time helpers. */
export function createPublicClient() {
    const { url, anonKey } = getSupabaseEnv();
    return createSupabaseClient(url, anonKey, {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
            detectSessionInUrl: false,
        },
    });
}
