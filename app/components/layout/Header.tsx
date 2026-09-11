"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
    FaFacebookF,
    FaGooglePlusG,
    FaInstagram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
    HiChevronDown,
    HiOutlineClock,
    HiOutlineLocationMarker,
    HiOutlineMail,
} from "react-icons/hi";
import { FACEBOOK_HREF, INSTAGRAM_HREF, EMAIL_HREF, X_HREF } from "@/app/lib/contact";
import { useTranslations, type Locale } from "@/app/lib/i18n";
import { useTodayOperatingHoursLabel } from "@/app/lib/i18n/use-operating-hours";
import { cn } from "@/app/lib/utils";
import { plantCategoryNav } from "@/app/lib/categories";

const socialLinks = [
    { label: "Facebook", href: FACEBOOK_HREF, Icon: FaFacebookF, external: true, target: "_blank" },
    { label: "Twitter", href: X_HREF, Icon: FaXTwitter, external: false, target: "_blank" },
    { label: "Instagram", href: INSTAGRAM_HREF, Icon: FaInstagram, external: true, target: "_blank" },
    { label: "Google Plus", href: "#", Icon: FaGooglePlusG, external: false, target: "_blank" },
];

const languages = [
    { code: "en" as const, label: "English", flag: "/icons/flag-gb.svg" },
    { code: "ar" as const, label: "Arabic", flag: "/icons/flag-sa.svg" },
];

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
            className={cn(
                "rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200 hover:text-secondary",
                active ? "text-secondary" : "text-white/90",
                className,
            )}
        />
    );
}

