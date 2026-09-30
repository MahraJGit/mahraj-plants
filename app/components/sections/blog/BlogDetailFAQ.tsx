"use client";

import { useId, useState } from "react";
import type { BlogFaq } from "@/app/lib/blogs/faqs";
import { cn } from "@/app/lib/utils";

type BlogDetailFAQProps = {
    title: string;
    description: string;
    faqs: BlogFaq[];
};

function Chevron({ open }: { open: boolean }) {
    return (
        <span
            aria-hidden
            className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-full border transition duration-300",
                open
                    ? "border-secondary/25 bg-secondary text-white"
                    : "border-primary/10 bg-cream text-primary/50",
            )}
        >
            <svg
                viewBox="0 0 16 16"
                fill="none"
                className={cn(
                    "size-3.5 transition duration-300",
                    open && "rotate-180",
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
        </span>
    );
}

export default function BlogDetailFAQ({
    title,
    description,
    faqs,
}: BlogDetailFAQProps) {
    const [open, setOpen] = useState(0);
    const baseId = useId();

    if (faqs.length === 0) return null;

    return (
        <section
            aria-labelledby={`${baseId}-heading`}
            className="mt-12 border-t border-primary/10 pt-10 sm:mt-14 sm:pt-12"
        >
            <header className="max-w-2xl">
                <p className="text-[11px] font-semibold tracking-[0.2em] text-secondary uppercase">
                    FAQ
                </p>
                <h2
                    id={`${baseId}-heading`}
                    className="mt-2 text-2xl leading-tight font-bold tracking-[-1%] text-primary sm:text-[1.75rem]"
                >
                    {title}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-primary/60 sm:text-[15px]">
                    {description}
                </p>
            </header>

            <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-primary/10 bg-white shadow-[0_8px_28px_rgba(10,37,14,0.04)]">
                <ul>
                    {faqs.map((faq, index) => {
                        const isOpen = open === index;
                        const buttonId = `${baseId}-button-${index}`;
                        const panelId = `${baseId}-panel-${index}`;

                        return (
                            <li
                                key={`${faq.question}-${index}`}
                                className={cn(
                                    index > 0 && "border-t border-primary/8",
                                )}
                            >
                                <button
                                    id={buttonId}
                                    type="button"
                                    aria-expanded={isOpen}
                                    aria-controls={panelId}
                                    onClick={() =>
                                        setOpen(isOpen ? -1 : index)
                                    }
                                    className={cn(
                                        "flex w-full cursor-pointer items-center gap-3 px-5 py-4 text-left transition sm:gap-4 sm:px-6 sm:py-[1.15rem]",
                                        isOpen
                                            ? "bg-secondary/[0.06]"
                                            : "hover:bg-cream/70",
                                    )}
                                >
                                    <span
                                        className={cn(
                                            "flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold tabular-nums transition",
                                            isOpen
                                                ? "bg-secondary text-white"
                                                : "bg-cream text-primary/55",
                                        )}
                                    >
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    <span
                                        className={cn(
                                            "min-w-0 flex-1 text-[15px] leading-snug font-semibold sm:text-base",
                                            isOpen
                                                ? "text-primary"
                                                : "text-primary/90",
                                        )}
                                    >
                                        {faq.question}
                                    </span>

                                    <Chevron open={isOpen} />
                                </button>

                                <div
                                    id={panelId}
                                    role="region"
                                    aria-labelledby={buttonId}
                                    className={cn(
                                        "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
                                        isOpen
                                            ? "grid-rows-[1fr]"
                                            : "grid-rows-[0fr]",
                                    )}
                                >
                                    <div className="overflow-hidden">
                                        <div
                                            className={cn(
                                                "bg-secondary/[0.06] px-5 pb-4 sm:px-6 sm:pb-5",
                                                !isOpen && "pb-0",
                                            )}
                                        >
                                            <p className="ms-11 max-w-2xl text-sm leading-relaxed text-primary/70 sm:ms-12 sm:text-[15px]">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
