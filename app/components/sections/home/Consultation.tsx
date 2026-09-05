"use client";

import Image from "next/image";
import Button from "../../ui/Button";
import { CONSULTATION_WHATSAPP_HREF } from "@/app/lib/contact";
import { useTranslations } from "@/app/lib/i18n";

export default function Consultation() {
    const { t } = useTranslations("home.consultation");
    const { t: tCommon } = useTranslations("common");

    return (
        <section
            id="consultation"
            aria-labelledby="consultation-heading"
            className="relative isolate overflow-hidden"
        >
            <Image
                src="/images/home/bg-consultation.webp"
                alt=""
                fill
                sizes="100vw"
                className="object-cover object-[70%_center] lg:object-center"
                aria-hidden
            />

            <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/45 lg:from-primary/92 lg:via-primary/70 lg:to-primary/35 rtl:bg-gradient-to-l"
            />

            <div className="section-container relative">
                <div className="max-w-xl lg:max-w-2xl">
                    <h2
                        id="consultation-heading"
                        className="text-[28px] leading-[1.15] font-bold tracking-[-2%] text-white sm:text-4xl lg:text-[42px]"
                    >
                        {t("title")}
                    </h2>

                    <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/90 sm:text-base">
                        {t("description")}
                    </p>

                    <Button
                        variant="primary"
                        href={CONSULTATION_WHATSAPP_HREF}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-8 rounded-lg px-8 py-3.5 sm:mt-10"
                    >
                        {tCommon("getConsultation")}
                    </Button>
                </div>
            </div>
        </section>
    );
}
