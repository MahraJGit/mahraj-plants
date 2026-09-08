"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaPhoneAlt,
    FaStar,
} from "react-icons/fa";
import {
    HiChevronRight,
    HiOutlineClock,
    HiOutlineLocationMarker,
    HiOutlineMail,
} from "react-icons/hi";
import { useTranslations } from "@/app/lib/i18n";
import { cn } from "@/app/lib/utils";
import {
    FACEBOOK_HREF,
    INSTAGRAM_HREF,
    EMAIL_DISPLAY,
    EMAIL_HREF,
    PHONE_DISPLAY,
    PHONE_HREF,
} from "@/app/lib/contact";
import { useTodayOperatingHoursLabel } from "@/app/lib/i18n/use-operating-hours";

const socialLinks = [
    { label: "Facebook", href: FACEBOOK_HREF, Icon: FaFacebookF, external: true },
    { label: "Instagram", href: INSTAGRAM_HREF, Icon: FaInstagram, external: true },
    { label: "LinkedIn", href: "#", Icon: FaLinkedinIn, external: false },
] as const;

const inputClassName =
    "w-full rounded-xl border-0 bg-white px-4 py-3.5 text-sm text-primary outline-none placeholder:italic placeholder:text-primary/40 sm:px-5 sm:py-4 sm:text-[15px]";

