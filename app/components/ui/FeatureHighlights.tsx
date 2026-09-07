"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/app/lib/utils";

export type FeatureHighlight = {
    icon: string;
    title: string;
    description: string;
    iconClassName?: string;
};

type FeatureHighlightsProps = {
    items: FeatureHighlight[];
    className?: string;
};

export default function FeatureHighlights({
    items,
    className,
}: FeatureHighlightsProps) {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <div
            className={cn(
                "overflow-visible rounded-2xl bg-cream px-2 pb-6 pt-10 shadow-[0_12px_40px_rgba(10,37,14,0.08)] sm:px-3 lg:rounded-[28px] lg:px-1 lg:pb-4 lg:pt-14",
                className,
            )}
        >
            <div className="grid grid-cols-1 items-start overflow-visible md:grid-cols-2 lg:grid-cols-4">
                {items.map((card, index) => {
                    const isActive = open === index;

                    return (
                        <article
                            key={card.title}
                            className={cn(
                                "group relative flex cursor-pointer flex-col items-center overflow-visible px-3 py-4 text-center outline-none lg:px-4 lg:pb-5 lg:pt-0",
                                "border-primary/15 border-dashed",
                                index !== items.length - 1 &&
                                    "border-b lg:border-b-0 lg:border-r",
                                (index === 0 || index === 2) && "md:border-r",
                                index < 2 && "md:border-b lg:border-b-0",
                            )}
                            onMouseEnter={() => setOpen(index)}
                            onMouseLeave={() => setOpen(null)}
                            onClick={() => setOpen(isActive ? null : index)}
                            onKeyDown={(event) => {
                                if (event.key === "Enter" || event.key === " ") {
                                    event.preventDefault();
                                    setOpen(isActive ? null : index);
                                }
                            }}
                            tabIndex={0}
                            aria-label={card.title}
                            aria-expanded={isActive}
                        >
                            <div className="relative z-30 mx-auto mb-3 flex size-[72px] shrink-0 -translate-y-4 items-center justify-center rounded-2xl bg-secondary shadow-sm lg:-mt-[4rem] lg:-translate-y-2">
                                <Image
                                    src={card.icon}
                                    alt=""
                                    width={40}
                                    height={40}
                                    unoptimized
                                    style={{ width: "auto" }}
                                    className={cn("h-9 w-auto", card.iconClassName)}
                                />
                            </div>

                            <div className="w-full">
                                <div
                                    className={cn(
                                        "grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none",
                                        isActive
                                            ? "grid-rows-[0fr] opacity-0"
                                            : "grid-rows-[1fr] opacity-100 group-hover:grid-rows-[0fr] group-hover:opacity-0 group-focus-within:grid-rows-[0fr] group-focus-within:opacity-0",
                                    )}
                                >
                                    <div className="overflow-hidden">
                                        <div className="flex flex-col items-center pt-1">
                                            <h3 className="w-full px-1 text-xs font-normal whitespace-nowrap text-primary sm:text-sm lg:text-[15px]">
                                                {card.title}
                                            </h3>
                                            <span className="mt-3 block h-px w-10 bg-primary" />
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className={cn(
                                        "grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none",
                                        isActive
                                            ? "grid-rows-[1fr] opacity-100"
                                            : "grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-within:grid-rows-[1fr] group-focus-within:opacity-100",
                                    )}
                                >
                                    <div className="overflow-hidden">
                                        <div className="rounded-2xl bg-secondary px-3 py-4 shadow-sm sm:px-4">
                                            <p className="text-[13px] leading-[1.55] text-white sm:text-sm sm:leading-relaxed">
                                                {card.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}
