"use client";

import { useState } from "react";
import type { AdminSession } from "@/app/lib/admin/schema";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

export default function AdminShell({
    children,
    session,
}: {
    children: React.ReactNode;
    session: AdminSession;
}) {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="min-h-screen bg-cream/70">
            <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
                <AdminSidebar />
            </div>

            {mobileOpen ? (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <button
                        type="button"
                        aria-label="Close navigation"
                        className="absolute inset-0 bg-primary/40"
                        onClick={() => setMobileOpen(false)}
                    />
                    <div className="relative z-10 h-full w-72 max-w-[85vw]">
                        <AdminSidebar onNavigate={() => setMobileOpen(false)} />
                    </div>
                </div>
            ) : null}

            <div className="lg:pl-64">
                <AdminTopbar
                    session={session}
                    onMenuClick={() => setMobileOpen(true)}
                />
                <main className="admin-container py-6 lg:py-8">{children}</main>
            </div>
        </div>
    );
}
