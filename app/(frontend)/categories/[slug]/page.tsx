import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryHero from "../../../components/sections/category/CategoryHero";
import CategoryStats from "../../../components/sections/category/CategoryStats";
import CategoryListing from "../../../components/sections/category/CategoryListing";
import {
    getAllCategorySlugs,
    getCategoryBySlug,
} from "@/app/lib/categories";
import SiteCTA from "@/app/components/sections/shared/SiteCTA";
import JsonLd from "@/app/components/seo/JsonLd";
import { getDictionary } from "@/app/lib/i18n/get-dictionary";
import { getLocale } from "@/app/lib/i18n/get-locale";
import {
    breadcrumbJsonLd,
    graphJsonLd,
    organizationJsonLd,
    webPageJsonLd,
    websiteJsonLd,
} from "@/app/lib/seo/json-ld";
import { buildPageMetadata } from "@/app/lib/seo/metadata";

type CategoryPageProps = {
    params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
    return getAllCategorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: CategoryPageProps): Promise<Metadata> {
    const { slug } = await params;
    const category = getCategoryBySlug(slug);
    const locale = await getLocale();
    const dictionary = await getDictionary(locale);

    if (!category) {
        return {
            title: dictionary.categoriesPage.notFoundTitle,
            robots: { index: false },
        };
    }

    const copy =
        dictionary.categoriesPage.bySlug[
            slug as keyof typeof dictionary.categoriesPage.bySlug
        ];
    const label = copy?.label ?? category.label;
    const description = copy?.description ?? category.hero.description;

    return buildPageMetadata({
        title: dictionary.categoriesPage.metaTitle.replace("{category}", label),
        description,
        path: `/categories/${slug}`,
        locale,
        image: "/images/categories/categories-hero-bg.webp",
        imageAlt: label,
    });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { slug } = await params;
    const category = getCategoryBySlug(slug);

    if (!category) {
        notFound();
    }

    const locale = await getLocale();
    const dictionary = await getDictionary(locale);
    const copy =
        dictionary.categoriesPage.bySlug[
            slug as keyof typeof dictionary.categoriesPage.bySlug
        ];
    const label = copy?.label ?? category.label;
    const description = copy?.description ?? category.hero.description;

    return (
        <>
            <JsonLd
                data={graphJsonLd(
                    organizationJsonLd(),
                    websiteJsonLd(),
                    webPageJsonLd({
                        title: dictionary.categoriesPage.metaTitle.replace(
                            "{category}",
                            label,
                        ),
                        description,
                        path: `/categories/${slug}`,
                    }),
                    breadcrumbJsonLd([
                        { name: dictionary.nav.home, path: "/" },
                        { name: label, path: `/categories/${slug}` },
                    ]),
                )}
            />
            <CategoryHero category={category} />
            <CategoryStats />
            <CategoryListing category={category} />
            <SiteCTA />
        </>
    );
}
