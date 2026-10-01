export type BlogTocItem = {
    id: string;
    text: string;
    level: 2 | 3;
};

const HEADING_PATTERN = /<(h[23])(\s[^>]*)?>([\s\S]*?)<\/\1>/gi;

function decodeEntities(value: string): string {
    return value
        .replace(/&nbsp;/gi, " ")
        .replace(/&amp;/gi, "&")
        .replace(/&lt;/gi, "<")
        .replace(/&gt;/gi, ">")
        .replace(/&quot;/gi, '"')
        .replace(/&#39;/gi, "'")
        .replace(/&#(\d+);/g, (_, code) =>
            String.fromCharCode(Number(code)),
        );
}

function stripTags(html: string): string {
    return decodeEntities(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

function slugifyHeading(text: string, fallback: string): string {
    const slug = text
        .normalize("NFKD")
        .toLowerCase()
        .trim()
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\p{L}\p{N}\s-]/gu, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

    return slug || fallback;
}

/**
 * Extract h2/h3 headings, assign stable ids, and inject those ids into the HTML.
 */
export function buildBlogToc(html: string): {
    html: string;
    items: BlogTocItem[];
} {
    const items: BlogTocItem[] = [];
    const usedIds = new Map<string, number>();

    const nextHtml = html.replace(
        HEADING_PATTERN,
        (match, tag: string, attrs = "", inner: string) => {
            const text = stripTags(inner);
            if (!text) return match;

            const level = Number(tag.slice(1)) as 2 | 3;
            const fallback = `section-${items.length + 1}`;
            let id = slugifyHeading(text, fallback);
            const seen = usedIds.get(id) ?? 0;
            usedIds.set(id, seen + 1);
            if (seen > 0) id = `${id}-${seen + 1}`;

            items.push({ id, text, level });

            const cleanedAttrs = String(attrs).replace(
                /\s*id\s*=\s*(["'])[\s\S]*?\1/i,
                "",
            );

            return `<${tag}${cleanedAttrs} id="${id}">${inner}</${tag}>`;
        },
    );

    return { html: nextHtml, items };
}
