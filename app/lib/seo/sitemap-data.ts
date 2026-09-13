import { getAllPublishedBlogSlugs } from "@/app/lib/blogs";
import { getAllCategorySlugs } from "@/app/lib/categories";
import { getAllProductSlugs } from "@/app/lib/products";
import { getAllProjectSlugs } from "@/app/lib/projects";
import { getAllServiceSlugs } from "@/app/lib/services";

export type SitemapEntry = {
    path: string;
    changeFrequency:
        | "always"
        | "hourly"
        | "daily"
        | "weekly"
        | "monthly"
        | "yearly"
        | "never";
    priority: number;
};

const STATIC_PAGES: SitemapEntry[] = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/about", changeFrequency: "monthly", priority: 0.8 },
    { path: "/services", changeFrequency: "weekly", priority: 0.9 },
    { path: "/projects", changeFrequency: "weekly", priority: 0.8 },
    { path: "/blogs", changeFrequency: "weekly", priority: 0.8 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
    { path: "/working-process", changeFrequency: "monthly", priority: 0.6 },
    { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/terms-and-conditions", changeFrequency: "yearly", priority: 0.3 },
];

export async function getPublicSitemapEntries(): Promise<SitemapEntry[]> {
    const blogSlugs = await getAllPublishedBlogSlugs();

    const services = getAllServiceSlugs().map((slug) => ({
        path: `/services/${slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));
    const projects = getAllProjectSlugs().map((slug) => ({
        path: `/projects/${slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));
    const blogs = blogSlugs.map((slug) => ({
        path: `/blogs/${slug}`,
        changeFrequency: "weekly" as const,
        priority: 0.6,
    }));
    const categories = getAllCategorySlugs().map((slug) => ({
        path: `/categories/${slug}`,
        changeFrequency: "weekly" as const,
        priority: 0.7,
    }));
    const products = getAllProductSlugs().map((slug) => ({
        path: `/products/${slug}`,
        changeFrequency: "weekly" as const,
        priority: 0.5,
    }));

    return [
        ...STATIC_PAGES,
        ...services,
        ...projects,
        ...blogs,
        ...categories,
        ...products,
    ];
}
