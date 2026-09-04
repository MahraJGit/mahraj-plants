import { categories } from "@/data/categories";
import type { Product } from "@/data/types";
import { getProductsByCategoryId } from "@/app/lib/products";

export type CategoryListingItem = {
    id: string;
    slug: string;
    name: string;
    image: string;
    alt: string;
    description: string;
};

export type PlantCategory = {
    slug: string;
    label: string;
    hero: {
        tagline: string;
        title: string;
        description: string;
    };
    listings: CategoryListingItem[];
};

export const categoryStats = [
    {
        value: "500+",
        label: "Projects Complete",
        icon: "/icons/projects-completed.svg",
    },
    {
        value: "300+",
        label: "Trees & Plants Selected",
        icon: "/icons/trees-plants.svg",
    },
    {
        value: "98%",
        label: "Client Satisfaction",
        icon: "/icons/client-satisfaction.svg",
    },
    {
        value: "20+",
        label: "Expert Team",
        icon: "/icons/expert-team.svg",
    },
] as const;

const categoryHeroCopy: Record<
    string,
    { tagline: string; description: string }
> = {
    "indoor-plants": {
        tagline: "Bring Nature Indoors",
        description:
            "Refresh your space with beautiful indoor plants that bring life, freshness, and style to every room.",
    },
    "outdoor-plants": {
        tagline: "Grow Outdoors with Confidence",
        description:
            "Hardy outdoor plants selected to thrive in sun, shade, and seasonal weather across Saudi gardens.",
    },
    "seasonal-flowers": {
        tagline: "Colour for Every Season",
        description:
            "Discover rotating seasonal blooms that keep your garden fresh, fragrant, and full of life all year.",
    },
    vegetables: {
        tagline: "From Garden to Table",
        description:
            "Grow fresh, healthy produce at home with vegetable plants and seedlings suited to local growing conditions.",
    },
    "garden-tools": {
        tagline: "Tools for Every Gardener",
        description:
            "Durable hand tools and garden equipment to make planting, pruning, and maintenance easier.",
    },
    "pots-and-planters": {
        tagline: "Style Meets Function",
        description:
            "Browse decorative pots and planters in ceramic, terracotta, and modern finishes for every space.",
    },
};

function toListingItem(product: Product): CategoryListingItem {
    return {
        id: product.id,
        slug: product.slug,
        name: product.title,
        image: product.image,
        alt: product.title,
        description: product.description,
    };
}

export const plantCategories: PlantCategory[] = categories.map((category) => {
    const hero = categoryHeroCopy[category.slug];

    return {
        slug: category.slug,
        label: category.name,
        hero: {
            tagline: hero?.tagline ?? `Explore ${category.name}`,
            title: category.name,
            description:
                hero?.description ??
                `Browse our ${category.name.toLowerCase()} collection from Mahraj Plants.`,
        },
        listings: getProductsByCategoryId(category.id).map(toListingItem),
    };
});

export const plantCategoryNav = plantCategories.map(({ slug, label }) => ({
    label,
    href: `/categories/${slug}`,
}));

export function getCategoryBySlug(slug: string): PlantCategory | undefined {
    return plantCategories.find((category) => category.slug === slug);
}

export function getCategoryById(id: string): PlantCategory | undefined {
    const category = categories.find((item) => item.id === id);
    return category ? getCategoryBySlug(category.slug) : undefined;
}

export function getAllCategorySlugs(): string[] {
    return plantCategories.map((category) => category.slug);
}
