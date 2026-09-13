import { createClient } from "@/app/lib/supabase/server";
import { createPublicClient } from "@/app/lib/supabase/public";
import {
    mapBlogRow,
    type BlogArticle,
    type BlogRow,
} from "@/app/lib/blogs/types";
import type { BlogStatus } from "@/app/lib/admin/schema";

const BLOG_COLUMNS =
    "id, slug, title, excerpt, content, featured_image, featured_image_alt, author, category, tags, status, published_at, created_at, updated_at";

export async function listPublishedBlogs(): Promise<BlogArticle[]> {
    const supabase = createPublicClient();
    const { data, error } = await supabase
        .from("blogs")
        .select(BLOG_COLUMNS)
        .eq("status", "published")
        .order("published_at", { ascending: false });

    if (error) throw new Error(error.message);
    return ((data ?? []) as BlogRow[]).map(mapBlogRow);
}

export async function listAllBlogs(): Promise<BlogArticle[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("blogs")
        .select(BLOG_COLUMNS)
        .order("updated_at", { ascending: false });

    if (error) throw new Error(error.message);
    return ((data ?? []) as BlogRow[]).map(mapBlogRow);
}

export async function getPublishedBlogBySlug(
    slug: string,
): Promise<BlogArticle | null> {
    const supabase = createPublicClient();
    const { data, error } = await supabase
        .from("blogs")
        .select(BLOG_COLUMNS)
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();

    if (error) throw new Error(error.message);
    return data ? mapBlogRow(data as BlogRow) : null;
}

export async function getBlogBySlugAnyStatus(
    slug: string,
): Promise<BlogArticle | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("blogs")
        .select(BLOG_COLUMNS)
        .eq("slug", slug)
        .maybeSingle();

    if (error) throw new Error(error.message);
    return data ? mapBlogRow(data as BlogRow) : null;
}

export async function getLatestPublishedBlogs(
    limit = 3,
): Promise<BlogArticle[]> {
    const blogs = await listPublishedBlogs();
    return blogs.slice(0, limit);
}

export async function getAllPublishedBlogSlugs(): Promise<string[]> {
    const supabase = createPublicClient();
    const { data, error } = await supabase
        .from("blogs")
        .select("slug")
        .eq("status", "published")
        .order("published_at", { ascending: false });

    if (error) throw new Error(error.message);
    return (data ?? []).map((row) => row.slug as string);
}

export async function getBlogStats() {
    const blogs = await listAllBlogs();
    return {
        total: blogs.length,
        published: blogs.filter((blog) => blog.status === "published").length,
        categories: new Set(blogs.map((blog) => blog.category)).size,
        byStatus: blogs.reduce(
            (acc, blog) => {
                acc[blog.status] = (acc[blog.status] ?? 0) + 1;
                return acc;
            },
            {} as Partial<Record<BlogStatus, number>>,
        ),
    };
}
