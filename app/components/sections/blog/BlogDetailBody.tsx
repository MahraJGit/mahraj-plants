"use client";

import { useState } from "react";
import type { BlogArticle } from "@/app/lib/blogs";
import {
    blogCategories,
    blogTags,
    getLatestBlogArticles,
} from "@/app/lib/blogs";
import BlogCommentForm from "./BlogCommentForm";
import BlogDetailArticle from "./BlogDetailArticle";
import BlogSidebar from "./BlogSidebar";

type BlogDetailBodyProps = {
    article: BlogArticle;
};

export default function BlogDetailBody({ article }: BlogDetailBodyProps) {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <section aria-label="Blog article" className="bg-cream/40">
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
