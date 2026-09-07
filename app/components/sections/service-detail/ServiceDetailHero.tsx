"use client";

import Image from "next/image";
import FeatureHighlights from "@/app/components/ui/FeatureHighlights";
import Reveal from "@/app/components/ui/Reveal";
import {
    getServicesMessages,
    localizeHighlightCopy,
    localizeService,
    useLocale,
} from "@/app/lib/i18n";
import { serviceHighlights, type ServiceDetail } from "@/app/lib/services";

type ServiceDetailHeroProps = {
    service: ServiceDetail;
};

export default function ServiceDetailHero({ service }: ServiceDetailHeroProps) {
    const { locale } = useLocale();
    const messages = getServicesMessages(locale);
    const localized = localizeService(service, locale);
    const highlights = localizeHighlightCopy(serviceHighlights, locale);

    return (
        <section
            aria-labelledby="service-detail-heading"
            className="relative isolate flex min-h-[32rem] w-full flex-col overflow-visible sm:min-h-[36rem] lg:min-h-[40rem]"
        >
            <div className="relative isolate flex min-h-[26rem] flex-1 flex-col overflow-hidden sm:min-h-[30rem]">
                <Image
                    src={localized.image}
                    alt=""
                    fill
                    sizes="100vw"
                    priority
                    className="object-cover will-change-transform hero-zoom-in"
                    aria-hidden
                />
                <div aria-hidden className="absolute inset-0 bg-primary/50" />

                <div className="hero-content relative z-10 my-auto w-full pb-8 sm:pb-10">
                    <div className="hero-copy-in mx-auto w-full max-w-4xl px-6 text-center sm:px-10">
                        <p className="font-script text-[22px] leading-tight text-white sm:text-[28px] lg:text-[32px]">
                            {messages.detail.eyebrow}
                        </p>

                        <h1
                            id="service-detail-heading"
                            className="mt-4 text-balance"
                        >
                            {localized.title}
                        </h1>

                        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base lg:text-lg">
                            {localized.heroDescription}
                        </p>
                    </div>
                </div>

                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 text-white sm:h-20"
                >
                    <svg
                        viewBox="0 0 1440 80"
                        preserveAspectRatio="none"
                        className="h-full w-full"
                        fill="currentColor"
                    >
                        <path d="M0 80V40c80-8 160-24 240-28s160 12 240 16 160-20 240-24 160 16 240 20 160-12 240-16 160 20 240 16V80H0Z" />
                    </svg>
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
