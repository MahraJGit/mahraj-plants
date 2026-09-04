"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
    FaFacebookF,
    FaGooglePlusG,
    FaInstagram,
    FaTwitter,
} from "react-icons/fa";
import {
    HiChevronDown,
    HiOutlineClock,
    HiOutlineLocationMarker,
    HiOutlineMail,
    HiOutlineSearch,
} from "react-icons/hi";
import { cn } from "@/app/lib/utils";
import { plantCategoryNav } from "@/app/lib/categories";

const plantCategories = plantCategoryNav;

const navLinks = [
    { label: "Home", href: "/#hero" },
    { label: "Plants Category", href: "/#categories", dropdown: plantCategories },
    { label: "Services", href: "/services" },
    { label: "Blogs", href: "/blogs" },
    { label: "About us", href: "/about" },
    { label: "Contact us", href: "/contact" },
];

const socialLinks = [
    { label: "Facebook", href: "#", Icon: FaFacebookF },
    { label: "Twitter", href: "#", Icon: FaTwitter },
    { label: "Instagram", href: "#", Icon: FaInstagram },
    { label: "Google Plus", href: "#", Icon: FaGooglePlusG },
];

const languages = [
    { code: "en", label: "English", flag: "/icons/flag-gb.svg" },
    { code: "ar", label: "Arabic", flag: "/icons/flag-sa.svg" },
] as const;

type LanguageCode = (typeof languages)[number]["code"];

function FlagIcon({ src, className }: { src: string; className?: string }) {
    return (
        <img
            src={src}
            alt=""
            width={22}
            height={16}
            aria-hidden
            className={cn(
                "h-4 w-[1.375rem] shrink-0 rounded-[2px] object-cover ring-1 ring-white/20",
                className,
            )}
        />
    );
}

const navLinkClass =
    "rounded-full px-3.5 py-2 text-sm font-medium text-white/90 transition-colors duration-200 hover:text-secondary";

function NavLink({
    active,
    className,
    ...props
}: React.ComponentProps<typeof Link> & { active?: boolean }) {
    return (
        <Link
            {...props}
            className={cn(navLinkClass, active && "text-secondary", className)}
        />
    );
}

