"use client";

import { useMemo, useState } from "react";
import type { AdminBlog } from "@/app/lib/admin/schema";
import BlogsTable from "./BlogsTable";
import BlogsToolbar from "./BlogsToolbar";

export default function BlogsPageClient({ blogs }: { blogs: AdminBlog[] }) {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("");

    const filtered = useMemo(() => {
        const needle = query.trim().toLowerCase();

        return blogs.filter((blog) => {
            const matchesCategory = !category || blog.category === category;
            if (!needle) return matchesCategory;

            const haystack = [
                blog.title,
                blog.slug,
                blog.author,
                blog.excerpt,
                blog.category,
                ...blog.tags,
            ]
                .join(" ")
                .toLowerCase();

            return matchesCategory && haystack.includes(needle);
        });
    }, [blogs, category, query]);

    return (
        <div className="mt-6 space-y-4">
            <BlogsToolbar
                query={query}
                category={category}
                onQueryChange={setQuery}
                onCategoryChange={setCategory}
            />
            <p className="text-xs font-medium text-primary/45">
                Showing {filtered.length} of {blogs.length} articles
            </p>
            <BlogsTable blogs={filtered} />
        </div>
    );
}
