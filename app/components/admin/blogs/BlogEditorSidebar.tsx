"use client";

import type { AdminBlog, BlogStatus } from "@/app/lib/admin/schema";
import { BLOG_CATEGORIES, BLOG_STATUSES } from "@/app/lib/admin/schema";
import AdminButton from "@/app/components/admin/ui/AdminButton";
import { AdminInput, AdminSelect } from "@/app/components/admin/ui/AdminField";
import DateTimePicker from "./DateTimePicker";
import TagInput from "./TagInput";

type BlogEditorSidebarProps = {
    blog: AdminBlog;
    errors: Record<string, string>;
    mode: "create" | "edit";
    pending?: boolean;
    onChange: (patch: Partial<AdminBlog>) => void;
};

export default function BlogEditorSidebar({
    blog,
    errors,
    mode,
    pending = false,
    onChange,
}: BlogEditorSidebarProps) {
    return (
        <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
            <section className="rounded-[1.5rem] border border-primary/8 bg-white p-5">
                <h2 className="text-sm font-semibold text-primary">Publish</h2>
                <div className="mt-4 space-y-4">
                    <AdminSelect
                        id="blog-status"
                        label="Status"
                        value={blog.status}
                        options={BLOG_STATUSES.map((status) => ({
                            value: status,
                            label: status,
                        }))}
                        onChange={(event) =>
                            onChange({ status: event.target.value as BlogStatus })
                        }
                    />
                    <DateTimePicker
                        value={blog.publishedAt}
                        error={errors.publishedAt}
                        onChange={(publishedAt) => onChange({ publishedAt })}
                    />
                    <AdminInput
                        id="blog-slug"
                        label="Slug"
                        value={blog.slug}
                        error={errors.slug}
                        hint="/blogs/{slug}"
                        onChange={(event) => onChange({ slug: event.target.value })}
                    />
                    <AdminButton
                        type="submit"
                        className="w-full"
                        size="lg"
                        disabled={pending}
                    >
                        {pending
                            ? "Saving…"
                            : mode === "create"
                              ? "Publish post"
                              : "Update post"}
                    </AdminButton>
                    {mode === "edit" ? (
                        <AdminButton
                            href={`/blogs/${blog.slug}`}
                            variant="ghost"
                            className="w-full"
                        >
                            View public page
                        </AdminButton>
                    ) : null}
                </div>
            </section>

            <section className="rounded-[1.5rem] border border-primary/8 bg-white p-5">
                <h2 className="text-sm font-semibold text-primary">Organization</h2>
                <div className="mt-4 space-y-4">
                    <fieldset>
                        <legend className="mb-1.5 text-sm font-semibold text-primary">
                            Category
                        </legend>
                        <div className="overflow-hidden rounded-xl border border-primary/12 bg-white">
                            {BLOG_CATEGORIES.map((category) => {
                                const selected = blog.category === category;
                                return (
                                    <label
                                        key={category}
                                        className={`flex cursor-pointer items-center gap-2.5 border-b border-primary/8 px-3 py-2 text-sm last:border-b-0 ${
                                            selected
                                                ? "bg-secondary/10 font-medium text-primary"
                                                : "text-primary/75 hover:bg-cream/70"
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="blog-category"
                                            value={category}
                                            checked={selected}
                                            onChange={() =>
                                                onChange({ category })
                                            }
                                            className="size-3.5 shrink-0 accent-secondary"
                                        />
                                        <span>{category}</span>
                                    </label>
                                );
                            })}
                        </div>
                        {errors.category ? (
                            <p className="mt-1.5 text-xs text-red-600">
                                {errors.category}
                            </p>
                        ) : null}
                    </fieldset>
                    <TagInput
                        value={blog.tags}
                        error={errors.tags}
                        onChange={(tags) => onChange({ tags })}
                    />
                    <AdminInput
                        id="blog-author"
                        label="Author"
                        value={blog.author}
                        error={errors.author}
                        onChange={(event) =>
                            onChange({ author: event.target.value })
                        }
                    />
                </div>
            </section>
        </aside>
    );
}
