"use client";

import Image from "next/image";
import Link from "next/link";
import type { BlogArticle } from "@/app/lib/blogs";
import {
    formatBlogCommentsLabel,
    getBlogsMessages,
    useLocale,
} from "@/app/lib/i18n";

type BlogListCardProps = {
    post: BlogArticle;
};

export default function BlogListCard({ post }: BlogListCardProps) {
    const { locale } = useLocale();
    const messages = getBlogsMessages(locale);
    const commentsLabel = formatBlogCommentsLabel(post.comments, locale);

    return (
        <article className="group overflow-hidden rounded-[1.75rem] border border-primary/8 bg-white p-4 shadow-[0_8px_30px_rgba(10,37,14,0.06)] sm:p-5">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                <Image
                    src={post.image}
                    alt={post.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />

                <div className="absolute bottom-4 left-0 flex max-w-[calc(100%-5.5rem)] flex-wrap items-center gap-x-4 gap-y-1 rounded-r-full bg-secondary/95 py-2.5 pr-5 pl-4 text-xs text-white sm:gap-x-5 sm:text-sm">
                    <span className="inline-flex items-center gap-1.5">
                        <Image
                            src="/icons/user-white.svg"
                            alt=""
                            width={16}
                            height={16}
                            aria-hidden
                            style={{ width: "auto", height: "auto" }}
                            className="size-3.5 shrink-0"
                        />
                        {messages.card.by.replace("{author}", post.author)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <Image
                            src="/icons/comment-white.svg"
                            alt=""
                            width={16}
                            height={16}
                            aria-hidden
                            style={{ width: "auto", height: "auto" }}
                            className="size-3.5 shrink-0"
                        />
                        {commentsLabel}
                    </span>
                </div>

                <div className="absolute right-4 bottom-4 flex min-w-[3.25rem] flex-col items-center rounded-xl bg-white px-3 py-2 text-center shadow-sm">
                    <span className="text-xl leading-none font-bold text-primary">
                        {post.day}
                    </span>
                    <span className="mt-0.5 text-[10px] font-semibold tracking-wider text-primary uppercase">
                        {post.month}
                    </span>
                </div>
            </div>

            <div className="px-1 pt-5 sm:pt-6">
                <h2 className="text-xl leading-snug font-bold text-primary sm:text-[1.65rem]">
                    {post.title}
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-primary/60 sm:text-base">
                    {post.excerpt}
                </p>

                <div className="mt-5 flex justify-end border-t border-dotted border-primary/20 pt-5">
                    <Link
                        href={`/blogs/${post.slug}`}
                        aria-label={messages.card.readAria.replace(
                            "{title}",
                            post.title,
                        )}
                        className="inline-flex w-fit items-center gap-3 outline-none transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
                    >
                        <span className="text-sm font-bold text-primary sm:text-base">
                            {messages.card.readMore}
                        </span>
                        <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-white transition group-hover:scale-105">
                            <Image
                                src="/icons/chevron-right-white.svg"
                                alt=""
                                width={14}
                                height={14}
                                aria-hidden
                                style={{ width: "auto", height: "auto" }}
                                className="size-3.5"
                            />
                        </span>
                    </Link>
                </div>
            </div>
        </article>
    );
}
