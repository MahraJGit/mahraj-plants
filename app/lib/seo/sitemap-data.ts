import { getAllCategorySlugs } from "@/app/lib/categories";

export type SitemapEntry = {
    path: string;
    lastModified: string;
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

/** Matches the public sitemap structure for mahrajlandscaping.com */
const CORE_PAGES: SitemapEntry[] = [
    {
        path: "/",
        lastModified: "2026-09-14",
        changeFrequency: "daily",
        priority: 1,
    },
    {
        path: "/about-us",
        lastModified: "2026-09-12",
        changeFrequency: "monthly",
        priority: 0.8,
    },
    {
        path: "/contact-us",
        lastModified: "2026-09-12",
        changeFrequency: "monthly",
        priority: 0.8,
    },
    {
        path: "/projects",
        lastModified: "2026-09-12",
        changeFrequency: "weekly",
        priority: 0.8,
    },
];

const SERVICE_PAGES: SitemapEntry[] = [
    {
        path: "/our-services",
        lastModified: "2026-09-12",
        changeFrequency: "weekly",
        priority: 0.9,
    },
];

const BLOG_PAGES: SitemapEntry[] = [
    {
        path: "/blogs",
        lastModified: "2026-09-12",
        changeFrequency: "daily",
        priority: 0.8,
    },
];

const LEGAL_PAGES: SitemapEntry[] = [
    {
        path: "/privacy-policy",
        lastModified: "2026-09-14",
        changeFrequency: "daily",
        priority: 0.3,
    },
    {
        path: "/terms-and-conditions",
        lastModified: "2026-09-14",
        changeFrequency: "daily",
        priority: 0.3,
    },
];

export async function getPublicSitemapEntries(): Promise<SitemapEntry[]> {
    const categories = getAllCategorySlugs().map((slug) => ({
        path: `/categories/${slug}`,
        lastModified: "2026-09-12",
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    return [
        ...CORE_PAGES,
        ...SERVICE_PAGES,
        ...categories,
        ...BLOG_PAGES,
        ...LEGAL_PAGES,
    ];
}
