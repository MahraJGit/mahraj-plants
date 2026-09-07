"use client";

import { useState } from "react";
import type { BlogArticle } from "@/app/lib/blogs";
import {
    blogCategories,
    blogTags,
    getLatestBlogArticles,
} from "@/app/lib/blogs";
import { getBlogsMessages, useLocale } from "@/app/lib/i18n";
import BlogCommentForm from "./BlogCommentForm";
import BlogDetailArticle from "./BlogDetailArticle";
import BlogSidebar from "./BlogSidebar";

type BlogDetailBodyProps = {
    article: BlogArticle;
};

export default function BlogDetailBody({ article }: BlogDetailBodyProps) {
    const { locale } = useLocale();
    const messages = getBlogsMessages(locale);
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <section aria-label={messages.detail.ariaLabel} className="bg-cream/40">
            <div className="section-container">
                <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px] xl:gap-12">
                    <div>
                        <BlogDetailArticle article={article} />
                        <BlogCommentForm />
                    </div>

                    <BlogSidebar
                        variant="links"
                        categories={blogCategories}
                        tags={blogTags}
                        latestPosts={getLatestBlogArticles(3)}
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        activeCategory={null}
                        onCategoryChange={() => undefined}
                        activeTag={null}
                        onTagChange={() => undefined}
                    />
                </div>
            </div>
        </section>
    );
}