export default function ContactFormSection() {
    const { t } = useTranslations("contactPage");
    const { t: tCommon } = useTranslations("common");
    const todayHoursLabel = useTodayOperatingHoursLabel();
    const [form, setForm] = useState({
        name: "",
        address: "",
        email: "",
        phone: "",
        message: "",
    });

    const contactDetails = [
        {
            label: t("info.locationLabel"),
            value: tCommon("nurseryAddress"),
            Icon: HiOutlineLocationMarker,
        },
        {
            label: t("info.phoneLabel"),
            value: PHONE_DISPLAY,
            href: PHONE_HREF,
            Icon: FaPhoneAlt,
        },
        {
            label: t("info.emailLabel"),
            value: EMAIL_DISPLAY,
            href: EMAIL_HREF,
            Icon: HiOutlineMail,
        },
        {
            label: t("info.workingTimeLabel"),
            value: todayHoursLabel,
            Icon: HiOutlineClock,
        },
    ] as const;

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setForm({
            name: "",
            address: "",
            email: "",
            phone: "",
            message: "",
        });
    }

    return (
        <section
            id="contact-form"
            aria-labelledby="contact-form-heading"
            className="relative isolate overflow-hidden"
        >
            <Image
                src="/images/contact/form-section-bg.webp"
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
                aria-hidden
            />
            <div
                aria-hidden
                className="absolute inset-0 bg-white/55 backdrop-blur-[2px]"
            />

            <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
                <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
                    <Image
                        src="/icons/lawn-mower.svg"
                        alt=""
                        width={67}
                        height={55}
                        unoptimized
                        style={{ width: "auto", height: "auto" }}
                        className="h-12 w-auto sm:h-14"
                        aria-hidden
                    />

                    <blockquote className="mt-6 text-[15px] leading-relaxed font-medium text-section sm:text-base lg:text-lg lg:leading-relaxed">
                        <p>&ldquo;{t("quote")}&rdquo;</p>
                    </blockquote>
                </div>

                <div className="mt-12 grid items-stretch gap-6 lg:mt-14 lg:grid-cols-2 lg:gap-8">
                    <article className="flex flex-col rounded-[1.75rem] bg-white p-6 shadow-[0_16px_40px_rgba(10,37,14,0.08)] sm:rounded-[2rem] sm:p-8 lg:p-10">
                        <h2
                            id="contact-form-heading"
                            className="text-[22px] leading-tight font-bold tracking-[-1%] text-section sm:text-[26px] lg:text-[28px]"
                        >
                            {t("info.title")}
                        </h2>

                        <p className="mt-4 text-sm leading-relaxed text-section/70 sm:text-[15px]">
                            {t("info.body")}
                        </p>

                        <ul className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4">
                            {contactDetails.map(
                                ({ label, value, Icon, ...rest }) => {
                                    const href =
                                        "href" in rest ? rest.href : undefined;
                                    const content = (
                                        <>
                                            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary/15 text-secondary sm:size-11">
                                                <Icon
                                                    aria-hidden
                                                    className="size-5"
                                                />
                                            </span>
                                            <span className="min-w-0">
                                                <span className="block text-sm font-bold text-section">
                                                    {label}
                                                </span>
                                                <span className="mt-1 block text-xs leading-snug text-section/65 sm:text-[13px]">
                                                    {value}
                                                </span>
                                            </span>
                                        </>
                                    );

                                    return (
                                        <li key={label}>
                                            {href ? (
                                                <a
                                                    href={href}
                                                    className="flex h-full items-start gap-3 rounded-2xl border border-section/10 bg-cream/50 p-3.5 transition hover:border-section/20 sm:p-4"
                                                >
                                                    {content}
                                                </a>
                                            ) : (
                                                <div className="flex h-full items-start gap-3 rounded-2xl border border-section/10 bg-cream/50 p-3.5 sm:p-4">
                                                    {content}
                                                </div>
                                            )}
                                        </li>
                                    );
                                },
                            )}
                        </ul>

                        <div className="mt-auto flex items-center justify-between gap-4 border-t border-section/10 pt-6 sm:pt-8">
                            <p className="text-sm font-semibold text-section sm:text-base">
                                {t("info.socialMedia")}
                            </p>
                            <div className="flex items-center gap-3 sm:gap-4">
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
                                        className="text-section transition hover:text-secondary"
                                    >
                                        <Icon aria-hidden className="size-4 sm:size-[1.125rem]" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </article>

                    <article className="relative isolate overflow-hidden rounded-[1.75rem] bg-section p-6 shadow-[0_16px_40px_rgba(10,37,14,0.18)] sm:rounded-[2rem] sm:p-8 lg:p-10">
                        <div
                            aria-hidden
                            className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[48px_48px]"
                        />

                        <div className="relative z-10 flex h-full flex-col">
                            <h3 className="text-center text-[26px] font-bold tracking-[-1%] text-white sm:text-[30px] lg:text-[32px]">
                                {t("form.title")}
                            </h3>

                            <form
                                onSubmit={handleSubmit}
                                className="mt-8 flex flex-1 flex-col gap-4 sm:mt-10"
                            >
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <label className="sr-only" htmlFor="contact-name">
                                        {t("form.name")}
                                    </label>
                                    <input
                                        id="contact-name"
                                        name="name"
                                        type="text"
                                        required
                                        autoComplete="name"
                                        placeholder={t("form.namePlaceholder")}
                                        value={form.name}
                                        onChange={(event) =>
                                            setForm((current) => ({
                                                ...current,
                                                name: event.target.value,
                                            }))
                                        }
                                        className={inputClassName}
                                    />

                                    <label
                                        className="sr-only"
                                        htmlFor="contact-address"
                                    >
                                        {t("form.address")}
                                    </label>
                                    <input
                                        id="contact-address"
                                        name="address"
                                        type="text"
                                        required
                                        autoComplete="street-address"
                                        placeholder={t("form.addressPlaceholder")}
                                        value={form.address}
                                        onChange={(event) =>
                                            setForm((current) => ({
                                                ...current,
                                                address: event.target.value,
                                            }))
                                        }
                                        className={inputClassName}
                                    />

                                    <label
                                        className="sr-only"
                                        htmlFor="contact-email"
                                    >
                                        {t("form.email")}
                                    </label>
                                    <input
                                        id="contact-email"
                                        name="email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        placeholder={t("form.emailPlaceholder")}
                                        value={form.email}
                                        onChange={(event) =>
                                            setForm((current) => ({
                                                ...current,
                                                email: event.target.value,
                                            }))
                                        }
                                        className={inputClassName}
                                    />

                                    <label
                                        className="sr-only"
                                        htmlFor="contact-phone"
                                    >
                                        {t("form.phone")}
                                    </label>
                                    <input
                                        id="contact-phone"
                                        name="phone"
                                        type="tel"
                                        required
                                        autoComplete="tel"
                                        placeholder={t("form.phonePlaceholder")}
                                        value={form.phone}
                                        onChange={(event) =>
                                            setForm((current) => ({
                                                ...current,
                                                phone: event.target.value,
                                            }))
                                        }
                                        className={inputClassName}
                                    />
                                </div>

                                <label
                                    className="sr-only"
                                    htmlFor="contact-message"
                                >
                                    {t("form.message")}
                                </label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    required
                                    rows={6}
                                    placeholder={t("form.messagePlaceholder")}
                                    value={form.message}
                                    onChange={(event) =>
                                        setForm((current) => ({
                                            ...current,
                                            message: event.target.value,
                                        }))
                                    }
                                    className={cn(
                                        inputClassName,
                                        "min-h-[9rem] resize-y sm:min-h-[11rem]",
                                    )}
                                />

                                <div className="mt-auto flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                                    <p className="flex items-center gap-2 text-sm italic text-white/85">
                                        <FaStar
                                            aria-hidden
                                            className="size-3.5 shrink-0 text-white"
                                        />
                                        {t("form.privacy")}
                                    </p>

                                    <button
                                        type="submit"
                                        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#E8C84A] to-[#C4A035] px-6 py-3.5 text-sm font-semibold text-primary transition hover:brightness-105 sm:px-7 sm:text-base"
                                    >
                                        {t("form.submit")}
                                        <HiChevronRight
                                            aria-hidden
                                            className="size-5"
                                        />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}
