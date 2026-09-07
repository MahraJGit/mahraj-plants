"use client";

import Image from "next/image";
import { getBlogsMessages, useLocale } from "@/app/lib/i18n";

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

export default function BlogHero() {
    const { locale } = useLocale();
    const messages = getBlogsMessages(locale);

    return (
        <section
            aria-labelledby="blog-hero-heading"
            className="relative isolate flex min-h-[20rem] items-center overflow-hidden sm:min-h-[22rem] lg:min-h-[26rem]"
        >
            <Image
                src="/images/blogs/blog-bg.webp"
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover"
                aria-hidden
            />
            <div aria-hidden className="absolute inset-0 bg-primary/55" />

            <GinkgoLeaf className="pointer-events-none absolute top-1/2 left-[4%] size-14 -translate-y-1/2 text-[#C4A862]/35 sm:left-[8%] sm:size-16" />
            <GinkgoLeaf className="pointer-events-none absolute top-[58%] right-[4%] size-12 text-[#C4A862]/30 sm:right-[8%] sm:size-14" />

            <div className="hero-content relative z-10 w-full py-12 sm:py-16">
                <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
                    <Image
                        src="/icons/singleLeaf.svg"
                        alt=""
                        width={14}
                        height={21}
                        unoptimized
                        style={{ width: "auto" }}
                        className="mx-auto h-6 w-auto"
                        aria-hidden
                    />

                    <p className="mt-4 font-script text-[26px] leading-none text-white sm:text-[32px] lg:text-[36px]">
                        {messages.hero.eyebrow}
                    </p>

                    <h1
                        id="blog-hero-heading"
                        className="mt-4 text-[32px] font-bold leading-tight text-white sm:text-[40px] lg:text-[48px]"
                    >
                        {messages.hero.title}
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base lg:text-lg">
                        {messages.hero.description}
                    </p>
                </div>
            </div>
        </section>
    );
}
