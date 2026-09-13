"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";
import { mapAuthError } from "./auth-errors";
import type { LoginPayload } from "./schema";
import { validateLogin } from "./validation";

export type AuthActionResult = {
    ok: false;
    message: string;
    errors?: Record<string, string>;
};

export async function loginAction(
    payload: LoginPayload,
): Promise<AuthActionResult | void> {
    const errors = validateLogin(payload);
    if (Object.keys(errors).length > 0) {
        return {
            ok: false,
            message: "Please correct the highlighted fields.",
            errors,
        };
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
        email: payload.email.trim(),
        password: payload.password,
    });

    if (error) {
        return { ok: false, message: mapAuthError(error.message) };
    }

    redirect("/admin");
}

export async function logoutAction() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/admin");
}
