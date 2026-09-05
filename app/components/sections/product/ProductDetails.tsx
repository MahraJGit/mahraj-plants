"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import type { PlantCategory } from "@/app/lib/categories";
import type { Product } from "@/data/types";
import { getWhatsAppHref } from "@/app/lib/contact";
import {
    localizeCategory,
    localizeProduct,
    useLocale,
    useTranslations,
    type CategoryPageCopy,
} from "@/app/lib/i18n";
import ProductImageZoom from "./ProductImageZoom";

type ProductDetailsProps = {
    product: Product;
    category: PlantCategory;
};

export default function ProductDetails({
    product,
    category,
}: ProductDetailsProps) {
    const { locale } = useLocale();
    const { t } = useTranslations("productPage");
    const { tObject } = useTranslations("categoriesPage");

    const localizedCategory = useMemo(() => {
        const copy = tObject<CategoryPageCopy>(`bySlug.${category.slug}`);
        return localizeCategory(category, copy, locale);
    }, [category, locale, tObject]);

    const localizedProduct = useMemo(
        () => localizeProduct(product, locale),
        [product, locale],
    );

    const whatsappHref = getWhatsAppHref(
        t("whatsappMessage", { product: localizedProduct.title }),
    );

    return (
        <section
            aria-labelledby="product-heading"
            className="bg-cream/40"
        >
            <div className="section-container">
                <nav
                    aria-label={t("breadcrumb")}
                    className="mb-8 text-sm text-primary/55 sm:mb-10"
                >
                    <ol className="flex flex-wrap items-center gap-2">
                        <li>
                            <Link
                                href="/"
                                className="transition hover:text-secondary"
                            >
                                {t("home")}
                            </Link>
                        </li>
                        <li aria-hidden className="text-primary/30">
                            /
                        </li>
                        <li>
                            <Link
                                href={`/categories/${localizedCategory.slug}`}
                                className="transition hover:text-secondary"
                            >
                                {localizedCategory.label}
                            </Link>
                        </li>
                        <li aria-hidden className="text-primary/30">
                            /
                        </li>
                        <li className="font-medium text-primary">
                            {localizedProduct.title}
                        </li>
                    </ol>
                </nav>

                <div className="grid items-start gap-8 lg:grid-cols-[24rem_minmax(0,1fr)] lg:gap-14">
                    <ProductImageZoom
                        src={localizedProduct.image}
                        alt={localizedProduct.title}
                    />

                    <div className="flex flex-col justify-center py-2 lg:py-6">
                        <p className="flex items-center gap-2">
                            <Image
                                src="/icons/singleLeaf.svg"
                                alt=""
                                width={14}
                                height={21}
                                unoptimized
                                className="h-5 w-auto shrink-0"
                                aria-hidden
                            />
                            <Link
                                href={`/categories/${localizedCategory.slug}`}
                                className="font-script text-[28px] leading-none text-secondary transition hover:text-primary sm:text-[32px]"
                            >
                                {localizedCategory.label}
                            </Link>
                        </p>

                        <h1
                            id="product-heading"
                            className="mt-4 text-[28px] leading-tight font-bold tracking-[-2%] text-primary sm:text-4xl lg:text-[42px]"
                        >
                            {localizedProduct.title}
                        </h1>

                        <p className="mt-5 text-sm leading-relaxed text-primary/70 sm:text-base">
                            {localizedProduct.description}
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3 sm:mt-10">
                            <a
                                href={whatsappHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex cursor-pointer items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-primary/90 sm:px-8 sm:text-base"
                            >
                                {t("inquireWhatsApp")}
                            </a>
                            <Link
                                href={`/categories/${localizedCategory.slug}`}
                                className="inline-flex cursor-pointer items-center justify-center rounded-full border border-primary/15 bg-white px-7 py-3.5 text-sm font-medium text-primary transition-colors hover:border-secondary hover:text-secondary sm:px-8 sm:text-base"
                            >
                                {t("backTo", {
                                    category: localizedCategory.label,
                                })}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
