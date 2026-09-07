import type { Locale } from "./config";
import type { BlogArticle } from "@/app/lib/blogs";
import blogsEn from "@/messages/blogs.en.json";
import blogsAr from "@/messages/blogs.ar.json";

export type BlogsMessages = typeof blogsEn;

type BlogCopy = BlogsMessages["behind-the-green-meet-our-team"];

const catalogs: Record<Locale, BlogsMessages> = {
    en: blogsEn,
    ar: blogsAr as BlogsMessages,
};

const BLOG_SLUGS = [
    "behind-the-green-meet-our-team",
    "balcony-makeovers-decoded",
    "garden-privacy-shielding-your-space",
    "how-to-create-a-beautiful-balcony-garden",
    "seasonal-plant-care-all-year",
    "sustainable-garden-design-ideas",
    "indoor-plants-for-better-air-quality",
    "gift-ideas-for-plant-lovers",
    "low-maintenance-outdoor-gardens",
] as const;

export type BlogSlug = (typeof BLOG_SLUGS)[number];

function isBlogSlug(value: string): value is BlogSlug {
    return (BLOG_SLUGS as readonly string[]).includes(value);
}

export function getBlogsMessages(locale: Locale): BlogsMessages {
    return catalogs[locale] ?? catalogs.en;
}

export function getBlogCopy(
    slug: string,
    locale: Locale,
): BlogCopy | undefined {
    if (!isBlogSlug(slug)) return undefined;
    return getBlogsMessages(locale)[slug];
}

export function localizeBlog(
    article: BlogArticle,
    locale: Locale,
): BlogArticle {
    const copy = getBlogCopy(article.slug, locale);
    if (!copy) return article;

    const monthsShort = getBlogsMessages(locale).monthsShort;
    const monthKey = copy.month.toUpperCase() as keyof typeof monthsShort;

    return {
        ...article,
        title: copy.title,
        excerpt: copy.excerpt,
        alt: copy.alt,
        month: monthsShort[monthKey] ?? copy.month,
        category: localizeBlogCategory(article.category, locale),
        tags: article.tags.map((tag) => localizeBlogTag(tag, locale)),
    };
}

export function localizeBlogs(
    items: BlogArticle[],
    locale: Locale,
): BlogArticle[] {
    return items.map((article) => localizeBlog(article, locale));
}

export function localizeBlogCategory(
    category: string,
    locale: Locale,
): string {
    const labels = getBlogsMessages(locale).categories;
    return labels[category as keyof typeof labels] ?? category;
}

export function localizeBlogTag(tag: string, locale: Locale): string {
    const labels = getBlogsMessages(locale).tags;
    return labels[tag as keyof typeof labels] ?? tag;
}

export function formatLocalizedBlogDate(
    article: BlogArticle,
    locale: Locale,
    year = 2025,
): string {
    const messages = getBlogsMessages(locale);
    const sourceMonth = article.month.toUpperCase();
    // Prefer original English abbr from slug catalog when available
    const copy = getBlogCopy(article.slug, locale);
    const monthKey = (copy?.month ?? sourceMonth).toUpperCase();
    const month =
        messages.months[monthKey as keyof typeof messages.months] ??
        article.month;
    return `${month} ${Number(article.day)}, ${year}`;
}

export function formatBlogCommentsLabel(
    count: number,
    locale: Locale,
): string {
    const card = getBlogsMessages(locale).card;
    if (count === 0) return card.noComments;
    if (count === 1) return card.oneComment;
    return card.comments.replace("{count}", String(count));
}
