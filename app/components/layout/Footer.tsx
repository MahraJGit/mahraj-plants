import Image from "next/image";
import Link from "next/link";
import {
    FaFacebookF,
    FaGooglePlusG,
    FaInstagram,
    FaTwitter,
} from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import { cn } from "@/app/lib/utils";

const services = [
    { label: "Landscape Design & Planning", href: "/#services" },
    { label: "Irrigation & Drainage Solutions", href: "/#services" },
    { label: "Green Maintenance Packages", href: "/#services" },
    { label: "Hardscaping & Lighting", href: "/#services" },
    { label: "Rooftop Garden Upgrades", href: "/#services" },
];

const usefulLinks = [
    { label: "Home", href: "/#hero", highlighted: true },
    { label: "About us", href: "/#about" },
    { label: "Why choose us", href: "/#why-us" },
    { label: "Feature Projects", href: "/#portfolio" },
    { label: "Gallery", href: "/#portfolio" },
    { label: "Pricing Packages", href: "/#consultation" },
];

const socialLinks = [
    { label: "Facebook", href: "#", Icon: FaFacebookF },
    { label: "Twitter", href: "#", Icon: FaTwitter },
    { label: "Instagram", href: "#", Icon: FaInstagram },
    { label: "Google Plus", href: "#", Icon: FaGooglePlusG },
];

const legalLinks = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms & Condition", href: "#" },
    { label: "Site Map", href: "#" },
    { label: "Support", href: "/#consultation" },
];

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

function ContactIcon({
    src,
    alt,
}: {
    src: string;
    alt: string;
}) {
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
            className="size-3 shrink-0 text-[#C4A862]"
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
    return (
        <footer className="mt-auto bg-primary text-white">
            <div className="section-container pb-10 pt-12 lg:pb-14 lg:pt-16">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 xl:gap-12">
                    <div className="sm:col-span-2 lg:col-span-1">
                        <Link
                            href="/#hero"
                            className="relative inline-block h-11 w-[168px]"
                        >
                            <Image
                                src="/mahraj-landscaping-logo.webp"
                                alt="Mahraj Landscaping"
                                fill
                                sizes="168px"
                                className="object-contain object-left"
                            />
                        </Link>

                        <ul className="mt-6 space-y-4 text-sm leading-relaxed text-white/85">
                            <li className="flex items-start gap-3">
                                <ContactIcon
                                    src="/icons/location-white.svg"
                                    alt="Location"
                                />
                                <span>
                                    Nursery: Heet, Old Al kharj Road, Riyadh, KSA
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <ContactIcon
                                    src="/icons/email-white.svg"
                                    alt="Email"
                                />
                                <Link
                                    href="mailto:info@mahrajplants.com"
                                    className="transition hover:text-secondary"
                                >
                                    info@mahrajplants.com
                                </Link>
                            </li>
                            <li className="flex items-start gap-3">
                                <ContactIcon
                                    src="/icons/clock-white.svg"
                                    alt="Hours"
                                />
                                <span>
                                    Wed: 9:00 – 12:00 / Morning | 1:00 PM – 6:00
                                    PM / Evening
                                </span>
                            </li>
                        </ul>

                        <a
                            href="tel:+966500000000"
                            className="mt-6 inline-flex max-w-full items-center gap-3 rounded-full bg-white py-2 pl-2 pr-5 shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition hover:shadow-[0_12px_28px_rgba(0,0,0,0.22)] sm:pr-6"
                        >
                            <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-secondary text-white">
                                <MdSupportAgent aria-hidden className="size-8" />
                            </span>
                            <span className="min-w-0">
                                <span className="block text-[11px] font-medium uppercase tracking-wide text-primary/55">
                                    Call Us Support 24/7
                                </span>
                                <span className="block text-xl font-bold leading-tight text-primary sm:text-2xl">
                                    0896 123 456
                                </span>
                            </span>
                        </a>
                    </div>

                    <div>
                        <FooterHeading>Our Services</FooterHeading>
                        <ul className="mt-5 space-y-3">
                            {services.map((item) => (
                                <li key={item.label}>
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
                        <FooterHeading>Useful Links</FooterHeading>
                        <ul className="mt-5 space-y-3">
                            {usefulLinks.map((item) => (
                                <li key={item.label}>
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
                        <FooterHeading>Get Our Newsletter</FooterHeading>
                        <p className="mt-5 text-sm leading-relaxed text-white/80">
                            Garden tips, ideas &amp; offers—straight to your inbox.
                        </p>

                        <div className="mt-6 flex flex-wrap items-center gap-2.5">
                            {socialLinks.map(({ label, href, Icon }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    aria-label={label}
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
                <div className="section-container flex flex-col items-center justify-between gap-4 py-5 text-center text-xs text-white/75 sm:flex-row sm:text-left sm:text-sm">
                    <p>
                        © 2026 Mahraj Plants &amp; Landscaping. All Rights Reserved.
                    </p>

                    <nav
                        aria-label="Legal links"
                        className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2"
                    >
                        {legalLinks.map((item, index) => (
                            <span key={item.label} className="inline-flex items-center">
                                {index > 0 && (
                                    <span
                                        aria-hidden
                                        className="mr-3 text-white/35"
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
