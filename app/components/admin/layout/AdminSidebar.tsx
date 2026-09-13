"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineExternalLink } from "react-icons/hi";
import { ADMIN_NAV } from "@/app/lib/admin/nav";
import { cn } from "@/app/lib/utils";

type AdminSidebarProps = {
    onNavigate?: () => void;
};

export default function AdminSidebar({ onNavigate }: AdminSidebarProps) {
    const pathname = usePathname();

    return (
        <aside className="flex h-full flex-col bg-primary text-white">
            <Link
                href="/admin"
                onClick={onNavigate}
                className="flex items-center gap-3 border-b border-white/10 px-5 py-5"
            >
                <Image
                    src="/mahraj-landscaping-logo.png"
                    alt="Mahraj Landscaping"
                    width={140}
                    height={40}
                    className="h-10 w-auto"
                />
            </Link>

            <nav aria-label="Admin" className="flex flex-1 flex-col gap-1 p-4">
                {ADMIN_NAV.map(({ href, label, Icon, exact }) => {
                    const active = exact
                        ? pathname === href
                        : pathname === href || pathname.startsWith(`${href}/`);

                    return (
                        <Link
                            key={href}
                            href={href}
                            onClick={onNavigate}
                            className={cn(
                                "flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-medium transition",
                                active
                                    ? "bg-secondary text-white"
                                    : "text-white/75 hover:bg-white/8 hover:text-white",
                            )}
                        >
                            <Icon aria-hidden className="size-5" />
                            {label}
                        </Link>
                    );
                })}
            </nav>

            <div className="border-t border-white/10 p-4">
                <Link
                    href="/"
                    className="flex items-center gap-2 rounded-2xl px-3.5 py-2.5 text-sm text-white/70 transition hover:bg-white/8 hover:text-white"
                >
                    <HiOutlineExternalLink aria-hidden className="size-5" />
                    View public site
                </Link>
            </div>
        </aside>
    );
}
