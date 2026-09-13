import { createClient } from "@/app/lib/supabase/server";
import type { AdminRole, AdminSession } from "./schema";

type ProfileRow = {
    name: string | null;
    email: string | null;
    role: string | null;
};

function asRole(value: string | null | undefined): AdminRole {
    return value === "editor" ? "editor" : "admin";
}

export async function getAdminSession(): Promise<AdminSession | null> {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    const { data } = await supabase
        .from("profiles")
        .select("name, email, role")
        .eq("id", user.id)
        .maybeSingle();

    const profile = data as ProfileRow | null;
    const email = profile?.email || user.email || "";
    const name =
        profile?.name ||
        (typeof user.user_metadata?.name === "string"
            ? user.user_metadata.name
            : "") ||
        email.split("@")[0] ||
        "Admin";

    return {
        name,
        email,
        role: asRole(profile?.role),
    };
}
