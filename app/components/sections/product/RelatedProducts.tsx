"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { cn } from "@/app/lib/utils";
import type { Product } from "@/data/types";
import {
    localizeProduct,
    useLocale,
    useTranslations,
} from "@/app/lib/i18n";

type RelatedProductsProps = {
    products: Product[];
    categoryLabel: string;
};

export default function RelatedProducts({
    products,
    categoryLabel,
}: RelatedProductsProps) {
    const { locale } = useLocale();
    const { t } = useTranslations("productPage");

    const localizedProducts = useMemo(
        () => products.map((product) => localizeProduct(product, locale)),
        [products, locale],
    );

    if (localizedProducts.length === 0) {
        return null;
    }

    return (
        <section
            aria-labelledby="related-products-heading"
            className="bg-white"
        >
            <div className="section-container pt-0">
                <header className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-medium tracking-[0.2em] text-secondary uppercase">
                        {t("relatedEyebrow")}
                    </p>
                    <h2
                        id="related-products-heading"
                        className="mt-4 text-[28px] leading-[1.15] font-bold tracking-[-2%] text-primary sm:text-4xl"
                    >
                        {t("relatedTitle", { category: categoryLabel })}
                    </h2>
                </header>

                <ul className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-7">
                    {localizedProducts.map((product) => (
                        <li key={product.id}>
                            <Link
                                href={`/products/${product.slug}`}
                                className="group relative aspect-[4/5] min-h-[220px] block overflow-hidden rounded-[1.75rem] bg-white shadow-[0_12px_40px_rgba(10,37,14,0.08)] outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 sm:min-h-[260px]"
                            >
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                    className="object-contain transition-transform duration-500 group-hover:scale-105 group-focus-visible:scale-105"
                                />
                                <div
                                    className={cn(
                                        "absolute inset-0 flex items-center justify-center bg-primary/55 px-6 text-center opacity-0 transition-opacity duration-300",
                                        "group-hover:opacity-100 group-focus-visible:opacity-100",
                                        "[@media(hover:none)]:opacity-100",
                                    )}
                                >
                                    <h3 className="text-lg font-bold text-white sm:text-xl">
                                        {product.title}
                                    </h3>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
