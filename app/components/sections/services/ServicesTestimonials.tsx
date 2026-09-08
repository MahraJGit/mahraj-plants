"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button, Reveal } from "@/app/components/ui";
import {
    getServicesMessages,
    localizeTestimonials,
    useLocale,
} from "@/app/lib/i18n";
import { servicesTestimonials } from "@/app/lib/services";
import { cn } from "@/app/lib/utils";

function StarRating() {
    return (
        <div className="flex justify-center gap-1" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }).map((_, index) => (
                <span key={index} className="text-lg text-[#C4A862]">
                    ★
                </span>
            ))}
        </div>
    );
}

export default function ServicesTestimonials() {
    const { locale } = useLocale();
    const messages = getServicesMessages(locale);
    const testimonials = useMemo(
        () => localizeTestimonials(servicesTestimonials, locale),
        [locale],
    );
    const [activeIndex, setActiveIndex] = useState(0);
    const touchStartX = useRef(0);
    const testimonial = testimonials[activeIndex];

    const goTo = useCallback(
        (next: number) => {
            setActiveIndex((next + testimonials.length) % testimonials.length);
        },
        [testimonials.length],
    );

    const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
    const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        const id = window.setInterval(() => {
            setActiveIndex((current) => (current + 1) % testimonials.length);
        }, 6000);

        return () => window.clearInterval(id);
    }, [activeIndex, testimonials.length]);

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "ArrowRight") next();
            if (event.key === "ArrowLeft") prev();
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [next, prev]);

    return (
        <section
            id="services-testimonials"
            aria-labelledby="services-testimonials-heading"
            aria-roledescription="carousel"
            aria-label={messages.testimonials.ariaLabel}
            className="relative isolate overflow-hidden"
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
            <Image
                src="/images/home/stats-bg.webp"
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
                aria-hidden
            />
            <div
                aria-hidden
                className="absolute inset-0 bg-primary/75"
            />

            <div className="section-container relative">
                <Reveal>
                    <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
                        <div className="max-w-2xl">
                            <p className="flex items-center gap-2">
                                <Image
                                    src="/icons/leaf.svg"
                                    alt=""
                                    width={24}
                                    height={18}
                                    unoptimized
                                    style={{ width: "auto", height: "auto" }}
                                    className="h-4 w-auto brightness-0 invert"
                                />
                                <span className="font-script text-[28px] leading-none text-white sm:text-[32px]">
                                    {messages.testimonials.eyebrow}
                                </span>
                            </p>

                            <h2
                                id="services-testimonials-heading"
                                className="mt-4 text-[28px] leading-[1.15] font-bold tracking-[-2%] text-white sm:text-4xl lg:text-[42px]"
                            >
                                {messages.testimonials.title}
                            </h2>

                            <p className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base">
                                {messages.testimonials.description}
                            </p>
                        </div>

                        <Button
                            variant="secondary"
                            className="w-fit shrink-0 rounded-lg px-8 py-3.5"
                        >
                            {messages.testimonials.viewAll}
                        </Button>
                    </header>
                </Reveal>

                <Reveal delayMs={120}>
                    <div className="mt-10 flex flex-wrap justify-center gap-3 sm:mt-12 sm:gap-4">
                        {testimonials.map((item, index) => {
                            const isActive = index === activeIndex;

                            return (
                                <button
                                    key={item.name}
                                    type="button"
                                    aria-label={messages.testimonials.showFrom.replace(
                                        "{name}",
                                        item.name,
                                    )}
                                    aria-current={isActive}
                                    onClick={() => setActiveIndex(index)}
                                    className={cn(
                                        "relative size-12 cursor-pointer overflow-hidden rounded-full border-2 transition-all duration-300 sm:size-14",
                                        isActive
                                            ? "scale-110 border-white shadow-[0_0_0_4px_rgba(255,255,255,0.25)]"
                                            : "border-white/40 opacity-80 hover:opacity-100",
                                    )}
                                >
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        sizes="56px"
                                        className="object-cover"
                                    />
                                </button>
                            );
                        })}
                    </div>

                    <div
                        key={activeIndex}
                        className="hero-copy-in mx-auto mt-10 max-w-3xl text-center sm:mt-12"
                    >
                        <span
                            aria-hidden
                            className="font-serif text-6xl leading-none text-white/30 sm:text-7xl"
                        >
                            &ldquo;
                        </span>

                        <blockquote className="mt-2 text-base leading-relaxed text-white/95 sm:text-lg lg:text-xl">
                            {testimonial.quote}
                        </blockquote>

                        <p className="mt-6 text-xs font-semibold tracking-[0.15em] text-white uppercase sm:text-sm">
                            {testimonial.name}, {testimonial.location}
                        </p>

                        <div className="mt-4">
                            <StarRating />
                        </div>
                    </div>
                </Reveal>

                <div className="sr-only" aria-live="polite">
                    {testimonial.name}
                </div>
            </div>
        </section>
    );
}
