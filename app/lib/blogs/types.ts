import { datePartsFromIso } from "@/app/lib/admin/dates";
import type { AdminBlog, BlogStatus } from "@/app/lib/admin/schema";
import { createDefaultBody } from "@/app/lib/admin/blogs-body";

export type BlogArticle = {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    alt: string;
    day: string;
    month: string;
    year: number;
    author: string;
    comments: number;
    category: string;
    tags: string[];
    status: BlogStatus;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
};

export type BlogRow = {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    featured_image: string;
    featured_image_alt: string;
    author: string;
    category: string;
    tags: string[] | null;
    status: BlogStatus;
    published_at: string | null;
    created_at: string;
    updated_at: string;
};

export function mapBlogRow(row: BlogRow): BlogArticle {
    const publishedAt = row.published_at || row.created_at;
    const parts = datePartsFromIso(publishedAt);

    return {
        id: row.id,
        slug: row.slug,
        title: row.title,
        excerpt: row.excerpt,
        content: row.content,
        image: row.featured_image,
        alt: row.featured_image_alt,
        day: parts.day,
        month: parts.month,
        year: parts.year,
        author: row.author,
        comments: 0,
        category: row.category,
        tags: row.tags ?? [],
        status: row.status,
        publishedAt,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}

export function toAdminBlog(article: BlogArticle): AdminBlog {
    return {
        id: article.id,
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        image: article.image,
        alt: article.alt,
        day: article.day,
        month: article.month,
        author: article.author,
        comments: article.comments,
        category: article.category,
        tags: [...article.tags],
        status: article.status,
        year: article.year,
        publishedAt: article.publishedAt,
        content: article.content,
        body: createDefaultBody(),
        commentsList: [],
        createdAt: article.createdAt,
        updatedAt: article.updatedAt,
    };
}

export function adminBlogToRow(blog: AdminBlog) {
    return {
        slug: blog.slug.trim(),
        title: blog.title.trim(),
        excerpt: blog.excerpt.trim(),
        content: blog.content,
        featured_image: blog.image,
        featured_image_alt: blog.alt.trim(),
        author: blog.author.trim() || "mahrajplant",
        category: blog.category,
        tags: blog.tags,
        status: blog.status,
        published_at: blog.publishedAt || null,
    };
}
