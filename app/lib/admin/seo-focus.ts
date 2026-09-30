import type { AdminBlog } from "./schema";

export type FocusKeywordCheck = {
    id: string;
    label: string;
    passed: boolean;
};

function stripHtml(html: string): string {
    return html
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function includesKeyword(haystack: string, keyword: string): boolean {
    const needle = keyword.trim().toLowerCase();
    if (!needle) return false;
    return haystack.toLowerCase().includes(needle);
}

export function analyzeFocusKeyword(blog: AdminBlog): FocusKeywordCheck[] {
    const keyword = blog.focusKeyword.trim();
    const metaTitle = blog.metaTitle.trim() || blog.title;
    const metaDescription = blog.metaDescription.trim() || blog.excerpt;
    const contentText = stripHtml(blog.content);

    return [
        {
            id: "set",
            label: "Focus keyword is set",
            passed: keyword.length > 0,
        },
        {
            id: "title",
            label: "Keyword appears in the post title",
            passed: includesKeyword(blog.title, keyword),
        },
        {
            id: "meta-title",
            label: "Keyword appears in the meta title",
            passed: includesKeyword(metaTitle, keyword),
        },
        {
            id: "meta-description",
            label: "Keyword appears in the meta description",
            passed: includesKeyword(metaDescription, keyword),
        },
        {
            id: "slug",
            label: "Keyword appears in the slug",
            passed: includesKeyword(blog.slug.replace(/-/g, " "), keyword),
        },
        {
            id: "content",
            label: "Keyword appears in the article content",
            passed: includesKeyword(contentText, keyword),
        },
        {
            id: "alt",
            label: "Keyword appears in the featured image alt text",
            passed: includesKeyword(blog.alt, keyword),
        },
    ];
}

export function focusKeywordScore(checks: FocusKeywordCheck[]): {
    passed: number;
    total: number;
    tone: "good" | "ok" | "poor" | "empty";
} {
    const actionable = checks.filter((check) => check.id !== "set");
    const keywordSet = checks.find((check) => check.id === "set")?.passed;
    const passed = actionable.filter((check) => check.passed).length;
    const total = actionable.length;

    if (!keywordSet) {
        return { passed: 0, total, tone: "empty" };
    }

    const ratio = passed / total;
    if (ratio >= 0.8) return { passed, total, tone: "good" };
    if (ratio >= 0.5) return { passed, total, tone: "ok" };
    return { passed, total, tone: "poor" };
}
