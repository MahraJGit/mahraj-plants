"use client";

import { useState } from "react";
import type { BlogArticle } from "@/app/lib/blogs/types";
import { blogCategories, blogTags } from "@/app/lib/blogs/constants";
import { expandHtmlSnippets } from "@/app/lib/blogs/html-snippet";
import { buildBlogToc } from "@/app/lib/blogs/toc";
import {
    getBlogsMessages,
    localizeBlog,
    useLocale,
} from "@/app/lib/i18n";
import BlogDetailArticle from "./BlogDetailArticle";
import BlogSidebar from "./BlogSidebar";
import BlogTableOfContents from "./BlogTableOfContents";

type BlogDetailBodyProps = {
    article: BlogArticle;
    latestPosts: BlogArticle[];
};

export default function BlogDetailBody({
    article,
    latestPosts,
}: BlogDetailBodyProps) {
    const { locale } = useLocale();
    const messages = getBlogsMessages(locale);
    const localized = localizeBlog(article, locale);
    const [searchQuery, setSearchQuery] = useState("");
    const { html: contentHtml, items: tocItems } = buildBlogToc(
        expandHtmlSnippets(localized.content),
    );

    const tocProps = {
        title: messages.detail.tocTitle,
        sectionsLabel: messages.detail.tocSections,
        showLabel: messages.detail.tocShow,
        hideLabel: messages.detail.tocHide,
        items: tocItems,
    };

    return (
        <section aria-label={messages.detail.ariaLabel} className="bg-cream/40">
            <div className="section-container">
                <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px] xl:gap-12">
                    <div>
                        <BlogDetailArticle
                            article={article}
                            contentHtml={contentHtml}
                            toc={
                                <BlogTableOfContents
                                    {...tocProps}
                                    variant="inline"
                                    className="mt-8 lg:hidden"
                                />
                            }
                        />
                    </div>

                    <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
                        <BlogTableOfContents
                            {...tocProps}
                            variant="sidebar"
                            className="hidden lg:block"
                        />
                        <BlogSidebar
                            variant="links"
                            sticky={false}
                            categories={blogCategories}
                            tags={blogTags}
                            latestPosts={latestPosts}
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                            activeCategory={null}
                            onCategoryChange={() => undefined}
                            activeTag={null}
                            onTagChange={() => undefined}
                        />
                    </aside>
                </div>
            </div>
        </section>
    );
}
