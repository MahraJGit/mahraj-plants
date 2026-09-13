"use client";

import { BLOG_CATEGORIES } from "@/app/lib/admin/schema";
import { controlClass } from "@/app/components/admin/ui/AdminField";

type BlogsToolbarProps = {
    query: string;
    category: string;
    onQueryChange: (value: string) => void;
    onCategoryChange: (value: string) => void;
};

export default function BlogsToolbar({
    query,
    category,
    onQueryChange,
    onCategoryChange,
}: BlogsToolbarProps) {
    return (
        <div className="flex flex-col gap-3 sm:flex-row">
            <input
                type="search"
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                placeholder="Search title, slug, author, or tag"
                aria-label="Search blogs"
                className={`${controlClass} sm:max-w-sm`}
            />
            <select
                value={category}
                onChange={(event) => onCategoryChange(event.target.value)}
                aria-label="Filter by category"
                className={`${controlClass} sm:max-w-xs`}
            >
                <option value="">All categories</option>
                {BLOG_CATEGORIES.map((item) => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
            </select>
        </div>
    );
}
