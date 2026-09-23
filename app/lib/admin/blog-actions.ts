"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminBlogToRow } from "@/app/lib/blogs/types";
import { createClient } from "@/app/lib/supabase/server";
import type { AdminBlog, BlogStatus } from "@/app/lib/admin/schema";
import { validateBlog } from "@/app/lib/admin/validation";

export type BlogSaveResult = {
    ok: false;
    message: string;
    errors?: Record<string, string>;
};

export async function saveBlogAction(
    blog: AdminBlog,
    mode: "create" | "edit",
): Promise<BlogSaveResult | void> {
    const errors = validateBlog(blog);
    if (Object.keys(errors).length > 0) {
        return {
            ok: false,
            message: "Please correct the highlighted fields.",
            errors,
        };
    }

    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return { ok: false, message: "Sign in to manage blogs." };
    }

    const payload = adminBlogToRow(blog);

    if (mode === "create") {
        const { data, error } = await supabase
            .from("blogs")
            .insert({ ...payload, created_by: user.id })
            .select("slug")
            .single();

        if (error) {
            return {
                ok: false,
                message: mapBlogDbError(error.message),
            };
        }

        revalidateBlogPaths(data.slug);
        redirect(`/admin/blogs/${data.slug}`);
    }

    const { error } = await supabase
        .from("blogs")
        .update(payload)
        .eq("id", blog.id);

    if (error) {
        return { ok: false, message: mapBlogDbError(error.message) };
    }

    revalidateBlogPaths(payload.slug);
    if (blog.slug !== payload.slug) {
        revalidateBlogPaths(blog.slug);
    }

    redirect("/admin/blogs");
}

export async function deleteBlogAction(formData: FormData) {
    const id = String(formData.get("id") ?? "");
    const slug = String(formData.get("slug") ?? "");
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/admin");
    }

    await supabase.from("blogs").delete().eq("id", id);
    revalidateBlogPaths(slug);
    redirect("/admin/blogs");
}

export async function setBlogStatusAction(formData: FormData) {
    const id = String(formData.get("id") ?? "");
    const slug = String(formData.get("slug") ?? "");
    const status = formData.get("status");

    if (!id || !slug || !["draft", "published", "archived"].includes(String(status))) {
        redirect("/admin/blogs");
    }

    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/admin");
    }

    await supabase.from("blogs").update({ status: status as BlogStatus }).eq("id", id);
    revalidateBlogPaths(slug);
    redirect("/admin/blogs");
}

function revalidateBlogPaths(slug: string) {
    revalidatePath("/admin");
    revalidatePath("/admin/blogs");
    revalidatePath(`/admin/blogs/${slug}`);
    revalidatePath("/blogs");
    revalidatePath(`/blogs/${slug}`);
    revalidatePath("/");
}

function mapBlogDbError(message: string): string {
    const value = message.toLowerCase();
    if (value.includes("blogs_slug_key") || value.includes("duplicate")) {
        return "That slug is already in use. Choose another.";
    }
    if (value.includes("blogs_slug_format")) {
        return "Slug must use lowercase letters, numbers, and hyphens only.";
    }
    return "Unable to save the blog. Try again.";
}
