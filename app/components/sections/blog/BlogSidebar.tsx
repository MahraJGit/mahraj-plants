"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo } from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import type { BlogArticle } from "@/app/lib/blogs";
import {
    formatBlogCommentsLabel,
    getBlogsMessages,
    localizeBlogCategory,
    localizeBlogTag,
    localizeBlogs,
    useLocale,
} from "@/app/lib/i18n";
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
    /** `filter` = interactive filters on listing. `links` = navigate to /blogs (detail pages). */
    variant?: "filter" | "links";
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
        <section
            className={cn(
                "overflow-hidden rounded-2xl bg-white shadow-[0_12px_40px_rgba(10,37,14,0.08)]",
                className,
            )}
        >
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
    variant = "filter",
}: BlogSidebarProps) {
    const router = useRouter();
    const { locale } = useLocale();
    const messages = getBlogsMessages(locale);
    const isLinks = variant === "links";
    const localizedLatest = useMemo(
        () => localizeBlogs(latestPosts, locale),
        [latestPosts, locale],
    );

    function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (isLinks) {
            router.push("/blogs");
        }
    }

    return (
        <aside
            aria-label={messages.sidebar.ariaLabel}
            className="space-y-6 lg:sticky lg:top-28 lg:self-start"
        >
            <SidebarWidget title={messages.sidebar.search}>
                <form onSubmit={handleSearchSubmit}>
                    <label className="relative block">
                        <span className="sr-only">{messages.sidebar.searchSr}</span>
                        <input
                            type="search"
                            value={searchQuery}
                            onChange={(event) =>
                                onSearchChange(event.target.value)
                            }
                            placeholder={messages.sidebar.searchPlaceholder}
                            className="w-full rounded-xl border border-primary/12 bg-cream/30 py-3 pr-11 pl-4 text-sm text-primary outline-none transition placeholder:text-primary/40 focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                        />
                        <HiOutlineMagnifyingGlass
                            aria-hidden
                            className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-primary/45"
                        />
                    </label>
                </form>
            </SidebarWidget>

            <SidebarWidget title={messages.sidebar.categories}>
                <ul className="divide-y divide-primary/8">
                    {categories.map((category) => {
                        const active = activeCategory === category;
                        const label = localizeBlogCategory(category, locale);

                        if (isLinks) {
                            return (
                                <li key={category}>
                                    <Link
                                        href="/blogs"
                                        className="flex w-full items-center justify-between py-3 text-left text-sm text-primary/75 transition hover:text-secondary"
                                    >
                                        {label}
                                        <span aria-hidden className="text-secondary">
                                            ›
                                        </span>
                                    </Link>
                                </li>
                            );
                        }

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
                                    {label}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </SidebarWidget>

            <SidebarWidget title={messages.sidebar.latestPost}>
                <ul className="space-y-4">
                    {localizedLatest.map((post) => (
                        <li key={post.slug}>
                            <Link
                                href={`/blogs/${post.slug}`}
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
                                        {post.day} {post.month} ·{" "}
                                        {formatBlogCommentsLabel(
                                            post.comments,
                                            locale,
                                        )}
                                    </p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </SidebarWidget>

            <SidebarWidget title={messages.sidebar.tags}>
                <ul className="flex flex-wrap gap-2">
                    {tags.map((tag) => {
                        const active = activeTag === tag;
                        const label = localizeBlogTag(tag, locale);

                        if (isLinks) {
                            return (
                                <li key={tag}>
                                    <Link
                                        href="/blogs"
                                        className="inline-block rounded-full bg-cream px-3.5 py-1.5 text-xs font-medium text-primary/75 transition hover:bg-secondary/15 hover:text-secondary"
                                    >
                                        {label}
                                    </Link>
                                </li>
                            );
                        }

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
                                    {label}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </SidebarWidget>
        </aside>
    );
}
