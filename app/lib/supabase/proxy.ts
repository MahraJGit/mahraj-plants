import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { tryGetSupabaseEnv } from "./env";

function copyCookies(from: NextResponse, to: NextResponse) {
    from.cookies.getAll().forEach((cookie) => {
        to.cookies.set(cookie.name, cookie.value);
    });
    return to;
}

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({ request });
    const env = tryGetSupabaseEnv();
    if (!env) return supabaseResponse;

    const supabase = createServerClient(env.url, env.anonKey, {
        cookies: {
            getAll() {
                return request.cookies.getAll();
            },
            setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, value }) => {
                    request.cookies.set(name, value);
                });
                supabaseResponse = NextResponse.next({ request });
                cookiesToSet.forEach(({ name, value, options }) => {
                    supabaseResponse.cookies.set(name, value, options);
                });
            },
        },
    });

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const path = request.nextUrl.pathname;
    const isLegacyAuthPage =
        path === "/admin/login" || path === "/admin/signup";
    const isAdmin = path === "/admin" || path.startsWith("/admin/");

    if (isLegacyAuthPage || (isAdmin && !user && path !== "/admin")) {
        const adminUrl = request.nextUrl.clone();
        adminUrl.pathname = "/admin";
        return copyCookies(supabaseResponse, NextResponse.redirect(adminUrl));
    }

    return supabaseResponse;
}