export default function Header() {
    const pathname = usePathname();
    const { t, locale, setLocale } = useTranslations("nav");
    const todayHoursLabel = useTodayOperatingHoursLabel();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [plantsOpen, setPlantsOpen] = useState(false);
    const [mobilePlantsOpen, setMobilePlantsOpen] = useState(false);
    const [languageOpen, setLanguageOpen] = useState(false);
    const [activeHash, setActiveHash] = useState("");
    const [scrolled, setScrolled] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const languageRef = useRef<HTMLDivElement>(null);
    const mobileLanguageRef = useRef<HTMLDivElement>(null);

    const plantCategories = plantCategoryNav.map((item) => {
        const slug = item.href.replace("/categories/", "");
        return {
            ...item,
            label: t(`categories.${slug}`),
        };
    });

    const navLinks = [
        { label: t("home"), href: "/" },
        {
            label: t("plantsCategory"),
            href: "/#categories",
            dropdown: plantCategories,
        },
        { label: t("services"), href: "/services" },
        { label: t("projects"), href: "/projects" },
        { label: t("blogs"), href: "/blogs" },
        { label: t("about"), href: "/about" },
        { label: t("contact"), href: "/contact" },
    ];

    const currentLanguage =
        languages.find((item) => item.code === locale) ?? languages[0];

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

            const inDesktopLang = languageRef.current?.contains(target);
            const inMobileLang = mobileLanguageRef.current?.contains(target);
            if (!inDesktopLang && !inMobileLang) {
                setLanguageOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        if (!mobileOpen) {
            setMobilePlantsOpen(false);
        }
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
        if (href === "/projects") {
            return pathname === "/projects" || pathname.startsWith("/projects/");
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

    function renderLanguageSwitcher(
        ref: React.RefObject<HTMLDivElement | null>,
        className?: string,
        options?: { showLabel?: boolean; buttonClassName?: string },
    ) {
        const showLabel = options?.showLabel ?? true;

        return (
            <div ref={ref} className={cn("relative", className)}>
                <button
                    type="button"
                    aria-label={t("changeLanguage")}
                    aria-expanded={languageOpen}
                    aria-haspopup="listbox"
                    onClick={() => setLanguageOpen((open) => !open)}
                    className={cn(
                        "flex cursor-pointer items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2 py-1 text-white/90 transition hover:border-white/30 hover:text-white",
                        options?.buttonClassName,
                    )}
                >
                    <FlagIcon src={currentLanguage.flag} />
                    {showLabel && (
                        <span className="hidden text-[11px] font-medium sm:inline">
                            {currentLanguage.label}
                        </span>
                    )}
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
                        aria-label={t("selectLanguage")}
                        className="absolute top-[calc(100%+0.4rem)] end-0 z-50 min-w-[9.5rem] overflow-hidden rounded-xl border border-white/15 bg-section py-1 shadow-xl"
                    >
                        {languages.map((item) => {
                            const selected = locale === item.code;

                            return (
                                <li
                                    key={item.code}
                                    role="option"
                                    aria-selected={selected}
                                >
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setLocale(item.code as Locale);
                                            setLanguageOpen(false);
                                        }}
                                        className={cn(
                                            "flex w-full cursor-pointer items-center gap-2.5 px-3 py-2 text-start text-[11px] transition hover:bg-white/10",
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
        );
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
                            {t("nurseryAddress")}
                        </span>
                        <Link
                            href={EMAIL_HREF}
                            aria-label="Email Mahraj Landscaping"
                            className="ms-1 shrink-0 text-white/90 transition hover:text-white"
                        >
                            <HiOutlineMail aria-hidden className="size-4" />
                        </Link>
                    </div>

                    <div className="hidden items-center gap-2 xl:flex">
                        <HiOutlineClock aria-hidden className="size-4 shrink-0" />
                        <span>{todayHoursLabel}</span>
                    </div>

                    <div className="flex shrink-0 items-center gap-2.5">
                        {renderLanguageSwitcher(languageRef)}

                        <div className="ms-1 flex items-center gap-1.5">
                            {socialLinks.map(({ label, href, Icon, external }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    {...(external
                                        ? {
                                              target: "_blank",
                                              rel: "noopener noreferrer",
                                          }
                                        : {})}
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
                        "mx-auto flex w-full max-w-7xl items-center justify-between gap-3 rounded-full border px-3 py-2.5 transition-all duration-300 lg:gap-4 lg:px-5 lg:py-3",
                        scrolled
                            ? "border-primary/30 bg-section shadow-[0_10px_40px_rgba(10,37,14,0.28)] backdrop-blur-md"
                            : "border-white/30 bg-section/88 shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-xl",
                    )}
                >
                    <Link
                        href="/"
                        className="relative me-1 h-10 w-[160px] shrink-0 sm:h-11 sm:w-[180px]"
                        onClick={() => setMobileOpen(false)}
                    >
                        <Image
                            src="/mahraj-landscaping-logo.png"
                            alt="Mahraj Landscaping"
                            fill
                            sizes="180px"
                            className="object-contain object-start"
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
                                            <div className="absolute top-[calc(100%+0.65rem)] start-0 min-w-[15rem] overflow-hidden rounded-2xl border border-white/15 bg-section py-2 shadow-xl">
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

                    <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
                        {renderLanguageSwitcher(mobileLanguageRef, "lg:hidden", {
                            showLabel: false,
                            buttonClassName:
                                "h-10 border-white/25 bg-white/10 px-2.5 hover:border-white/40",
                        })}

                        <Link
                            href="https://mahrajagriculture.com/"
                            target="_blank"
                            className="hidden rounded-full bg-white px-4 py-2.5 text-sm font-medium text-primary transition hover:bg-cream sm:inline-flex lg:px-5"
                            onClick={() => setMobileOpen(false)}
                        >
                            {t("exploreCta")}
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
                            {navLinks.map((link) => {
                                if (link.dropdown) {
                                    return (
                                        <li key={link.label}>
                                            <button
                                                type="button"
                                                aria-expanded={mobilePlantsOpen}
                                                onClick={() =>
                                                    setMobilePlantsOpen(
                                                        (open) => !open,
                                                    )
                                                }
                                                className={cn(
                                                    navLinkClass,
                                                    "flex w-full cursor-pointer items-center justify-between gap-3",
                                                    (isActive(link.href) ||
                                                        mobilePlantsOpen) &&
                                                        "text-secondary",
                                                )}
                                            >
                                                <span>{link.label}</span>
                                                <HiChevronDown
                                                    aria-hidden
                                                    className={cn(
                                                        "size-4 shrink-0 transition-transform duration-200",
                                                        mobilePlantsOpen &&
                                                            "rotate-180",
                                                    )}
                                                />
                                            </button>

                                            <div
                                                className={cn(
                                                    "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                                                    mobilePlantsOpen
                                                        ? "grid-rows-[1fr] opacity-100"
                                                        : "grid-rows-[0fr] opacity-0",
                                                )}
                                            >
                                                <ul
                                                    className={cn(
                                                        "space-y-0.5 overflow-hidden border-s border-white/15 ms-4 ps-3",
                                                        !mobilePlantsOpen &&
                                                            "pointer-events-none",
                                                    )}
                                                >
                                                    {link.dropdown.map(
                                                        (item) => (
                                                            <li
                                                                key={item.label}
                                                            >
                                                                <Link
                                                                    href={
                                                                        item.href
                                                                    }
                                                                    className="block rounded-lg px-3 py-2.5 text-sm text-white/75 transition hover:bg-white/5 hover:text-secondary"
                                                                    onClick={() =>
                                                                        setMobileOpen(
                                                                            false,
                                                                        )
                                                                    }
                                                                >
                                                                    {
                                                                        item.label
                                                                    }
                                                                </Link>
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>
                                            </div>
                                        </li>
                                    );
                                }

                                return (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className={cn(
                                                navLinkClass,
                                                "block",
                                                isActive(link.href) &&
                                                    "text-secondary",
                                            )}
                                            onClick={() =>
                                                setMobileOpen(false)
                                            }
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>

                        <div className="mt-4 flex items-center gap-2.5">
                            <Link
                                href="https://mahrajagriculture.com/"
                                target="_blank"
                                className="flex flex-1 items-center justify-center rounded-full bg-white px-4 py-3 text-sm font-medium text-primary"
                                onClick={() => setMobileOpen(false)}
                            >
                                {t("exploreCta")}
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}