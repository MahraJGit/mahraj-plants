const DROP_TAGS = new Set([
    "script",
    "style",
    "iframe",
    "object",
    "embed",
    "form",
    "link",
    "meta",
    "base",
]);

const ALLOWED_TAGS = new Set([
    "table",
    "thead",
    "tbody",
    "tfoot",
    "tr",
    "th",
    "td",
    "caption",
    "colgroup",
    "col",
    "div",
    "span",
    "p",
    "br",
    "hr",
    "ul",
    "ol",
    "li",
    "a",
    "img",
    "strong",
    "em",
    "b",
    "i",
    "u",
    "s",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "blockquote",
    "figure",
    "figcaption",
    "section",
    "pre",
    "code",
    "sup",
    "sub",
]);

const ALLOWED_ATTRS = new Set([
    "href",
    "src",
    "alt",
    "title",
    "colspan",
    "rowspan",
    "scope",
    "class",
    "style",
    "target",
    "rel",
    "width",
    "height",
    "align",
    "border",
    "cellpadding",
    "cellspacing",
]);

export function encodeHtmlSnippet(html: string) {
    const bytes = new TextEncoder().encode(html);
    let binary = "";
    for (const byte of bytes) binary += String.fromCharCode(byte);
    return btoa(binary);
}

export function decodeHtmlSnippet(value: string) {
    const binary = atob(value);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return new TextDecoder().decode(bytes);
}

export function sanitizeHtmlSnippet(source: string) {
    const trimmed = source.trim();
    if (!trimmed || typeof DOMParser === "undefined") return "";

    const doc = new DOMParser().parseFromString(trimmed, "text/html");
    const elements = [...doc.body.querySelectorAll("*")].reverse();

    for (const element of elements) {
        const tag = element.tagName.toLowerCase();

        if (DROP_TAGS.has(tag)) {
            element.remove();
            continue;
        }

        if (!ALLOWED_TAGS.has(tag)) {
            element.replaceWith(...element.childNodes);
            continue;
        }

        for (const attr of [...element.attributes]) {
            const name = attr.name.toLowerCase();
            const value = attr.value.trim();
            const unsafeUrl =
                (name === "href" || name === "src") &&
                (/^javascript:/i.test(value) ||
                    (/^data:/i.test(value) && !value.toLowerCase().startsWith("data:image/")));
            const unsafeStyle =
                name === "style" && /javascript:|expression\s*\(/i.test(value);

            if (name.startsWith("on") || !ALLOWED_ATTRS.has(name) || unsafeUrl || unsafeStyle) {
                element.removeAttribute(attr.name);
            }
        }

        if (tag === "a" && element.getAttribute("target") === "_blank") {
            element.setAttribute("rel", "noopener noreferrer");
        }
    }

    return doc.body.innerHTML.trim();
}

export function expandHtmlSnippets(html: string) {
    return html.replace(
        /<div\b[^>]*\bdata-html-snippet="([^"]*)"[^>]*>\s*<\/div>/gi,
        (_match, encoded: string) => {
            try {
                const snippet = decodeHtmlSnippet(encoded).trim();
                if (!snippet) return "";
                return `<div class="blog-custom-html">${snippet}</div>`;
            } catch {
                return "";
            }
        },
    );
}
