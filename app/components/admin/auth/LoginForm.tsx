"use client";

import { FormEvent, useState, useTransition } from "react";
import { loginAction } from "@/app/lib/admin/auth-actions";
import type { LoginPayload } from "@/app/lib/admin/schema";
import { validateLogin } from "@/app/lib/admin/validation";
import AdminButton from "@/app/components/admin/ui/AdminButton";
import { AdminInput } from "@/app/components/admin/ui/AdminField";
import AdminNotice from "@/app/components/admin/ui/AdminNotice";

const initial: LoginPayload = { email: "", password: "" };

export default function LoginForm() {
    const [form, setForm] = useState(initial);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formError, setFormError] = useState("");
    const [pending, startTransition] = useTransition();

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const nextErrors = validateLogin(form);
        setErrors(nextErrors);
        setFormError("");
        if (Object.keys(nextErrors).length > 0) return;

        startTransition(async () => {
            const result = await loginAction(form);
            if (result && !result.ok) {
                setFormError(result.message);
                if (result.errors) setErrors(result.errors);
            }
        });
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {formError ? (
                <AdminNotice tone="error">{formError}</AdminNotice>
            ) : null}

            <AdminInput
                id="login-email"
                label="Email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                error={errors.email}
                onChange={(event) =>
                    setForm((current) => ({ ...current, email: event.target.value }))
                }
            />
            <AdminInput
                id="login-password"
                label="Password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                value={form.password}
                error={errors.password}
                onChange={(event) =>
                    setForm((current) => ({
                        ...current,
                        password: event.target.value,
                    }))
                }
            />

            <AdminButton
                type="submit"
                size="lg"
                disabled={pending}
                className="mt-2 w-full"
            >
                {pending ? "Signing in…" : "Sign in"}
            </AdminButton>
        </form>
    );
}
