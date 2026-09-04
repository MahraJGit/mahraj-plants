import { notFound } from "next/navigation";
import CategoryHero from "../../../components/sections/category/CategoryHero";
import CategoryStats from "../../../components/sections/category/CategoryStats";
import CategoryListing from "../../../components/sections/category/CategoryListing";
import {
    getAllCategorySlugs,
    getCategoryBySlug,
} from "@/app/lib/categories";
import Consultation from "@/app/components/sections/home/Consultation";

type CategoryPageProps = {
    params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
    return getAllCategorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
    const { slug } = await params;
    const category = getCategoryBySlug(slug);

    if (!category) {
        return { title: "Category Not Found | Mahraj Plants" };
    }

    return {
        title: `${category.hero.title} | Mahraj Plants`,
        description: category.hero.description,
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
            <Consultation variant="newsletter" />
        </>
    );
}
