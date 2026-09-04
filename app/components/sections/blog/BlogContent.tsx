"use client";

import { useEffect, useMemo, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import {
    blogArticles,
    blogCategories,
    blogTags,
    getLatestBlogArticles,
} from "@/app/lib/blogs";
import BlogListCard from "./BlogListCard";
import BlogSidebar from "./BlogSidebar";
import { cn } from "@/app/lib/utils";

const PAGE_SIZE = 3;

export default function BlogContent() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [activeTag, setActiveTag] = useState<string | null>(null);
    const [page, setPage] = useState(1);

    const filteredPosts = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        return blogArticles.filter((post) => {
            const matchesSearch =
                !query ||
                post.title.toLowerCase().includes(query) ||
                post.excerpt.toLowerCase().includes(query) ||
                post.author.toLowerCase().includes(query);

            const matchesCategory =
                !activeCategory || post.category === activeCategory;

            const matchesTag =
                !activeTag || post.tags.includes(activeTag);

            return matchesSearch && matchesCategory && matchesTag;
        });
    }, [activeCategory, activeTag, searchQuery]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredPosts.length / PAGE_SIZE),
    );

    useEffect(() => {
        setPage(1);
    }, [searchQuery, activeCategory, activeTag]);

    useEffect(() => {
        if (page > totalPages) {
            setPage(totalPages);
        }
    }, [page, totalPages]);

    const startIndex = (page - 1) * PAGE_SIZE;
    const visiblePosts = filteredPosts.slice(
        startIndex,
        startIndex + PAGE_SIZE,
    );

    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <section aria-label="Blog posts" className="bg-cream/40">
            <div className="section-container">
                <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px] xl:gap-12">
                    <div>
                        {visiblePosts.length > 0 ? (
                            <ul className="space-y-8">
                                {visiblePosts.map((post) => (
                                    <li key={post.slug}>
                                        <BlogListCard post={post} />
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="rounded-[1.75rem] bg-white px-8 py-16 text-center shadow-[0_12px_40px_rgba(10,37,14,0.08)]">
                                <p className="text-lg font-semibold text-primary">
                                    No articles found
                                </p>
                                <p className="mt-2 text-sm text-primary/60">
                                    Try adjusting your search or filters.
                                </p>
                            </div>
                        )}

                        {totalPages > 1 && (
                            <nav
                                aria-label="Blog pagination"
                                className="mt-10 flex flex-wrap items-center justify-center gap-2"
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        setPage((current) => current - 1)
                                    }
                                    disabled={page === 1}
                                    aria-label="Previous page"
                                    className="inline-flex size-10 cursor-pointer items-center justify-center rounded-lg border border-primary/15 bg-white text-primary transition hover:border-secondary hover:text-secondary disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <HiChevronLeft className="size-5" aria-hidden />
                                </button>

                                {pageNumbers.map((pageNumber) => (
                                    <button
                                        key={pageNumber}
                                        type="button"
                                        onClick={() => setPage(pageNumber)}
                                        aria-label={`Page ${pageNumber}`}
                                        aria-current={
                                            pageNumber === page
                                                ? "page"
                                                : undefined
                                        }
                                        className={cn(
                                            "inline-flex size-10 cursor-pointer items-center justify-center rounded-lg border text-sm font-semibold transition",
                                            pageNumber === page
                                                ? "border-secondary bg-secondary text-white"
                                                : "border-primary/15 bg-white text-primary hover:border-secondary hover:text-secondary",
                                        )}
                                    >
                                        {pageNumber}
                                    </button>
                                ))}

                                <button
                                    type="button"
                                    onClick={() =>
                                        setPage((current) => current + 1)
                                    }
                                    disabled={page === totalPages}
                                    aria-label="Next page"
                                    className="inline-flex size-10 cursor-pointer items-center justify-center rounded-lg border border-primary/15 bg-white text-primary transition hover:border-secondary hover:text-secondary disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <HiChevronRight className="size-5" aria-hidden />
                                </button>
                            </nav>
                        )}
                    </div>

                    <BlogSidebar
                        categories={blogCategories}
                        tags={blogTags}
                        latestPosts={getLatestBlogArticles(3)}
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        activeCategory={activeCategory}
                        onCategoryChange={setActiveCategory}
                        activeTag={activeTag}
                        onTagChange={setActiveTag}
                    />
                </div>
            </div>
        </section>
    );
}
