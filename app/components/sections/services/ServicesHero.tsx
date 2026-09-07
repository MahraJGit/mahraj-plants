"use client";

import Image from "next/image";
import FeatureHighlights from "@/app/components/ui/FeatureHighlights";
import Reveal from "@/app/components/ui/Reveal";
import {
    getServicesMessages,
    localizeHighlightCopy,
    useLocale,
} from "@/app/lib/i18n";
import { serviceHighlights } from "@/app/lib/services";

export default function ServicesHero() {
    const { locale } = useLocale();
    const messages = getServicesMessages(locale);
    const highlights = localizeHighlightCopy(serviceHighlights, locale);

    return (
        <section
            id="services-hero"
            aria-labelledby="services-hero-heading"
            className="relative isolate flex min-h-[32rem] w-full flex-col overflow-visible sm:min-h-[36rem] lg:min-h-[42rem]"
        >
            <div className="relative isolate flex min-h-[28rem] flex-1 flex-col overflow-hidden sm:min-h-[32rem]">
                <Image
                    src="/images/home/hero-bg-1.jpg"
                    alt=""
                    fill
                    sizes="100vw"
                    priority
                    className="object-cover will-change-transform hero-zoom-in"
                    aria-hidden
                />
                <div
                    aria-hidden
                    className="absolute inset-0 bg-primary/45"
                />

                <div className="hero-content relative z-10 my-auto w-full pb-8 sm:pb-10">
                    <div className="hero-copy-in mx-auto w-full max-w-4xl px-6 text-center sm:px-10">
                        <p className="font-script text-[22px] leading-tight text-white sm:text-[28px] lg:text-[32px]">
                            {messages.hero.eyebrow}
                        </p>

                        <h1
                            id="services-hero-heading"
                            className="mt-4 text-balance"
                        >
                            {messages.hero.title}
                        </h1>

                        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base lg:text-lg">
                            {messages.hero.description}
                        </p>
                    </div>
                </div>
            </div>

            <div className="relative z-20 -mt-16 sm:-mt-20">
                <div className="section-container overflow-visible pt-0">
                    <Reveal>
                        <FeatureHighlights items={highlights} />
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
