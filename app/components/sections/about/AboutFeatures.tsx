"use client";

import Features from "@/app/components/sections/home/Features";
import { useTranslations } from "@/app/lib/i18n";

export default function AboutFeatures() {
    const { t } = useTranslations("aboutPage");

    return (
        <Features
            id="about-features"
            aria-label={t("featuresAriaLabel")}
        />
    );
}
