import { notFound } from "next/navigation";
import CategoryHero from "../../../components/sections/category/CategoryHero";
import CategoryStats from "../../../components/sections/category/CategoryStats";
import CategoryListing from "../../../components/sections/category/CategoryListing";
import {
    getAllCategorySlugs,
    getCategoryBySlug,
} from "@/app/lib/categories";
import SiteCTA from "@/app/components/sections/shared/SiteCTA";
import { getDictionary } from "@/app/lib/i18n/get-dictionary";
import { getLocale } from "@/app/lib/i18n/get-locale";

type CategoryPageProps = {
    params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
    return getAllCategorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
    const { slug } = await params;
    const category = getCategoryBySlug(slug);
    const locale = await getLocale();
    const dictionary = await getDictionary(locale);

    if (!category) {
        return { title: dictionary.categoriesPage.notFoundTitle };
    }

    const copy = dictionary.categoriesPage.bySlug[
        slug as keyof typeof dictionary.categoriesPage.bySlug
    ];
    const label = copy?.label ?? category.label;

    return {
        title: dictionary.categoriesPage.metaTitle.replace("{category}", label),
        description: copy?.description ?? category.hero.description,
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { slug } = await params;
    const category = getCategoryBySlug(slug);

    if (!category) {
        notFound();
    }

    return (
        <>
            <CategoryHero category={category} />
            <CategoryStats />
            <CategoryListing category={category} />
            <SiteCTA />
        </>
    );
}
