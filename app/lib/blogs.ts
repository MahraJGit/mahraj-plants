export type { BlogArticle, BlogRow } from "@/app/lib/blogs/types";
export { mapBlogRow, toAdminBlog, adminBlogToRow } from "@/app/lib/blogs/types";
export { blogCategories, blogTags } from "@/app/lib/blogs/constants";

export {
    getAllPublishedBlogSlugs,
    getBlogBySlugAnyStatus,
    getBlogStats,
    getLatestPublishedBlogs,
    getPublishedBlogBySlug,
    listAllBlogs,
    listPublishedBlogs,
} from "@/app/lib/blogs/queries";

import {
    getLatestPublishedBlogs,
    getPublishedBlogBySlug,
    getAllPublishedBlogSlugs,
} from "@/app/lib/blogs/queries";
import type { BlogArticle } from "@/app/lib/blogs/types";

export async function getLatestBlogArticles(limit = 3): Promise<BlogArticle[]> {
    return getLatestPublishedBlogs(limit);
}

export async function getBlogBySlug(
    slug: string,
): Promise<BlogArticle | undefined> {
    const blog = await getPublishedBlogBySlug(slug);
    return blog ?? undefined;
}

export async function getAllBlogSlugs(): Promise<string[]> {
    return getAllPublishedBlogSlugs();
}

export function formatBlogDate(article: BlogArticle, year?: number): string {
    const monthLabels: Record<string, string> = {
        JAN: "January",
        FEB: "February",
        MAR: "March",
        APR: "April",
        MAY: "May",
        JUN: "June",
        JUL: "July",
        AUG: "August",
        SEP: "September",
        OCT: "October",
        NOV: "November",
        DEC: "December",
    };
    const month = monthLabels[article.month.toUpperCase()] ?? article.month;
    return `${month} ${Number(article.day)}, ${year ?? article.year}`;
}
