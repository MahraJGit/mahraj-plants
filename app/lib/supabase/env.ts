export type SupabaseEnv = {
    url: string;
    anonKey: string;
};

export function tryGetSupabaseEnv(): SupabaseEnv | null {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !anonKey) return null;
    return { url, anonKey };
}

export function getSupabaseEnv(): SupabaseEnv {
    const env = tryGetSupabaseEnv();

    if (!env) {
        throw new Error(
            "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Set them in .env.local locally, or in Vercel → Project Settings → Environment Variables for Production/Preview.",
        );
    }

    return env;
}
