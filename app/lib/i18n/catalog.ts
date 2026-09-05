import type { Product } from "@/data/types";
import type { CategoryListingItem, PlantCategory } from "@/app/lib/categories";
import type { Locale } from "./config";
import catalogEn from "@/messages/catalog.en.json";
import catalogAr from "@/messages/catalog.ar.json";

type CatalogEntry = {
    title: string;
    description: string;
};

type CatalogMap = Record<string, CatalogEntry>;

const catalogs: Record<Locale, CatalogMap> = {
    en: catalogEn,
    ar: catalogAr,
};

export function getCatalogEntry(
    slug: string,
    locale: Locale,
): CatalogEntry | undefined {
    return catalogs[locale]?.[slug] ?? catalogs.en[slug];
}

export function localizeProduct(product: Product, locale: Locale): Product {
    const entry = getCatalogEntry(product.slug, locale);
    if (!entry) return product;

    return {
        ...product,
        title: entry.title,
        description: entry.description,
    };
}

export function localizeListingItem(
    item: CategoryListingItem,
    locale: Locale,
): CategoryListingItem {
    const entry = getCatalogEntry(item.slug, locale);
    if (!entry) return item;

    return {
        ...item,
        name: entry.title,
        alt: entry.title,
        description: entry.description,
    };
}

export type CategoryPageCopy = {
    label: string;
    tagline: string;
    description: string;
};

export function localizeCategory(
    category: PlantCategory,
    copy: CategoryPageCopy | undefined,
    locale: Locale,
): PlantCategory {
    const label = copy?.label ?? category.label;

    return {
        ...category,
        label,
        hero: {
            tagline: copy?.tagline ?? category.hero.tagline,
            title: label,
            description: copy?.description ?? category.hero.description,
        },
        listings: category.listings.map((item) =>
            localizeListingItem(item, locale),
        ),
    };
}
