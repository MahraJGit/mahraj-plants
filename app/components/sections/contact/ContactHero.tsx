"use client";

import Image from "next/image";
import { useTranslations } from "@/app/lib/i18n";

function GinkgoLeaf({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 40 40"
            fill="currentColor"
            aria-hidden
            className={className}
        >
            <path d="M20 4c-2 6-8 10-8 16 0 4 2 8 6 10-3-4-3-9 0-13 2-3 2-7 2-13zm0 0c2 6 8 10 8 16 0 4-2 8-6 10 3-4 3-9 0-13-2-3-2-7-2-13z" />
        </svg>
    );
}

export default function ContactHero() {
    const { t } = useTranslations("contactPage.hero");

    return (
        <section
            aria-labelledby="contact-hero-heading"
            className="relative isolate flex min-h-[20rem] items-center overflow-hidden sm:min-h-[22rem] lg:min-h-[26rem]"
        >
            <Image
                src="/images/contact/hero-bg.webp"
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover"
                aria-hidden
            />
            <div aria-hidden className="absolute inset-0 bg-section/70" />

            <GinkgoLeaf className="pointer-events-none absolute bottom-[22%] left-[3%] size-12 text-[#C4A862]/40 sm:left-[6%] sm:size-14 lg:bottom-[28%] lg:left-[8%] lg:size-16" />
            <GinkgoLeaf className="pointer-events-none absolute top-[28%] right-[3%] size-11 text-[#C4A862]/35 sm:right-[6%] sm:size-12 lg:top-[32%] lg:right-[8%] lg:size-14" />

            <div className="hero-content relative z-10 w-full py-12 sm:py-16">
                <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
                    <Image
                        src="/icons/singleLeaf.svg"
                        alt=""
                        width={14}
                        height={21}
                        unoptimized
                        style={{ width: "auto", height: "auto" }}
                        className="mx-auto h-6 w-auto"
                        aria-hidden
                    />

                    <p className="mt-4 font-script text-[26px] leading-none text-white sm:text-[32px] lg:text-[36px]">
                        {t("eyebrow")}
                    </p>

                    <h1
                        id="contact-hero-heading"
                        className="mt-4 text-[32px] font-bold leading-tight text-white sm:text-[40px] lg:text-[48px]"
                    >
                        {t("title")}
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base lg:text-lg">
                        {t("description")}
                    </p>
                </div>
            </div>
        </section>
    );
}
