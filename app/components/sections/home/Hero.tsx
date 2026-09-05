"use client";

import Image from "next/image";
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Button from "../../ui/Button";
import { useTranslations } from "@/app/lib/i18n";
import { cn } from "@/app/lib/utils";

const slideMeta = [
    {
        image: "/images/home/hero-bg-1.jpg",
        align: "left" as const,
        objectPosition: "object-[70%_center]",
        overlay: "bg-gradient-to-r from-primary via-primary/55 to-transparent",
    },
    {
        image: "/images/home/hero-bg-2.jpg",
        align: "center" as const,
        objectPosition: "object-center",
        overlay: "bg-primary/50",
    },
    {
        image: "/images/home/hero-bg-3.jpg",
        align: "right" as const,
        objectPosition: "object-[30%_center]",
        overlay: "bg-gradient-to-l from-primary via-primary/55 to-transparent",
    },
];

/* Physical left/center/right — tied to image composition, must not flip in RTL */
const alignContent = {
    left: "items-start text-left mr-auto max-w-xl lg:max-w-2xl",
    center: "items-center text-center mx-auto max-w-3xl lg:max-w-5xl",
    right: "items-end text-right ml-auto max-w-xl lg:max-w-4xl",
};

type SlideCopy = {
    alt: string;
    title: string;
    description: string;
};

export default function Hero() {
    const { t, tObject, locale } = useTranslations("home.hero");
    const { t: tCommon } = useTranslations("common");
    const [index, setIndex] = useState(0);
    const touchStartX = useRef(0);

    const slideCopy = useMemo(() => {
        const items = tObject<SlideCopy[]>("slides");
        return Array.isArray(items) ? items : [];
    }, [tObject, locale]);

    const slides = useMemo(
        () =>
            slideMeta.map((meta, i) => ({
                ...meta,
                alt: slideCopy[i]?.alt ?? "",
                title: slideCopy[i]?.title ?? "",
                description: slideCopy[i]?.description ?? "",
            })),
        [slideCopy],
    );

    const goTo = useCallback((next: number) => {
        setIndex((next + slides.length) % slides.length);
    }, [slides.length]);

    const next = useCallback(() => goTo(index + 1), [goTo, index]);
    const prev = useCallback(() => goTo(index - 1), [goTo, index]);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const id = window.setInterval(() => {
            setIndex((current) => (current + 1) % slides.length);
        }, 5000);

        return () => window.clearInterval(id);
    }, [index, slides.length]);

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "ArrowRight") next();
            if (event.key === "ArrowLeft") prev();
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [next, prev]);

    const slide = slides[index] ?? slides[0];
    if (!slide) return null;

    return (
        <section
            id="hero"
            aria-roledescription="carousel"
            aria-label={t("carouselLabel")}
            className="relative isolate flex min-h-screen w-full flex-col overflow-hidden"
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
            {slides.map((item, slideIndex) => (
                <div
                    key={item.image}
                    aria-hidden={slideIndex !== index}
                    className={cn(
                        "absolute inset-0 overflow-hidden transition-opacity duration-700 ease-out",
                        slideIndex === index ? "opacity-100" : "pointer-events-none opacity-0",
                    )}
                >
                    <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        sizes="100vw"
                        className={cn(
                            "object-cover will-change-transform",
                            item.objectPosition,
                            slideIndex === index && "hero-zoom-in",
                        )}
                        loading={slideIndex === 0 ? "eager" : "lazy"}
                        fetchPriority={slideIndex === 0 ? "high" : "low"}
                    />
                    <div className={cn("absolute inset-0", item.overlay)} />
                </div>
            ))}

            <div className="hero-content relative z-10 my-auto w-full">
                <div className="mx-auto w-full max-w-7xl px-8 sm:px-16 lg:px-24">
                    <div
                        key={`${locale}-${index}`}
                        dir="ltr"
                        className={cn(
                            "hero-copy-in flex w-full flex-col gap-5 sm:gap-6",
                            alignContent[slide.align],
                        )}
                    >
                        <p
                            className={cn(
                                "flex items-center gap-2 sm:gap-3",
                                slide.align === "center" && "justify-center",
                                slide.align === "right" && "justify-end",
                            )}
                        >
                            <Image
                                src="/icons/leaf.svg"
                                alt=""
                                width={41}
                                height={30}
                                unoptimized
                                loading="eager"
                                className="h-6 w-auto shrink-0 sm:h-[30px]"
                            />
                            <span
                                dir={locale === "ar" ? "rtl" : "ltr"}
                                className="font-script min-w-0 text-[20px] leading-tight text-white sm:text-[28px] lg:text-[32px]"
                            >
                                {t("eyebrow")}
                            </span>
                        </p>

                        <h1 dir={locale === "ar" ? "rtl" : "ltr"}>
                            {slide.title.split("\n").map((line, lineIndex) => (
                                <Fragment key={lineIndex}>
                                    {lineIndex > 0 && <br />}
                                    {line}
                                </Fragment>
                            ))}
                        </h1>

                        <p
                            dir={locale === "ar" ? "rtl" : "ltr"}
                            className={cn(
                                "text-sm leading-relaxed text-white/90 sm:text-base lg:text-lg",
                                slide.align === "center"
                                    ? "max-w-2xl"
                                    : "max-w-lg",
                            )}
                        >
                            {slide.description}
                        </p>

                        <Button href="/services">
                            {tCommon("ourServices")}
                        </Button>
                    </div>
                </div>
            </div>

            <button
                type="button"
                aria-label={t("prevSlide")}
                onClick={prev}
                className="absolute top-1/2 left-3 z-20 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/35 text-white transition hover:bg-black/55 sm:left-5 sm:size-12 lg:left-8"
            >
                <Chevron direction="prev" />
            </button>
            <button
                type="button"
                aria-label={t("nextSlide")}
                onClick={next}
                className="absolute top-1/2 right-3 z-20 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/35 text-white transition hover:bg-black/55 sm:right-5 sm:size-12 lg:right-8"
            >
                <Chevron direction="next" />
            </button>

            <div className="sr-only" aria-live="polite">
                {t("slideStatus", {
                    current: index + 1,
                    total: slides.length,
                })}
            </div>
        </section>
    );
}

function Chevron({ direction }: { direction: "prev" | "next" }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className={cn("size-5", direction === "prev" && "rotate-180")}
        >
            <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
