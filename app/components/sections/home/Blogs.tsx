"use client";

import Image from "next/image";
import { useMemo, useRef } from "react";
import { BlogCard, type BlogPost } from "@/app/components/ui";
import { useTranslations } from "@/app/lib/i18n";
import { cn } from "@/app/lib/utils";

const blogMeta = [
    {
        image: "/images/home/hero-bg-2.jpg",
        day: "23",
        author: "mahrajplant",
        comments: 0,
    },
    {
        image: "/images/home/m-outdoor.webp",
        day: "23",
        author: "mahrajplant",
        comments: 0,
    },
    {
        image: "/images/home/m-landscaping.webp",
        day: "23",
        author: "mahrajplant",
        comments: 0,
    },
    {
        image: "/images/home/hero-bg-3.jpg",
        day: "18",
        author: "mahrajplant",
        comments: 2,
    },
    {
        image: "/images/home/m-trees.webp",
        day: "05",
        author: "mahrajplant",
        comments: 1,
    },
];

const CARD_GAP = 24;
const CARD_HEIGHT = 380;

type BlogCopy = {
    title: string;
    excerpt: string;
    alt: string;
    month: string;
};

export default function Blogs() {
    const { t, tObject, locale } = useTranslations("home.blogs");
    const scrollRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const dragMoved = useRef(false);
    const pointerStartX = useRef(0);
    const scrollStartLeft = useRef(0);

    const blogs = useMemo(() => {
        const items = tObject<BlogCopy[]>("items");
        if (!Array.isArray(items)) return [] as BlogPost[];

        return items.map((item, index) => ({
            title: item.title,
            excerpt: item.excerpt,
            image: blogMeta[index].image,
            alt: item.alt,
            day: blogMeta[index].day,
            month: item.month,
            author: blogMeta[index].author,
            comments: blogMeta[index].comments,
        }));
    }, [tObject, locale]);

    function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
        if ((event.target as HTMLElement).closest("a, button")) return;

        const container = scrollRef.current;
        if (!container) return;

        isDragging.current = true;
        dragMoved.current = false;
        pointerStartX.current = event.clientX;
        scrollStartLeft.current = container.scrollLeft;
        container.setPointerCapture(event.pointerId);
    }

    function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
        if (!isDragging.current || !scrollRef.current) return;

        const delta = event.clientX - pointerStartX.current;
        if (Math.abs(delta) > 4) dragMoved.current = true;

        scrollRef.current.scrollLeft = scrollStartLeft.current - delta;
    }

    function endDrag(event: React.PointerEvent<HTMLDivElement>) {
        if (!isDragging.current || !scrollRef.current) return;

        isDragging.current = false;
        if (scrollRef.current.hasPointerCapture(event.pointerId)) {
            scrollRef.current.releasePointerCapture(event.pointerId);
        }
    }

    return (
        <section
            id="blogs"
            aria-labelledby="blogs-heading"
            className="bg-cream/40"
        >
            <div className="section-container">
                <header className="mx-auto max-w-4xl text-center">
                    <p className="flex items-center justify-center gap-2">
                        <Image
                            src="/icons/singleLeaf.svg"
                            alt=""
                            width={14}
                            height={21}
                            aria-hidden
                            className="h-5 w-3.5 shrink-0"
                        />
                        <span className="font-script text-[28px] leading-none text-secondary sm:text-[32px]">
                            {t("eyebrow")}
                        </span>
                    </p>

                    <h2
                        id="blogs-heading"
                        className="mt-4 text-[28px] leading-[1.15] font-bold tracking-[-2%] text-primary sm:text-4xl lg:text-[42px]"
                    >
                        {t("title")}
                    </h2>

                    <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-primary/65 sm:text-base">
                        {t("description")}
                    </p>
                </header>

                <div className="mt-12 lg:mt-14">
                    <div
                        ref={scrollRef}
                        className={cn(
                            "flex overflow-x-auto pb-2",
                            "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
                            "cursor-grab active:cursor-grabbing",
                            "select-none motion-reduce:scroll-auto",
                        )}
                        style={{ gap: CARD_GAP }}
                        aria-label={t("ariaLabel")}
                        onPointerDown={handlePointerDown}
                        onPointerMove={handlePointerMove}
                        onPointerUp={endDrag}
                        onPointerLeave={endDrag}
                        onPointerCancel={endDrag}
                    >
                        {blogs.map((post) => (
                            <div
                                key={post.title}
                                className="w-[min(88vw,400px)] shrink-0 sm:w-[360px] lg:w-[400px]"
                                style={{ height: CARD_HEIGHT }}
                            >
                                <BlogCard post={post} dragMovedRef={dragMoved} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
