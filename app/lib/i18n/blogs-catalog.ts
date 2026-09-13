import type { Locale } from "./config";
import type { BlogArticle } from "@/app/lib/blogs/types";
import blogsEn from "@/messages/blogs.en.json";
import blogsAr from "@/messages/blogs.ar.json";

export type BlogsMessages = typeof blogsEn;

const catalogs: Record<Locale, BlogsMessages> = {
    en: blogsEn,
    ar: blogsAr as BlogsMessages,
};

export function getBlogsMessages(locale: Locale): BlogsMessages {
    return catalogs[locale] ?? catalogs.en;
}

export function localizeBlog(
    article: BlogArticle,
    locale: Locale,
): BlogArticle {
    const messages = getBlogsMessages(locale);
    const monthKey = article.month.toUpperCase() as keyof typeof messages.monthsShort;

    return {
        ...article,
        month: messages.monthsShort[monthKey] ?? article.month,
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
): string {
    const messages = getBlogsMessages(locale);
    const monthKey = article.month.toUpperCase();
    const month =
        messages.months[monthKey as keyof typeof messages.months] ??
        article.month;
    return `${month} ${Number(article.day)}, ${article.year}`;
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
