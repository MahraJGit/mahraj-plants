"use client";

import { FormEvent, useState, useTransition } from "react";
import type { AdminBlog } from "@/app/lib/admin/schema";
import { saveBlogAction } from "@/app/lib/admin/blog-actions";
import { datePartsFromIso } from "@/app/lib/admin/dates";
import { slugify, validateBlog } from "@/app/lib/admin/validation";
import AdminNotice from "@/app/components/admin/ui/AdminNotice";
import { AdminTextarea } from "@/app/components/admin/ui/AdminField";
import BlogEditorSidebar from "./BlogEditorSidebar";
import FeaturedImageField from "./FeaturedImageField";
import RichTextEditor from "./RichTextEditor";

type BlogEditorFormProps = {
    initialBlog: AdminBlog;
    mode: "create" | "edit";
};

export default function BlogEditorForm({
    initialBlog,
    mode,
}: BlogEditorFormProps) {
    const [blog, setBlog] = useState(initialBlog);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formError, setFormError] = useState("");
    const [pending, startTransition] = useTransition();

    function patch(next: Partial<AdminBlog>) {
        setFormError("");
        setBlog((current) => {
            const merged = { ...current, ...next };

            if (mode === "create" && next.title && !current.slug) {
                merged.slug = slugify(next.title);
            }

            if (next.publishedAt) {
                Object.assign(merged, datePartsFromIso(next.publishedAt));
            }

            return merged;
        });
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const nextErrors = validateBlog(blog);
        setErrors(nextErrors);
        setFormError("");
        if (Object.keys(nextErrors).length > 0) return;

        startTransition(async () => {
            const result = await saveBlogAction(blog, mode);
            if (result && !result.ok) {
                setFormError(result.message);
                if (result.errors) setErrors(result.errors);
            }
        });
    }

    return (
        <form
            onSubmit={handleSubmit}
            noValidate
            className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] xl:grid-cols-[minmax(0,1fr)_22rem]"
        >
            <div className="flex min-h-[calc(100vh-11rem)] flex-col gap-5">
                {formError ? (
                    <AdminNotice tone="error">{formError}</AdminNotice>
                ) : null}

                <section className="rounded-[1.5rem] border border-primary/8 bg-white">
                    <div className="space-y-5 px-5 py-5 sm:px-6 sm:py-6">
                        <div>
                            <label htmlFor="blog-title" className="sr-only">
                                Title
                            </label>
                            <input
                                id="blog-title"
                                value={blog.title}
                                placeholder="Post title"
                                onChange={(event) =>
                                    patch({ title: event.target.value })
                                }
                                className="w-full border-0 bg-transparent text-[26px] font-bold tracking-[-2%] text-primary outline-none placeholder:text-primary/25 sm:text-[32px]"
                            />
                            {errors.title ? (
                                <p className="mt-2 text-xs text-red-600">
                                    {errors.title}
                                </p>
                            ) : null}
                        </div>

                        <AdminTextarea
                            id="blog-excerpt"
                            label="Short description"
                            rows={3}
                            value={blog.excerpt}
                            error={errors.excerpt}
                            placeholder="A brief summary shown on cards and previews"
                            onChange={(event) =>
                                patch({ excerpt: event.target.value })
                            }
                        />
                    </div>
                </section>

                <div className="flex min-h-0 flex-1 flex-col">
                    <RichTextEditor
                        value={blog.content}
                        error={errors.content}
                        fill
                        onChange={(content) => patch({ content })}
                    />
                </div>

                <FeaturedImageField
                    src={blog.image}
                    alt={blog.alt}
                    error={errors.image}
                    altError={errors.alt}
                    onChange={patch}
                />
            </div>

            <BlogEditorSidebar
                blog={blog}
                errors={errors}
                mode={mode}
                pending={pending}
                onChange={patch}
            />
        </form>
    );
}
