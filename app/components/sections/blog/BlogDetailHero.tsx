"use client";

import Image from "next/image";
import {
    HiOutlineChatAlt2,
    HiOutlineClock,
    HiOutlineUser,
} from "react-icons/hi";
import type { BlogArticle } from "@/app/lib/blogs";
import {
    formatBlogCommentsLabel,
    formatLocalizedBlogDate,
    getBlogsMessages,
    localizeBlog,
    useLocale,
} from "@/app/lib/i18n";

type BlogDetailHeroProps = {
    article: BlogArticle;
};

export default function BlogDetailHero({ article }: BlogDetailHeroProps) {
    const { locale } = useLocale();
    const messages = getBlogsMessages(locale);
    const localized = localizeBlog(article, locale);
    const commentsLabel = formatBlogCommentsLabel(article.comments, locale);

    return (
        <section
            aria-labelledby="blog-detail-hero-heading"
            className="relative isolate flex min-h-[22rem] items-center overflow-hidden sm:min-h-[26rem] lg:min-h-[30rem]"
        >
            <Image
                src="/images/blogs/blog-detail-bg.webp"
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover"
                aria-hidden
            />
            <div aria-hidden className="absolute inset-0 bg-primary/55" />

            <div className="hero-content relative z-10 w-full py-12 sm:py-16 lg:py-20">
                <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
                    <Image
                        src="/icons/singleLeaf.svg"
                        alt=""
                        width={14}
                        height={21}
                        unoptimized
                        style={{ width: "auto", height: "auto" }}
                        className="mx-auto h-6 w-auto"
                        aria-hidden
                    />

                    <h1
                        id="blog-detail-hero-heading"
                        className="mt-5 text-[28px] font-bold leading-tight text-white sm:text-[36px] lg:text-[44px] lg:leading-[1.15]"
                    >
                        {localized.title}
                    </h1>

                    <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-white/90 sm:text-base lg:text-lg">
                        {localized.excerpt}
                    </p>

                    <div className="mx-auto mt-8 flex w-fit max-w-full flex-wrap items-center justify-center gap-x-5 gap-y-2 rounded-full bg-[#C4A862] px-5 py-3 text-sm font-medium text-primary sm:gap-x-7 sm:px-7 sm:py-3.5 sm:text-[15px]">
                        <span className="inline-flex items-center gap-2">
                            <HiOutlineClock
                                aria-hidden
                                className="size-4 shrink-0 sm:size-[1.125rem]"
                            />
                            {formatLocalizedBlogDate(article, locale)}
                        </span>
                        <span className="inline-flex items-center gap-2">
                            <HiOutlineUser
                                aria-hidden
                                className="size-4 shrink-0 sm:size-[1.125rem]"
                            />
                            {messages.card.by.replace("{author}", article.author)}
                        </span>
                        <span className="inline-flex items-center gap-2">
                            <HiOutlineChatAlt2
                                aria-hidden
                                className="size-4 shrink-0 sm:size-[1.125rem]"
                            />
                            {commentsLabel}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
