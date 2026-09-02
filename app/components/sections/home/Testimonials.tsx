"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
    Button,
    TestimonialCard,
    type Testimonial,
} from "@/app/components/ui";
import { cn } from "@/app/lib/utils";

const testimonials: Testimonial[] = [
    {
        quote: "Mahraj Plants transformed our backyard into a peaceful retreat. The team listened to every detail and delivered beyond what we imagined.",
        name: "Sarah Mitchell",
        role: "Homeowner, London",
        initials: "SM",
    },
    {
        quote: "Professional from start to finish. Our commercial entrance looks welcoming year-round, and maintenance has been effortless.",
        name: "James Porter",
        role: "Property Manager",
        initials: "JP",
    },
    {
        quote: "The rooftop garden they designed for our restaurant has become the highlight of the space. Guests compliment it every evening.",
        name: "Emma Clarke",
        role: "Restaurant Owner",
        initials: "EC",
    },
    {
        quote: "We needed a full landscape overhaul before selling. Their design added real curb appeal and the plants are thriving months later.",
        name: "David Khan",
        role: "Villa Owner, Manchester",
        initials: "DK",
    },
    {
        quote: "Reliable, punctual, and genuinely passionate about plants. Our office courtyard finally feels like a place employees want to spend time.",
        name: "Lisa Nguyen",
        role: "Office Park Manager",
        initials: "LN",
    },
];

const CARD_GAP = 24;

function Chevron({ direction }: { direction: "left" | "right" }) {
    return (
        <Image
            src="/icons/chevron-right.svg"
            alt=""
            width={20}
            height={20}
            aria-hidden
            className={cn("size-5", direction === "left" && "rotate-180")}
        />
    );
}

export default function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(1);
    const [slideWidth, setSlideWidth] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const touchStartX = useRef(0);

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
    }, []);

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
                            Testimonials
                        </p>

                        <h2
                            id="testimonials-heading"
                            className="mt-4 text-[28px] leading-[1.15] font-bold tracking-[-2%] text-primary sm:text-4xl lg:text-[42px]"
                        >
                            What our clients say about our service
                        </h2>

                        <p className="mt-5 text-sm leading-relaxed text-primary/65 sm:text-base">
                            Our clients&apos; words speak for the quality and care we
                            put into every project. Discover how we&apos;ve helped turn
                            outdoor dreams into reality one garden at a time.
                        </p>
                    </div>

                    <Button
                        variant="secondary"
                        className="w-fit shrink-0 rounded-lg px-8 py-3.5"
                    >
                        View All Testimonials
                    </Button>
                </header>

                <div className="relative mt-12 lg:mt-14">
                    <div
                        ref={containerRef}
                        className="overflow-hidden"
                        aria-roledescription="carousel"
                        aria-label="Client testimonials"
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
                                    className="w-full shrink-0 sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                                >
                                    <TestimonialCard testimonial={testimonial} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        type="button"
                        aria-label="Previous testimonial"
                        onClick={prev}
                        disabled={activeIndex === 0}
                        className="absolute top-1/2 -left-2 z-10 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-primary/10 bg-white text-primary shadow-md transition hover:bg-cream disabled:cursor-not-allowed disabled:opacity-40 sm:-left-4"
                    >
                        <Chevron direction="left" />
                    </button>
                    <button
                        type="button"
                        aria-label="Next testimonial"
                        onClick={next}
                        disabled={activeIndex === maxIndex}
                        className="absolute top-1/2 -right-2 z-10 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-primary/10 bg-white text-primary shadow-md transition hover:bg-cream disabled:cursor-not-allowed disabled:opacity-40 sm:-right-4"
                    >
                        <Chevron direction="right" />
                    </button>

                    <div className="mt-8 flex justify-center gap-2">
                        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                aria-label={`Go to slide ${index + 1}`}
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

                    <div className="sr-only" aria-live="polite">
                        Showing testimonials {activeIndex + 1} to{" "}
                        {Math.min(activeIndex + visibleCount, testimonials.length)} of{" "}
                        {testimonials.length}
                    </div>
                </div>
            </div>
        </section>
    );
}
