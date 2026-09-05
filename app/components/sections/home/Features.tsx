"use client";

import { useMemo } from "react";
import FeatureHighlights from "../../ui/FeatureHighlights";
import { useTranslations } from "@/app/lib/i18n";

export type FeatureCard = {
    icon: string;
    title: string;
    description: string;
};

const featureIcons = [
    "/icons/consultation.svg",
    "/icons/execution.svg",
    "/icons/gurantee.svg",
    "/icons/reliable.svg",
];

type FeaturesProps = {
    cards?: FeatureCard[];
    id?: string;
    "aria-label"?: string;
};

type FeatureCopy = {
    title: string;
    description: string;
};

export default function Features({
    cards,
    id = "features",
    "aria-label": ariaLabel,
}: FeaturesProps) {
    const { t, tObject, locale } = useTranslations("home.features");

    const defaultCards = useMemo(() => {
        const copy = tObject<FeatureCopy[]>("cards");
        if (!Array.isArray(copy)) return [];

        return copy.map((card, index) => ({
            icon: featureIcons[index] ?? featureIcons[0],
            title: card.title,
            description: card.description,
        }));
    }, [tObject, locale]);

    return (
        <section
            id={id}
            aria-label={ariaLabel ?? t("ariaLabel")}
            className="relative z-20 overflow-visible"
        >
            <div className="section-container pt-0">
                <div className="relative -mt-20 sm:-mt-24">
                    <FeatureHighlights items={cards ?? defaultCards} />
                </div>
            </div>
        </section>
    );
}