export default function Header() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [plantsOpen, setPlantsOpen] = useState(false);
    const [languageOpen, setLanguageOpen] = useState(false);
    const [language, setLanguage] = useState<LanguageCode>("en");
    const [activeHash, setActiveHash] = useState("");
    const [scrolled, setScrolled] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const languageRef = useRef<HTMLDivElement>(null);

    const currentLanguage =
        languages.find((item) => item.code === language) ?? languages[0];

    useEffect(() => {
        const syncHash = () => setActiveHash(window.location.hash);
        syncHash();
        window.addEventListener("hashchange", syncHash);
        return () => window.removeEventListener("hashchange", syncHash);
    }, []);

    useEffect(() => {
        function onScroll() {
            setScrolled(window.scrollY > 48);
        }

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as Node;

            if (dropdownRef.current && !dropdownRef.current.contains(target)) {
                setPlantsOpen(false);
            }

            if (languageRef.current && !languageRef.current.contains(target)) {
                setLanguageOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    function isActive(href: string) {
        if (href === "/blogs") {
            return pathname === "/blogs";
        }
        if (href === "/about") {
            return pathname === "/about";
        }
        if (href === "/contact") {
            return pathname === "/contact";
        }
        if (href === "/services") {
            return pathname === "/services" || pathname.startsWith("/services/");
        }
        if (href === "/#hero") {
            return pathname === "/" && (!activeHash || activeHash === "#hero");
        }
        if (href === "/#categories") {
            return (
                pathname.startsWith("/categories") ||
                pathname.startsWith("/products")
            );
        }
        if (href.startsWith("/#")) {
            return pathname === "/" && activeHash === href.slice(1);
        }
        return pathname === href;
    }

    return (
        <header className="fixed inset-x-0 top-0 z-50">
            <div className="hidden bg-section text-white lg:block">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 text-[11px] leading-none lg:px-8 xl:text-xs">
                    <div className="flex min-w-0 items-center gap-2">
                        <HiOutlineLocationMarker
                            aria-hidden
                            className="size-4 shrink-0"
                        />
                        <span className="truncate">
                            Nursery: Heet, Old Al kharj Road, Riyadh, KSA
                        </span>
                        <Link
                            href="mailto:info@mahrajplants.com"
                            aria-label="Email Mahraj Plants"
                            className="ml-1 shrink-0 text-white/90 transition hover:text-white"
                        >
                            <HiOutlineMail aria-hidden className="size-4" />
                        </Link>
                    </div>

                    <div className="hidden items-center gap-2 xl:flex">
                        <HiOutlineClock aria-hidden className="size-4 shrink-0" />
                        <span>
                            Wed: 9:00 - 12:00 / Morning | 1:00 PM — 6:00 PM /
                            Evening
                        </span>
                    </div>

                    <div className="flex shrink-0 items-center gap-2.5">
                        <div ref={languageRef} className="relative">
                            <button
                                type="button"
                                aria-label="Change language"
                                aria-expanded={languageOpen}
                                aria-haspopup="listbox"
                                onClick={() =>
                                    setLanguageOpen((open) => !open)
                                }
                                className="flex cursor-pointer items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2 py-1 text-white/90 transition hover:border-white/30 hover:text-white"
                            >
                                <FlagIcon src={currentLanguage.flag} />
                                <span className="hidden text-[11px] font-medium sm:inline">
                                    {currentLanguage.label}
                                </span>
                                <HiChevronDown
                                    aria-hidden
                                    className={cn(
                                        "size-3.5 transition-transform duration-200",
                                        languageOpen && "rotate-180",
                                    )}
                                />
                            </button>

                            {languageOpen && (
                                <ul
                                    role="listbox"
                                    aria-label="Select language"
                                    className="absolute top-[calc(100%+0.4rem)] right-0 z-50 min-w-[9.5rem] overflow-hidden rounded-xl border border-white/15 bg-section py-1 shadow-xl"
                                >
                                    {languages.map((item) => {
                                        const selected =
                                            language === item.code;

                                        return (
                                            <li key={item.code} role="option" aria-selected={selected}>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setLanguage(item.code);
                                                        setLanguageOpen(false);
                                                    }}
                                                    className={cn(
                                                        "flex w-full cursor-pointer items-center gap-2.5 px-3 py-2 text-left text-[11px] transition hover:bg-white/10",
                                                        selected
                                                            ? "text-secondary"
                                                            : "text-white/90",
                                                    )}
                                                >
                                                    <FlagIcon src={item.flag} />
                                                    {item.label}
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>

                        <div className="ml-1 flex items-center gap-1.5">
                            {socialLinks.map(({ label, href, Icon }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="flex size-7 items-center justify-center rounded-full bg-[#C4A862] text-white transition hover:bg-[#b39655]"
                                >
                                    <Icon aria-hidden className="size-3.5" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 pt-3 lg:px-8 lg:pt-4">
                <div
                    className={cn(
                        "mx-auto flex max-w-7xl items-center gap-3 rounded-full border px-3 py-2.5 transition-all duration-300 lg:gap-4 lg:px-5 lg:py-3",
                        scrolled
                            ? "border-primary/30 bg-section shadow-[0_10px_40px_rgba(10,37,14,0.28)] backdrop-blur-md"
                            : "border-white/30 bg-section/88 shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-xl",
                    )}
                >
                    <Link
                        href="/#hero"
                        className="relative mr-1 h-10 w-[148px] shrink-0 sm:h-11 sm:w-[168px]"
                        onClick={() => setMobileOpen(false)}
                    >
                        <Image
                            src="/mahraj-landscaping-logo.webp"
                            alt="Mahraj Landscaping"
                            fill
                            sizes="168px"
                            className="object-contain object-left"
                            priority
                        />
                    </Link>

                    <nav
                        aria-label="Main navigation"
                        className="hidden flex-1 items-center justify-center gap-0.5 xl:flex"
                    >
                        {navLinks.map((link) => {
                            const active = isActive(link.href);

                            if (link.dropdown) {
                                return (
                                    <div
                                        key={link.label}
                                        ref={dropdownRef}
                                        className="relative"
                                    >
                                        <button
                                            type="button"
                                            aria-expanded={plantsOpen}
                                            aria-haspopup="true"
                                            onClick={() =>
                                                setPlantsOpen((open) => !open)
                                            }
                                            className={cn(
                                                navLinkClass,
                                                "flex cursor-pointer items-center gap-1",
                                                (active || plantsOpen) &&
                                                    "text-secondary",
                                            )}
                                        >
                                            {link.label}
                                            <HiChevronDown
                                                aria-hidden
                                                className={cn(
                                                    "size-3.5 transition-transform duration-200",
                                                    plantsOpen && "rotate-180",
                                                )}
                                            />
                                        </button>

                                        {plantsOpen && (
                                            <div className="absolute top-[calc(100%+0.65rem)] left-0 min-w-[15rem] overflow-hidden rounded-2xl border border-white/15 bg-section py-2 shadow-xl">
                                                {link.dropdown.map((item) => (
                                                    <Link
                                                        key={item.label}
                                                        href={item.href}
                                                        className="block px-4 py-2.5 text-sm text-white/90 transition hover:text-secondary"
                                                        onClick={() => {
                                                            setPlantsOpen(false);
                                                            setMobileOpen(false);
                                                        }}
                                                    >
                                                        {item.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            }

                            return (
                                <NavLink
                                    key={link.label}
                                    href={link.href}
                                    active={active}
                                >
                                    {link.label}
                                </NavLink>
                            );
                        })}
                    </nav>

                    <div className="ml-auto flex items-center gap-2 sm:gap-2.5">
                        <button
                            type="button"
                            aria-label="Search"
                            className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:border-white/40 hover:text-secondary"
                        >
                            <HiOutlineSearch aria-hidden className="size-5" />
                        </button>

                        <Link
                            href="/#categories"
                            className="hidden rounded-full bg-white px-4 py-2.5 text-sm font-medium text-primary transition hover:bg-cream sm:inline-flex lg:px-5"
                            onClick={() => setMobileOpen(false)}
                        >
                            Explore Mahraj Agriculture
                        </Link>

                        <button
                            type="button"
                            aria-label={mobileOpen ? "Close menu" : "Open menu"}
                            aria-expanded={mobileOpen}
                            onClick={() => setMobileOpen((open) => !open)}
                            className="flex size-10 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-full border border-white/25 bg-white/10 xl:hidden"
                        >
                            <span
                                className={cn(
                                    "h-0.5 w-5 rounded-full bg-white transition",
                                    mobileOpen && "translate-y-2 rotate-45",
                                )}
                            />
                            <span
                                className={cn(
                                    "h-0.5 w-5 rounded-full bg-white transition",
                                    mobileOpen && "opacity-0",
                                )}
                            />
                            <span
                                className={cn(
                                    "h-0.5 w-5 rounded-full bg-white transition",
                                    mobileOpen && "-translate-y-2 -rotate-45",
                                )}
                            />
                        </button>
                    </div>
                </div>
            </div>

            {mobileOpen && (
                <div className="px-4 pt-3 xl:hidden">
                    <nav
                        aria-label="Mobile navigation"
                        className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-primary/20 bg-section p-4 shadow-xl"
                    >
                        <ul className="space-y-1">
                            {navLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            navLinkClass,
                                            "block",
                                            isActive(link.href) &&
                                                "text-secondary",
                                        )}
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                    {link.dropdown && (
                                        <ul className="mt-1 space-y-1 pl-3">
                                            {link.dropdown.map((item) => (
                                                <li key={item.label}>
                                                    <Link
                                                        href={item.href}
                                                        className="block rounded-lg px-4 py-2 text-sm text-white/80 transition hover:text-secondary"
                                                        onClick={() =>
                                                            setMobileOpen(false)
                                                        }
                                                    >
                                                        {item.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>

                        <div className="mt-4 flex items-center gap-2.5">
                            <button
                                type="button"
                                aria-label="Search"
                                className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white"
                            >
                                <HiOutlineSearch
                                    aria-hidden
                                    className="size-5"
                                />
                            </button>
                            <Link
                                href="/#categories"
                                className="flex flex-1 items-center justify-center rounded-full bg-white px-4 py-3 text-sm font-medium text-primary"
                                onClick={() => setMobileOpen(false)}
                            >
                                Explore Mahraj Agriculture
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
