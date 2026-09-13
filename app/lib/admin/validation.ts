import type { AdminBlog, LoginPayload } from "./schema";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateLogin(payload: LoginPayload): Record<string, string> {
    const errors: Record<string, string> = {};

    if (!payload.email.trim()) errors.email = "Email is required.";
    else if (!emailPattern.test(payload.email)) {
        errors.email = "Enter a valid email address.";
    }

    if (!payload.password) errors.password = "Password is required.";
    else if (payload.password.length < 8) {
        errors.password = "Password must be at least 8 characters.";
    }

    return errors;
}

export function validateBlog(blog: AdminBlog): Record<string, string> {
    const errors: Record<string, string> = {};

    if (!blog.title.trim()) errors.title = "Title is required.";
    if (!blog.slug.trim()) errors.slug = "Slug is required.";
    else if (!slugPattern.test(blog.slug)) {
        errors.slug = "Use lowercase letters, numbers, and hyphens only.";
    }

    if (!blog.excerpt.trim()) errors.excerpt = "Short description is required.";
    if (isBlankHtml(blog.content)) {
        errors.content = "Write the article in the editor.";
    }
    if (!blog.image.trim()) errors.image = "Add a featured image.";
    if (blog.image && !blog.alt.trim()) errors.alt = "Alt text is required.";
    if (!blog.author.trim()) errors.author = "Author is required.";
    if (!blog.category.trim()) errors.category = "Category is required.";
    if (blog.tags.length === 0) errors.tags = "Add at least one tag.";
    if (!blog.publishedAt || Number.isNaN(new Date(blog.publishedAt).getTime())) {
        errors.publishedAt = "Choose a publish date and time.";
    }

    return errors;
}

function isBlankHtml(html: string): boolean {
    return html
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;/g, " ")
        .trim() === "";
}

export function slugify(value: string): string {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}
