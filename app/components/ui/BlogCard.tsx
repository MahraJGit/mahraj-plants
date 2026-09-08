"use client";

import Image from "next/image";
import Link from "next/link";
import type { RefObject } from "react";
import {
    formatBlogCommentsLabel,
    getBlogsMessages,
    useLocale,
} from "@/app/lib/i18n";
import { cn } from "@/app/lib/utils";

export type BlogPost = {
    title: string;
    excerpt: string;
    image: string;
    alt: string;
    day: string;
    month: string;
    author: string;
    comments: number;
};

type BlogCardProps = {
    post: BlogPost;
    dragMovedRef?: RefObject<boolean>;
    href?: string;
    className?: string;
};

export default function BlogCard({
    post,
    dragMovedRef,
    href = "#",
    className,
}: BlogCardProps) {
    const { locale } = useLocale();
    const messages = getBlogsMessages(locale);

    return (
        <article
            className={cn(
                "group relative h-full w-full shrink-0 overflow-hidden rounded-[1.75rem]",
                className,
            )}
        >
            <Image
                src={post.image}
                alt={post.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />

            <div
                aria-hidden
                className="absolute inset-0 bg-primary/0 transition-colors duration-500 group-hover:bg-primary/25 motion-reduce:transition-none"
            />

            <div
                className={cn(
                    "absolute top-5 left-5 z-10 flex min-w-[3.25rem] flex-col items-center rounded-xl bg-white px-3 py-2 text-center shadow-sm transition-all duration-500 ease-out motion-reduce:transition-none",
                    "group-hover:translate-y-1 group-hover:opacity-0",
                )}
            >
                <span className="text-xl leading-none font-bold text-primary">
                    {post.day}
                </span>
                <span className="mt-0.5 text-[10px] font-semibold tracking-wider text-primary/70 uppercase">
                    {post.month}
                </span>
            </div>

            <Link
                href={href}
                aria-label={messages.card.readAria.replace("{title}", post.title)}
                onClick={(event) => {
                    if (dragMovedRef?.current) event.preventDefault();
                }}
                className={cn(
                    "absolute top-5 right-5 z-20 flex size-10 items-center justify-center rounded-full bg-white text-primary opacity-0 shadow-md transition-all duration-500 ease-out motion-reduce:transition-none",
                    "pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 group-hover:scale-105",
                    "group-focus-within:pointer-events-auto group-focus-within:opacity-100",
                    "[@media(hover:none)]:pointer-events-auto [@media(hover:none)]:opacity-100",
                )}
            >
                <Image
                    src="/icons/arrow-up-right.svg"
                    alt=""
                    width={16}
                    height={16}
                    aria-hidden
                    style={{ width: "auto", height: "auto" }}
                    className="size-4"
                />
            </Link>

            <div
                className={cn(
                    "absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-primary via-primary/85 to-transparent px-6 pt-20 pb-6 transition-all duration-500 ease-out motion-reduce:transition-none",
                    "group-hover:from-primary group-hover:via-primary/95 group-hover:pt-28",
                    "[@media(hover:none)]:from-primary [@media(hover:none)]:via-primary/95 [@media(hover:none)]:pt-28",
                )}
            >
                <h3 className="text-lg leading-snug font-bold text-white sm:text-xl">
                    {post.title}
                </h3>

                <p
                    className={cn(
                        "mt-3 line-clamp-3 text-sm leading-relaxed text-white/85 transition-all duration-500 ease-out motion-reduce:transition-none",
                        "max-h-0 opacity-0 group-hover:mt-3 group-hover:max-h-24 group-hover:opacity-100",
                        "group-focus-within:mt-3 group-focus-within:max-h-24 group-focus-within:opacity-100",
                        "[@media(hover:none)]:mt-3 [@media(hover:none)]:max-h-24 [@media(hover:none)]:opacity-100",
                    )}
                >
                    {post.excerpt}
                </p>

                <div
                    className={cn(
                        "mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/90 transition-all duration-500 ease-out motion-reduce:transition-none sm:text-sm",
                        "max-h-0 overflow-hidden opacity-0 group-hover:mt-4 group-hover:max-h-10 group-hover:opacity-100",
                        "group-focus-within:mt-4 group-focus-within:max-h-10 group-focus-within:opacity-100",
                        "[@media(hover:none)]:mt-4 [@media(hover:none)]:max-h-10 [@media(hover:none)]:opacity-100",
                    )}
                >
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
                        {formatBlogCommentsLabel(post.comments, locale)}
                    </span>
                </div>
            </div>
        </article>
    );
}
