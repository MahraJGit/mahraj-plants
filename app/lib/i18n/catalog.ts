import type { Product } from "@/data/types";
import type { CategoryListingItem, PlantCategory } from "@/app/lib/categories";
import type { Locale } from "./config";
import catalogEn from "@/messages/catalog.en.json";
import catalogAr from "@/messages/catalog.ar.json";
import gardenToolsCopy from "@/data/garden-tools-copy.json";
import indoorPlantsCopy from "@/data/indoor-plants-copy.json";
import outdoorPlantsCopy from "@/data/outdoor-plants-copy.json";

type CatalogEntry = {
    title: string;
    description: string;
    hero?: {
        eyebrow: string;
        title: string;
        description: string;
    };
    siteCta?: {
        title: string;
        insightsEyebrow: string;
        insightsTitle: string;
        insightsBody: string;
    };
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
    const entry = catalogs[locale]?.[slug] ?? catalogs.en[slug];
    const gardenToolsEntry = gardenToolsCopy[slug as keyof typeof gardenToolsCopy];
    const indoorPlantsEntry =
        indoorPlantsCopy[slug as keyof typeof indoorPlantsCopy];
    const outdoorPlantsEntry =
        outdoorPlantsCopy[slug as keyof typeof outdoorPlantsCopy];
    const categoryEntry =
        gardenToolsEntry ?? indoorPlantsEntry ?? outdoorPlantsEntry;

    if (!entry || !categoryEntry) {
        return entry;
    }

    return {
        ...entry,
        ...categoryEntry,
    };
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
    title?: string;
    description: string;
    stats?: { value: string; label: string }[];
    listing?: {
        title: string;
        description: string;
    };
    siteCta?: {
        title: string;
        insightsEyebrow: string;
        insightsTitle: string;
        insightsBody: string;
    };
};

export function localizeCategory(
    category: PlantCategory,
    copy: CategoryPageCopy | undefined,
    locale: Locale,
): PlantCategory {
    const label = copy?.label ?? category.label;
    const title = copy?.title ?? label;

    return {
        ...category,
        label,
        hero: {
            tagline: copy?.tagline ?? category.hero.tagline,
            title,
            description: copy?.description ?? category.hero.description,
        },
        listings: category.listings.map((item) =>
            localizeListingItem(item, locale),
        ),
    };
}
