"use client";

import Image from "next/image";
import Link from "next/link";
import {
    FaFacebookF,
    FaGooglePlusG,
    FaInstagram,
    FaTwitter,
} from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import {
    FACEBOOK_HREF,
    INSTAGRAM_HREF,
    PHONE_DISPLAY,
    PHONE_HREF,
} from "@/app/lib/contact";
import { useTranslations } from "@/app/lib/i18n";
import { cn } from "@/app/lib/utils";

const socialLinks = [
    { label: "Facebook", href: FACEBOOK_HREF, Icon: FaFacebookF, external: true },
    { label: "Twitter", href: "#", Icon: FaTwitter, external: false },
    { label: "Instagram", href: INSTAGRAM_HREF, Icon: FaInstagram, external: true },
    { label: "Google Plus", href: "#", Icon: FaGooglePlusG, external: false },
];

type FooterLink = {
    label: string;
    href: string;
    highlighted?: boolean;
};

function FooterHeading({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <h3 className="text-base font-bold text-white sm:text-lg">{children}</h3>
            <span
                aria-hidden
                className="mt-2 block h-0.5 w-10 rounded-full bg-secondary"
            />
        </div>
    );
}

function ContactIcon({ src }: { src: string }) {
    return (
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#C4A862]">
            <Image src={src} alt="" width={16} height={16} aria-hidden />
        </span>
    );
}

function LinkArrow() {
    return (
        <svg
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden
            className="size-3 shrink-0 text-[#C4A862] rtl:rotate-180"
        >
            <path
                d="M4.5 2.5 8 6l-3.5 3.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default function Footer() {
    const { t, tObject, locale } = useTranslations("footer");

    const services = tObject<FooterLink[]>("services") ?? [];
    const usefulLinks = tObject<FooterLink[]>("usefulLinks") ?? [];
    const legalLinks = tObject<FooterLink[]>("legalLinks") ?? [];

    return (
        <footer className="mt-auto bg-section text-white">
            <div className="section-container pb-10 pt-12 lg:pb-14 lg:pt-16">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 xl:gap-12">
                    <div className="sm:col-span-2 lg:col-span-1">
                        <Link
                            href="/#hero"
                            className="relative inline-block h-11 w-[168px]"
                        >
                            <Image
                                src="/mahraj-landscaping-logo.webp"
                                alt={t("logoAlt")}
                                fill
                                sizes="168px"
                                className="object-contain object-left rtl:object-right"
                            />
                        </Link>

                        <ul className="mt-6 space-y-4 text-sm leading-relaxed text-white/85">
                            <li className="flex items-start gap-3">
                                <ContactIcon src="/icons/location-white.svg" />
                                <span>{t("nurseryAddress")}</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <ContactIcon src="/icons/email-white.svg" />
                                <Link
                                    href="mailto:info@mahrajplants.com"
                                    className="transition hover:text-secondary"
                                    dir="ltr"
                                >
                                    info@mahrajplants.com
                                </Link>
                            </li>
                            <li className="flex items-start gap-3">
                                <ContactIcon src="/icons/clock-white.svg" />
                                <span>{t("hours")}</span>
                            </li>
                        </ul>

                        <a
                            href={PHONE_HREF}
                            className="mt-6 inline-flex w-max min-w-[17.5rem] max-w-none items-center gap-3.5 rounded-full bg-white py-2.5 pe-7 ps-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition hover:shadow-[0_12px_28px_rgba(0,0,0,0.22)] sm:min-w-[19rem] sm:pe-8"
                        >
                            <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-secondary text-white sm:size-[3.75rem]">
                                <MdSupportAgent aria-hidden className="size-8" />
                            </span>
                            <span className="pe-1">
                                <span className="block whitespace-nowrap text-[11px] font-medium uppercase tracking-wide text-primary/55">
                                    {t("callSupport")}
                                </span>
                                <span
                                    dir="ltr"
                                    className="mt-0.5 block whitespace-nowrap text-xl font-bold leading-none text-primary sm:text-2xl"
                                >
                                    {PHONE_DISPLAY}
                                </span>
                            </span>
                        </a>
                    </div>

                    <div>
                        <FooterHeading>{t("servicesHeading")}</FooterHeading>
                        <ul className="mt-5 space-y-3">
                            {services.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-white/80 transition hover:text-secondary"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <FooterHeading>{t("usefulLinksHeading")}</FooterHeading>
                        <ul className="mt-5 space-y-3">
                            {usefulLinks.map((item) => (
                                <li key={`${item.href}-${item.label}`}>
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "inline-flex items-center gap-2 text-sm transition",
                                            item.highlighted
                                                ? "font-medium text-white"
                                                : "text-white/80 hover:text-secondary",
                                        )}
                                    >
                                        {item.highlighted && <LinkArrow />}
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <FooterHeading>{t("newsletterHeading")}</FooterHeading>
                        <p className="mt-5 text-sm leading-relaxed text-white/80">
                            {t("newsletterBody")}
                        </p>

                        <div className="mt-6 flex flex-wrap items-center gap-2.5">
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
                                    className="flex size-9 items-center justify-center rounded-full bg-white/12 text-white/85 transition hover:bg-secondary hover:text-white"
                                >
                                    <Icon aria-hidden className="size-3.5" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/10 bg-[#061409]">
                <div
                    className={cn(
                        "section-container flex flex-col items-center justify-between gap-4 py-5 text-center text-xs text-white/75 sm:flex-row sm:text-sm",
                        locale === "ar" ? "sm:text-right" : "sm:text-left",
                    )}
                >
                    <p>{t("copyright")}</p>

                    <nav
                        aria-label={t("legalNavLabel")}
                        className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2"
                    >
                        {legalLinks.map((item, index) => (
                            <span
                                key={item.label}
                                className="inline-flex items-center"
                            >
                                {index > 0 && (
                                    <span
                                        aria-hidden
                                        className="me-3 text-white/35"
                                    >
                                        |
                                    </span>
                                )}
                                <Link
                                    href={item.href}
                                    className="transition hover:text-white"
                                >
                                    {item.label}
                                </Link>
                            </span>
                        ))}
                    </nav>
                </div>
            </div>
        </footer>
    );
}
