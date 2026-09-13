import type { BlogFieldGroupId, BlogSurface } from "./schema";

export type AdminFieldInput =
    | "text"
    | "textarea"
    | "image"
    | "select"
    | "multiselect"
    | "number"
    | "list"
    | "gallery";

export type AdminFieldDef = {
    key: string;
    label: string;
    group: BlogFieldGroupId;
    surfaces: BlogSurface[];
    input: AdminFieldInput;
    required?: boolean;
};

/**
 * Canonical map of every blog field the public site renders.
 * Admin forms and tables should stay aligned with this contract.
 */
export const BLOG_FIELD_DEFS: AdminFieldDef[] = [
    {
        key: "slug",
        label: "Slug",
        group: "identity",
        surfaces: ["listing-card", "detail-hero"],
        input: "text",
        required: true,
    },
    {
        key: "title",
        label: "Title",
        group: "identity",
        surfaces: ["listing-card", "detail-hero"],
        input: "text",
        required: true,
    },
    {
        key: "excerpt",
        label: "Excerpt",
        group: "identity",
        surfaces: ["listing-card", "detail-hero", "detail-article"],
        input: "textarea",
        required: true,
    },
    {
        key: "image",
        label: "Cover image",
        group: "media",
        surfaces: ["listing-card", "detail-article"],
        input: "image",
        required: true,
    },
    {
        key: "alt",
        label: "Image alt text",
        group: "media",
        surfaces: ["listing-card", "detail-article"],
        input: "text",
        required: true,
    },
    {
        key: "day",
        label: "Day",
        group: "publish",
        surfaces: ["listing-card", "detail-hero"],
        input: "text",
        required: true,
    },
    {
        key: "month",
        label: "Month",
        group: "publish",
        surfaces: ["listing-card", "detail-hero"],
        input: "select",
        required: true,
    },
    {
        key: "year",
        label: "Year",
        group: "publish",
        surfaces: ["detail-hero"],
        input: "number",
        required: true,
    },
    {
        key: "author",
        label: "Author",
        group: "publish",
        surfaces: ["listing-card", "detail-hero"],
        input: "text",
        required: true,
    },
    {
        key: "status",
        label: "Status",
        group: "publish",
        surfaces: ["listing-card"],
        input: "select",
    },
    {
        key: "category",
        label: "Category",
        group: "taxonomy",
        surfaces: ["sidebar"],
        input: "select",
        required: true,
    },
    {
        key: "tags",
        label: "Tags",
        group: "taxonomy",
        surfaces: ["detail-article", "sidebar"],
        input: "multiselect",
        required: true,
    },
    {
        key: "comments",
        label: "Comments count",
        group: "engagement",
        surfaces: ["listing-card", "detail-hero", "sidebar"],
        input: "number",
    },
    {
        key: "body.introParagraph",
        label: "Intro paragraph",
        group: "body",
        surfaces: ["detail-article"],
        input: "textarea",
    },
    {
        key: "body.sectionHeading",
        label: "Section heading",
        group: "body",
        surfaces: ["detail-article"],
        input: "text",
    },
    {
        key: "body.sectionBody",
        label: "Section body",
        group: "body",
        surfaces: ["detail-article"],
        input: "textarea",
    },
    {
        key: "body.quote",
        label: "Quote",
        group: "body",
        surfaces: ["detail-article"],
        input: "textarea",
    },
    {
        key: "body.quoteAuthor",
        label: "Quote author",
        group: "body",
        surfaces: ["detail-article"],
        input: "text",
    },
    {
        key: "body.includedHeading",
        label: "Included heading",
        group: "body",
        surfaces: ["detail-article"],
        input: "text",
    },
    {
        key: "body.includedItems",
        label: "Included items",
        group: "body",
        surfaces: ["detail-article"],
        input: "list",
    },
    {
        key: "body.whyHeading",
        label: "Why heading",
        group: "body",
        surfaces: ["detail-article"],
        input: "text",
    },
    {
        key: "body.whyItems",
        label: "Why items",
        group: "body",
        surfaces: ["detail-article"],
        input: "list",
    },
    {
        key: "body.planningHeading",
        label: "Planning heading",
        group: "body",
        surfaces: ["detail-article"],
        input: "text",
    },
    {
        key: "body.planningParagraphs",
        label: "Planning paragraphs",
        group: "body",
        surfaces: ["detail-article"],
        input: "list",
    },
    {
        key: "body.planningSteps",
        label: "Planning steps",
        group: "body",
        surfaces: ["detail-article"],
        input: "list",
    },
    {
        key: "body.planningImage",
        label: "Planning image",
        group: "body",
        surfaces: ["detail-article"],
        input: "image",
    },
    {
        key: "body.planningImageAlt",
        label: "Planning image alt",
        group: "body",
        surfaces: ["detail-article"],
        input: "text",
    },
    {
        key: "body.maintenanceHeading",
        label: "Maintenance heading",
        group: "body",
        surfaces: ["detail-article"],
        input: "text",
    },
    {
        key: "body.maintenanceTips",
        label: "Maintenance tips",
        group: "body",
        surfaces: ["detail-article"],
        input: "list",
    },
    {
        key: "body.galleryHeading",
        label: "Gallery heading",
        group: "body",
        surfaces: ["detail-article"],
        input: "text",
    },
    {
        key: "body.gallery",
        label: "Gallery",
        group: "body",
        surfaces: ["detail-article"],
        input: "gallery",
    },
];

export const COMMENT_FIELD_DEFS: AdminFieldDef[] = [
    {
        key: "name",
        label: "Name",
        group: "engagement",
        surfaces: ["comment-form"],
        input: "text",
        required: true,
    },
    {
        key: "email",
        label: "Email",
        group: "engagement",
        surfaces: ["comment-form"],
        input: "text",
        required: true,
    },
    {
        key: "message",
        label: "Message",
        group: "engagement",
        surfaces: ["comment-form"],
        input: "textarea",
        required: true,
    },
];
