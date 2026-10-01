"use client";

import { useEffect, useId, useState } from "react";
import type { BlogTocItem } from "@/app/lib/blogs/toc";
import { cn } from "@/app/lib/utils";

type BlogTableOfContentsProps = {
    title: string;
    sectionsLabel: string;
    showLabel: string;
    hideLabel: string;
    items: BlogTocItem[];
    /** `inline` = compact mobile accordion. `sidebar` = sticky desktop nav. */
    variant?: "inline" | "sidebar";
    className?: string;
};

export default function BlogTableOfContents({
    title,
    sectionsLabel,
    showLabel,
    hideLabel,
    items,
    variant = "inline",
    className,
}: BlogTableOfContentsProps) {
    const listId = useId();
    const isSidebar = variant === "sidebar";
    const [activeId, setActiveId] = useState(items[0]?.id ?? "");
    const [expanded, setExpanded] = useState(isSidebar);

    useEffect(() => {
        if (items.length === 0) return;

        const headings = items
            .map((item) => document.getElementById(item.id))
            .filter((node): node is HTMLElement => Boolean(node));

        if (headings.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (a, b) =>
                            a.boundingClientRect.top - b.boundingClientRect.top,
                    );

                if (visible[0]?.target.id) {
                    setActiveId(visible[0].target.id);
                    return;
                }

                const above = headings
                    .filter(
                        (heading) => heading.getBoundingClientRect().top <= 130,
                    )
                    .at(-1);

                if (above) setActiveId(above.id);
            },
            {
                rootMargin: "-110px 0px -60% 0px",
                threshold: [0, 1],
            },
        );

        headings.forEach((heading) => observer.observe(heading));
        return () => observer.disconnect();
    }, [items]);

    if (items.length < 2) return null;

    const activeIndex = Math.max(
        0,
        items.findIndex((item) => item.id === activeId),
    );
    const progress = ((activeIndex + 1) / items.length) * 100;
    const activeItem = items[activeIndex] ?? items[0];

    function scrollToHeading(id: string) {
        const target = document.getElementById(id);
        if (!target) return;
        setActiveId(id);
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#${id}`);
        if (!isSidebar) setExpanded(false);
    }

    return (
        <nav
            aria-label={title}
            className={cn(
                "overflow-hidden rounded-[1.35rem] border border-primary/10 bg-white shadow-[0_8px_28px_rgba(10,37,14,0.05)]",
                className,
            )}
        >
            <div
                className={cn(
                    "bg-cream/40 px-4 py-3.5 sm:px-5",
                    expanded && "border-b border-primary/8",
                )}
            >
                <div className="flex items-start justify-between gap-3">
                    <button
                        type="button"
                        aria-expanded={expanded}
                        aria-controls={listId}
                        onClick={() => setExpanded((value) => !value)}
                        className="min-w-0 flex-1 cursor-pointer text-left"
                    >
                        <p className="text-[11px] font-semibold tracking-[0.18em] text-secondary uppercase">
                            {title}
                        </p>
                        <p className="mt-1 text-xs text-primary/55">
                            {sectionsLabel.replace(
                                "{count}",
                                String(items.length),
                            )}
                        </p>
                    </button>

                    <button
                        type="button"
                        aria-expanded={expanded}
                        aria-controls={listId}
                        onClick={() => setExpanded((value) => !value)}
                        className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border border-primary/10 bg-white px-3 py-1.5 text-xs font-semibold text-primary transition hover:border-secondary/30 hover:text-secondary"
                    >
                        {expanded ? hideLabel : showLabel}
                        <svg
                            viewBox="0 0 16 16"
                            fill="none"
                            aria-hidden
                            className={cn(
                                "size-3.5 transition duration-300",
                                expanded && "rotate-180",
                            )}
                        >
                            <path
                                d="M4 6.25 8 10.25 12 6.25"
                                stroke="currentColor"
                                strokeWidth="1.75"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>

                <div className="mt-3 h-1 overflow-hidden rounded-full bg-primary/8">
                    <div
                        className="h-full rounded-full bg-secondary transition-[width] duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {!expanded ? (
                    <button
                        type="button"
                        onClick={() => setExpanded(true)}
                        className="mt-3 flex w-full cursor-pointer items-center gap-2 rounded-xl bg-white px-3 py-2.5 text-left ring-1 ring-primary/8 transition hover:ring-secondary/25"
                    >
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-white">
                            {String(activeIndex + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0 flex-1 truncate text-sm font-medium text-primary">
                            {activeItem?.text}
                        </span>
                        <span className="text-[11px] font-semibold text-secondary">
                            {showLabel}
                        </span>
                    </button>
                ) : null}
            </div>

            <ol
                id={listId}
                hidden={!expanded}
                className="max-h-[min(24rem,55vh)] space-y-0.5 overflow-y-auto overscroll-contain px-2 py-2 sm:px-2.5 sm:py-2.5"
            >
                {items.map((item, index) => {
                    const isActive = activeId === item.id;

                    return (
                        <li key={item.id}>
                            <button
                                type="button"
                                onClick={() => scrollToHeading(item.id)}
                                className={cn(
                                    "group flex w-full cursor-pointer items-start gap-2.5 rounded-xl px-2.5 py-2.5 text-left transition",
                                    isActive
                                        ? "bg-secondary/10"
                                        : "hover:bg-cream/80",
                                    item.level === 3 && "ps-7",
                                )}
                            >
                                <span
                                    aria-hidden
                                    className={cn(
                                        "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full transition",
                                        isActive
                                            ? "bg-secondary"
                                            : "bg-primary/20 group-hover:bg-secondary/50",
                                    )}
                                />
                                <span className="min-w-0 flex-1">
                                    <span
                                        className={cn(
                                            "block text-[11px] font-semibold tabular-nums tracking-wide uppercase",
                                            isActive
                                                ? "text-secondary"
                                                : "text-primary/40",
                                        )}
                                    >
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <span
                                        className={cn(
                                            "mt-0.5 block text-sm leading-snug",
                                            isActive
                                                ? "font-semibold text-primary"
                                                : "font-medium text-primary/70",
                                        )}
                                    >
                                        {item.text}
                                    </span>
                                </span>
                            </button>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
