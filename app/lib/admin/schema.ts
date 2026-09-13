import { blogCategories, blogTags } from "@/app/lib/blogs/constants";

export const BLOG_STATUSES = ["draft", "published", "archived"] as const;
export type BlogStatus = (typeof BLOG_STATUSES)[number];

export const BLOG_MONTHS = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
] as const;
export type BlogMonth = (typeof BLOG_MONTHS)[number];

export const BLOG_CATEGORIES = blogCategories;
export const BLOG_TAGS = blogTags;

export type BlogSurface =
    | "listing-card"
    | "detail-hero"
    | "detail-article"
    | "sidebar"
    | "comment-form";

/** Card, listing, hero, and sidebar fields rendered on public blog pages. */
export type BlogCardFields = {
    slug: string;
    title: string;
    excerpt: string;
    image: string;
    alt: string;
    day: string;
    month: string;
    author: string;
    comments: number;
    category: string;
    tags: string[];
};

export type BlogGalleryItem = {
    src: string;
    alt: string;
};

/** Article body blocks rendered on `/blogs/[slug]`. */
export type BlogBodyFields = {
    introParagraph: string;
    sectionHeading: string;
    sectionBody: string;
    quote: string;
    quoteAuthor: string;
    includedHeading: string;
    includedItems: string[];
    whyHeading: string;
    whyItems: string[];
    planningHeading: string;
    planningParagraphs: string[];
    planningSteps: string[];
    planningImage: string;
    planningImageAlt: string;
    maintenanceHeading: string;
    maintenanceTips: string[];
    galleryHeading: string;
    gallery: BlogGalleryItem[];
};

/** Fields collected by the public comment form. */
export type BlogCommentFields = {
    name: string;
    email: string;
    message: string;
    saveInfo: boolean;
};

export type AdminBlogComment = BlogCommentFields & {
    id: string;
    createdAt: string;
};

/**
 * Admin aggregate aligned to the public blog contract,
 * plus publishing metadata ready for a future API.
 */
export type AdminBlog = BlogCardFields & {
    id: string;
    status: BlogStatus;
    year: number;
    publishedAt: string;
    content: string;
    body: BlogBodyFields;
    commentsList: AdminBlogComment[];
    createdAt: string;
    updatedAt: string;
};

export type AdminRole = "admin" | "editor";

export type AdminSession = {
    name: string;
    email: string;
    role: AdminRole;
};

export type LoginPayload = {
    email: string;
    password: string;
};

export const BLOG_FIELD_GROUPS = [
    { id: "identity", label: "Identity" },
    { id: "media", label: "Media" },
    { id: "publish", label: "Publishing" },
    { id: "taxonomy", label: "Taxonomy" },
    { id: "engagement", label: "Engagement" },
    { id: "body", label: "Article body" },
] as const;

export type BlogFieldGroupId = (typeof BLOG_FIELD_GROUPS)[number]["id"];
