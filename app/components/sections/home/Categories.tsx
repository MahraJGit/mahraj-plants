"use client";

import { useMemo } from "react";
import { CategoryCard, type Category } from "@/app/components/ui";
import { useTranslations } from "@/app/lib/i18n";

const categoryMeta = [
    {
        image: "/images/home/m-indoor.webp",
        href: "/categories/indoor-plants",
    },
    {
        image: "/images/home/m-outdoor.webp",
        href: "/categories/outdoor-plants",
    },
    {
        image: "/images/home/m-trees.webp",
        href: "/categories/pots-and-planters",
    },
    {
        image: "/images/home/hero-bg-1.jpg",
        href: "/categories/seasonal-flowers",
    },
];

type CategoryCopy = {
    title: string;
    alt: string;
    tagline: string;
};

export default function Categories() {
    const { t, tObject, locale } = useTranslations("home.categories");

    const categories = useMemo(() => {
        const items = tObject<CategoryCopy[]>("items");
        if (!Array.isArray(items)) return [] as Category[];

        return items.map((item, index) => ({
            title: item.title,
            image: categoryMeta[index].image,
            alt: item.alt,
            tagline: item.tagline,
            href: categoryMeta[index].href,
        }));
    }, [tObject, locale]);

    return (
        <section
            id="categories"
            aria-labelledby="categories-heading"
            className="relative overflow-hidden bg-cream/40"
        >
            <div
                aria-hidden
                className="pointer-events-none absolute top-16 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-secondary/10 blur-3xl"
            />

            <div className="section-container relative">
                <header className="mx-auto max-w-4xl text-center">
                    <p className="text-sm font-medium tracking-[0.2em] text-secondary uppercase">
                        {t("eyebrow")}
                    </p>

                    <h2
                        id="categories-heading"
                        className="mt-4 text-[28px] leading-[1.15] font-semibold tracking-[-2%] text-primary sm:text-4xl lg:text-[42px]"
                    >
                        <span className="text-secondary">{t("titleBefore")}</span>
                        {t("titleAfter")}
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-primary/65 sm:text-base">
                        {t("description")}
                    </p>
                </header>

                <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-8 lg:mt-16 lg:grid-cols-4 lg:gap-x-10">
                    {categories.map((category) => (
                        <li key={category.href}>
                            <CategoryCard category={category} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
