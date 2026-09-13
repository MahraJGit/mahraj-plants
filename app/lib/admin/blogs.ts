import { createDefaultBody } from "./blogs-body";
import type { AdminBlog } from "./schema";
import {
    getBlogBySlugAnyStatus,
    getBlogStats,
    listAllBlogs,
} from "@/app/lib/blogs/queries";
import { toAdminBlog } from "@/app/lib/blogs/types";

export { createDefaultBody } from "./blogs-body";

export async function getAdminBlogs(): Promise<AdminBlog[]> {
    const blogs = await listAllBlogs();
    return blogs.map(toAdminBlog);
}

export async function getAdminBlogBySlug(
    slug: string,
): Promise<AdminBlog | undefined> {
    const blog = await getBlogBySlugAnyStatus(slug);
    return blog ? toAdminBlog(blog) : undefined;
}

export function createEmptyAdminBlog(): AdminBlog {
    const now = new Date().toISOString();

    return {
        id: "",
        slug: "",
        title: "",
        excerpt: "",
        image: "",
        alt: "",
        day: String(new Date().getDate()).padStart(2, "0"),
        month: "SEP",
        author: "mahrajplant",
        comments: 0,
        category: "Garden Supplies",
        tags: [],
        status: "draft",
        year: new Date().getFullYear(),
        publishedAt: now,
        content: "",
        body: { ...createDefaultBody(), gallery: [] },
        commentsList: [],
        createdAt: now,
        updatedAt: now,
    };
}

export async function getAdminBlogStats() {
    return getBlogStats();
}
