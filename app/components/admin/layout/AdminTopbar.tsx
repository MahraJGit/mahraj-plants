"use client";

import { HiMenuAlt2, HiOutlineLogout } from "react-icons/hi";
import { logoutAction } from "@/app/lib/admin/auth-actions";
import type { AdminSession } from "@/app/lib/admin/schema";

type AdminTopbarProps = {
    session: AdminSession;
    onMenuClick: () => void;
};

export default function AdminTopbar({
    session,
    onMenuClick,
}: AdminTopbarProps) {
    return (
        <header className="flex items-center justify-between gap-4 border-b border-primary/8 bg-white px-4 py-3 lg:px-6">
            <button
                type="button"
                onClick={onMenuClick}
                aria-label="Open navigation"
                className="inline-flex size-10 cursor-pointer items-center justify-center rounded-xl border border-primary/10 text-primary lg:hidden"
            >
                <HiMenuAlt2 aria-hidden className="size-5" />
            </button>

            <p className="hidden text-sm text-primary/55 lg:block">
                Content studio · Mahraj Landscaping
            </p>

            <div className="ml-auto flex items-center gap-3">
                <div className="text-right">
                    <p className="text-sm font-semibold text-primary">
                        {session.name}
                    </p>
                    <p className="text-xs text-primary/45">{session.email}</p>
                </div>
                <form action={logoutAction}>
                    <button
                        type="submit"
                        className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-cream px-4 py-2 text-sm font-medium text-primary transition hover:bg-secondary hover:text-white"
                    >
                        <HiOutlineLogout aria-hidden className="size-4" />
                        Sign out
                    </button>
                </form>
            </div>
        </header>
    );
}
