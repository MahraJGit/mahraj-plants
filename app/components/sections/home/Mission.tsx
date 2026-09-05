"use client";

import Image from "next/image";
import { useTranslations } from "@/app/lib/i18n";

export default function Mission() {
    const { t } = useTranslations("home.mission");

    return (
        <section
            id="mission"
            aria-labelledby="vision-heading"
            className="bg-cream/40"
        >
            <div className="section-container">
                <div className="grid items-stretch gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 xl:gap-16">
                    <div className="flex flex-col justify-center lg:order-1">
                        <div>
                            <h2
                                id="vision-heading"
                                className="text-[22px] font-bold leading-tight tracking-[-2%] text-primary sm:text-2xl lg:text-[28px]"
                            >
                                {t("visionTitle")}
                            </h2>
                            <p className="mt-4 text-sm leading-relaxed text-primary/70 sm:text-base">
                                {t("visionBody")}
                            </p>
                        </div>

                        <div
                            aria-hidden
                            className="my-7 border-t border-dotted border-[#C4A862]/70 sm:my-8"
                        />

                        <div>
                            <h2
                                id="mission-heading"
                                className="text-[22px] font-bold leading-tight tracking-[-2%] text-primary sm:text-2xl lg:text-[28px]"
                            >
                                {t("missionTitle")}
                            </h2>
                            <p className="mt-4 text-sm leading-relaxed text-primary/70 sm:text-base">
                                {t("missionBody")}
                            </p>
                        </div>
                    </div>

                    <div className="relative mx-auto h-full min-h-[22rem] w-full sm:min-h-[26rem] lg:order-2 lg:mx-0">
                        <div className="absolute inset-0 overflow-hidden rounded-se-[2.5rem] rounded-es-[2.5rem] shadow-[0_20px_50px_rgba(10,37,14,0.12)] sm:rounded-se-[3rem] sm:rounded-es-[3rem]">
                            <Image
                                src="/images/home/our-mission.webp"
                                alt={t("imageAlt")}
                                fill
                                sizes="(max-width: 1024px) 100vw, 55vw"
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
