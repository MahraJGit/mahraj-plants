"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
    Button,
    TestimonialCard,
    type Testimonial,
} from "@/app/components/ui";
import { useTranslations } from "@/app/lib/i18n";
import { cn } from "@/app/lib/utils";

const CARD_GAP = 24;

const initials = ["SM", "JP", "EC", "DK", "LN"];

type TestimonialCopy = {
    quote: string;
    name: string;
    role: string;
};

function Chevron({ direction }: { direction: "prev" | "next" }) {
    return (
        <Image
            src="/icons/chevron-right.svg"
            alt=""
            width={20}
            height={20}
            aria-hidden
            style={{ width: "auto", height: "auto" }}
            className={cn(
                "size-5",
                direction === "prev" && "rotate-180 rtl:rotate-0",
                direction === "next" && "rtl:rotate-180",
            )}
        />
    );
}

export default function Testimonials() {
    const { t, tObject, locale } = useTranslations("home.testimonials");
    const { t: tCommon } = useTranslations("common");
    const [activeIndex, setActiveIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(1);
    const [slideWidth, setSlideWidth] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const touchStartX = useRef(0);

    const testimonials = useMemo(() => {
        const items = tObject<TestimonialCopy[]>("items");
        if (!Array.isArray(items)) return [] as Testimonial[];

        return items.map((item, index) => ({
            quote: item.quote,
            name: item.name,
            role: item.role,
            initials: initials[index] ?? item.name.slice(0, 2).toUpperCase(),
        }));
    }, [tObject, locale]);

    const maxIndex = Math.max(testimonials.length - visibleCount, 0);

    const goTo = useCallback(
        (next: number) => {
            setActiveIndex(Math.min(Math.max(next, 0), maxIndex));
        },
        [maxIndex],
    );

    const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
    const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

    useEffect(() => {
        function measure() {
            const container = containerRef.current;
            const slide = container?.querySelector("[data-slide]") as
                | HTMLElement
                | null;

            if (!container) return;

            const width = window.innerWidth;
            const count = width >= 1024 ? 3 : width >= 640 ? 2 : 1;
            setVisibleCount(count);
            setSlideWidth(slide?.offsetWidth ?? 0);

            setActiveIndex((current) =>
                Math.min(current, Math.max(testimonials.length - count, 0)),
            );
        }

        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, [testimonials.length]);

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "ArrowRight") next();
            if (event.key === "ArrowLeft") prev();
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [next, prev]);

    const translateX = slideWidth
        ? -(activeIndex * (slideWidth + CARD_GAP))
        : 0;

    return (
        <section
            id="testimonials"
            aria-labelledby="testimonials-heading"
            className="bg-white"
        >
            <div className="section-container">
                <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
                    <div className="max-w-3xl">
                        <p className="text-sm font-medium tracking-[0.2em] text-secondary uppercase">
                            {t("eyebrow")}
                        </p>

                        <h2
                            id="testimonials-heading"
                            className="mt-4 text-[28px] leading-[1.15] font-bold tracking-[-2%] text-primary sm:text-4xl lg:text-[42px]"
                        >
                            {t("title")}
                        </h2>

                        <p className="mt-5 text-sm leading-relaxed text-primary/65 sm:text-base">
                            {t("description")}
                        </p>
                    </div>
                </header>

                <div className="relative mt-12 lg:mt-14">
                    <div
                        ref={containerRef}
                        className="overflow-hidden"
                        aria-roledescription="carousel"
                        aria-label={t("carouselLabel")}
                        onPointerDown={(event) => {
                            if ((event.target as HTMLElement).closest("button")) return;
                            touchStartX.current = event.clientX;
                        }}
                        onPointerUp={(event) => {
                            if ((event.target as HTMLElement).closest("button")) return;
                            const delta = event.clientX - touchStartX.current;
                            if (delta > 50) prev();
                            if (delta < -50) next();
                        }}
                    >
                        <div
                            className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
                            style={{
                                gap: CARD_GAP,
                                transform: `translateX(${translateX}px)`,
                            }}
                        >
                            {testimonials.map((testimonial) => (
                                <div
                                    key={testimonial.name}
                                    data-slide
                                    className="w-full shrink-0 sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                                >
                                    <TestimonialCard testimonial={testimonial} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        type="button"
                        aria-label={t("prev")}
                        onClick={prev}
                        disabled={activeIndex === 0}
                        className="absolute top-1/2 -start-2 z-10 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-primary/10 bg-white text-primary shadow-md transition hover:bg-cream disabled:cursor-not-allowed disabled:opacity-40 sm:-start-4"
                    >
                        <Chevron direction="prev" />
                    </button>
                    <button
                        type="button"
                        aria-label={t("next")}
                        onClick={next}
                        disabled={activeIndex === maxIndex}
                        className="absolute top-1/2 -end-2 z-10 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-primary/10 bg-white text-primary shadow-md transition hover:bg-cream disabled:cursor-not-allowed disabled:opacity-40 sm:-end-4"
                    >
                        <Chevron direction="next" />
                    </button>

                    <div className="mt-8 flex justify-center gap-2">
                        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                aria-label={t("goToSlide", { n: index + 1 })}
                                onClick={() => goTo(index)}
                                className={cn(
                                    "h-2 cursor-pointer rounded-full transition-all",
                                    index === activeIndex
                                        ? "w-7 bg-secondary"
                                        : "w-2 bg-primary/20 hover:bg-primary/35",
                                )}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
