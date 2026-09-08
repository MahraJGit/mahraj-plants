"use client";

import Image from "next/image";
import { useTranslations } from "@/app/lib/i18n";

export default function AboutQuote() {
    const { t } = useTranslations("aboutPage.quote");

    return (
        <section aria-label={t("ariaLabel")} className="bg-white">
            <div className="section-container">
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

                    <blockquote className="mt-6 font-script text-[22px] leading-snug text-primary sm:text-[28px] sm:leading-relaxed lg:text-[32px]">
                        <p>{t("text")}</p>
                    </blockquote>
                </div>
            </div>
        </section>
    );
}
