"use client";

import { useMemo } from "react";
import Features, {
    type FeatureCard,
} from "@/app/components/sections/home/Features";
import { useTranslations } from "@/app/lib/i18n";

const featureIcons = [
    "/icons/consultation.svg",
    "/icons/execution.svg",
    "/icons/gurantee.svg",
    "/icons/reliable.svg",
];

type FeatureCopy = {
    title: string;
    description: string;
};

export default function AboutFeatures() {
    const { t, tObject, locale } = useTranslations("aboutPage");

    const cards = useMemo<FeatureCard[]>(() => {
        const copy = tObject<FeatureCopy[]>("features.cards");
        if (!Array.isArray(copy)) return [];

        return copy.map((card, index) => ({
            icon: featureIcons[index] ?? featureIcons[0],
            title: card.title,
            description: card.description,
        }));
    }, [tObject, locale]);

    return (
        <Features
            id="about-features"
            aria-label={t("featuresAriaLabel")}
            cards={cards}
        />
    );
}
