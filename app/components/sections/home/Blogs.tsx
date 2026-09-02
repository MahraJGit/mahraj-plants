"use client";

import Image from "next/image";
import { useRef } from "react";
import { BlogCard, type BlogPost } from "@/app/components/ui";
import { cn } from "@/app/lib/utils";

const blogs: BlogPost[] = [
    {
        title: "Behind The Green: Meet Our Talented Team",
        excerpt:
            "Get to know the passionate, skilled people behind Mahraj Plants' green transformations. From designers to gardeners, our team is dedicated to turning outdoor dreams into lush reality.",
        image: "/images/home/hero-bg-2.jpg",
        alt: "Mahraj Plants team working together in a garden nursery",
        day: "23",
        month: "AUG",
        author: "mahrajplant",
        comments: 0,
    },
    {
        title: "Balcony Makeovers Decoded: From Tiny Urban Space To Pocket-Sized Paradise",
        excerpt:
            "Small balconies can feel like full gardens with the right layout, planters, and plant choices. Here is how we turn compact urban spaces into calming green retreats.",
        image: "/images/home/m-outdoor.webp",
        alt: "Balcony garden overlooking a city skyline at sunset",
        day: "23",
        month: "AUG",
        author: "mahrajplant",
        comments: 0,
    },
    {
        title: "Garden Privacy: Shielding Your Space While Staying Truly Connected",
        excerpt:
            "Privacy planting does not mean closing off your garden. Learn how hedges, trellises, and layered greenery create seclusion without losing light or openness.",
        image: "/images/home/m-landscaping.webp",
        alt: "Private garden with lush lawn and wooden seating",
        day: "23",
        month: "AUG",
        author: "mahrajplant",
        comments: 0,
    },
    {
        title: "Seasonal Plant Care: Keeping Your Garden Thriving All Year",
        excerpt:
            "From spring planting to winter protection, a seasonal rhythm keeps gardens healthy. Our practical checklist covers watering, pruning, and soil care month by month.",
        image: "/images/home/hero-bg-3.jpg",
        alt: "Gardener tending plants in a landscaped outdoor space",
        day: "18",
        month: "JUL",
        author: "mahrajplant",
        comments: 2,
    },
    {
        title: "Sustainable Garden Design Ideas For Modern Homes",
        excerpt:
            "Eco-friendly gardens combine native species, smart irrigation, and low-maintenance layouts. Discover design choices that look beautiful and respect the environment.",
        image: "/images/home/m-trees.webp",
        alt: "Sustainable garden with native trees and natural planting",
        day: "05",
        month: "JUL",
        author: "mahrajplant",
        comments: 1,
    },
];

const CARD_GAP = 24;
const CARD_HEIGHT = 380;

export default function Blogs() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const dragMoved = useRef(false);
    const pointerStartX = useRef(0);
    const scrollStartLeft = useRef(0);

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
                            Our Blogs
                        </span>
                    </p>

                    <h2
                        id="blogs-heading"
                        className="mt-4 text-[28px] leading-[1.15] font-bold tracking-[-2%] text-primary sm:text-4xl lg:text-[42px]"
                    >
                        Insights, Stories &amp; Updates From Our Green World
                    </h2>

                    <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-primary/65 sm:text-base">
                        Explore expert insights, practical ideas, and fresh
                        inspiration for better gardening and sustainable living.
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
                        aria-label="Blog posts"
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
