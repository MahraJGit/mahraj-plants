"use client";

import Image from "next/image";
import Link from "next/link";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import type { BlogArticle } from "@/app/lib/blogs";
import { cn } from "@/app/lib/utils";

type BlogSidebarProps = {
    categories: readonly string[];
    tags: readonly string[];
    latestPosts: BlogArticle[];
    searchQuery: string;
    onSearchChange: (value: string) => void;
    activeCategory: string | null;
    onCategoryChange: (category: string | null) => void;
    activeTag: string | null;
    onTagChange: (tag: string | null) => void;
};

function SidebarWidget({
    title,
    children,
    className,
}: {
    title: string;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <section className={cn("overflow-hidden rounded-2xl bg-white shadow-[0_12px_40px_rgba(10,37,14,0.08)]", className)}>
            <div className="bg-section px-5 py-3.5">
                <h2 className="text-sm font-bold tracking-wide text-white uppercase sm:text-base">
                    {title}
                </h2>
            </div>
            <div className="p-5">{children}</div>
        </section>
    );
}

export default function BlogSidebar({
    categories,
    tags,
    latestPosts,
    searchQuery,
    onSearchChange,
    activeCategory,
    onCategoryChange,
    activeTag,
    onTagChange,
}: BlogSidebarProps) {
    return (
        <aside aria-label="Blog sidebar" className="space-y-6">
            <SidebarWidget title="Search">
                <label className="relative block">
                    <span className="sr-only">Search blog posts</span>
                    <input
                        type="search"
                        value={searchQuery}
                        onChange={(event) =>
                            onSearchChange(event.target.value)
                        }
                        placeholder="Search articles..."
                        className="w-full rounded-xl border border-primary/12 bg-cream/30 py-3 pr-11 pl-4 text-sm text-primary outline-none transition placeholder:text-primary/40 focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                    />
                    <HiOutlineMagnifyingGlass
                        aria-hidden
                        className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-primary/45"
                    />
                </label>
            </SidebarWidget>

            <SidebarWidget title="Categories">
                <ul className="divide-y divide-primary/8">
                    {categories.map((category) => {
                        const active = activeCategory === category;

                        return (
                            <li key={category}>
                                <button
                                    type="button"
                                    onClick={() =>
                                        onCategoryChange(
                                            active ? null : category,
                                        )
                                    }
                                    className={cn(
                                        "flex w-full cursor-pointer py-3 text-left text-sm transition hover:text-secondary",
                                        active
                                            ? "font-semibold text-secondary"
                                            : "text-primary/75",
                                    )}
                                >
                                    {category}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </SidebarWidget>

            <SidebarWidget title="Latest Post">
                <ul className="space-y-4">
                    {latestPosts.map((post) => (
                        <li key={post.slug}>
                            <Link
                                href="#"
                                className="group flex gap-3 outline-none"
                            >
                                <div className="relative size-16 shrink-0 overflow-hidden rounded-xl">
                                    <Image
                                        src={post.image}
                                        alt={post.alt}
                                        fill
                                        sizes="64px"
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <div className="min-w-0">
                                    <p className="line-clamp-2 text-sm leading-snug font-semibold text-primary transition group-hover:text-secondary">
                                        {post.title}
                                    </p>
                                    <p className="mt-1 text-xs text-primary/55">
                                        {post.day} {post.month} · {post.comments}{" "}
                                        Comments
                                    </p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </SidebarWidget>

            <SidebarWidget title="Tags">
                <ul className="flex flex-wrap gap-2">
                    {tags.map((tag) => {
                        const active = activeTag === tag;

                        return (
                            <li key={tag}>
                                <button
                                    type="button"
                                    onClick={() =>
                                        onTagChange(active ? null : tag)
                                    }
                                    className={cn(
                                        "cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-medium transition",
                                        active
                                            ? "bg-secondary text-white"
                                            : "bg-cream text-primary/75 hover:bg-secondary/15 hover:text-secondary",
                                    )}
                                >
                                    {tag}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </SidebarWidget>
        </aside>
    );
}
