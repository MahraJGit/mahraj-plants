"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { HiChevronLeft, HiChevronRight, HiPlus, HiX } from "react-icons/hi";
import { cn } from "@/app/lib/utils";
import AboutTimeline from "./AboutTimeline";

type GalleryImage = {
    src: string;
    alt: string;
};

const galleryImages: GalleryImage[] = [
    {
        src: "/images/home/m-landscaping.webp",
        alt: "Landscaper working on a flowering garden bed",
    },
    {
        src: "/images/home/m-outdoor.webp",
        alt: "Lush outdoor garden with green lawn and plants",
    },
    {
        src: "/images/home/hero-bg-2.jpg",
        alt: "Rooftop garden overlooking a city skyline",
    },
    {
        src: "/images/home/m-trees.webp",
        alt: "Garden terrace with trees and raised planting beds",
    },
    {
        src: "/images/home/hero-bg-3.jpg",
        alt: "Gardener trimming hedges in a landscaped space",
    },
    {
        src: "/images/home/our-mission.webp",
        alt: "Team working on sustainable garden landscaping",
    },
    {
        src: "/images/home/aboutImg.webp",
        alt: "Mahraj Plants team caring for garden flowers",
    },
    {
        src: "/images/home/m-indoor.webp",
        alt: "Indoor greenery and plant arrangements",
    },
];

const CARD_GAP = 20;
const CARD_HEIGHT = 260;

export default function AboutGallery() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const dragMoved = useRef(false);
    const pointerStartX = useRef(0);
    const scrollStartLeft = useRef(0);
    const pressedIndex = useRef<number | null>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    useEffect(() => {
        if (activeIndex === null) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setActiveIndex(null);
                return;
            }
            if (event.key === "ArrowLeft") {
                setActiveIndex(
                    (current) =>
                        current === null
                            ? null
                            : (current - 1 + galleryImages.length) %
                              galleryImages.length,
                );
            }
            if (event.key === "ArrowRight") {
                setActiveIndex(
                    (current) =>
                        current === null
                            ? null
                            : (current + 1) % galleryImages.length,
                );
            }
        }

        window.addEventListener("keydown", onKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [activeIndex]);

    function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
        if (event.button !== 0) return;

        const container = scrollRef.current;
        if (!container) return;

        const card = (event.target as HTMLElement).closest<HTMLElement>(
            "[data-gallery-index]",
        );
        pressedIndex.current = card
            ? Number(card.dataset.galleryIndex)
            : null;

        isDragging.current = true;
        dragMoved.current = false;
        pointerStartX.current = event.clientX;
        scrollStartLeft.current = container.scrollLeft;
        container.setPointerCapture(event.pointerId);
    }

    function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
        if (!isDragging.current || !scrollRef.current) return;

        const delta = event.clientX - pointerStartX.current;
        if (Math.abs(delta) > 6) dragMoved.current = true;

        if (dragMoved.current) {
            scrollRef.current.scrollLeft = scrollStartLeft.current - delta;
        }
    }

    function endDrag(event: React.PointerEvent<HTMLDivElement>) {
        if (!isDragging.current || !scrollRef.current) return;

        isDragging.current = false;

        if (scrollRef.current.hasPointerCapture(event.pointerId)) {
            scrollRef.current.releasePointerCapture(event.pointerId);
        }

        const index = pressedIndex.current;
        const shouldOpen = !dragMoved.current && index !== null;

        pressedIndex.current = null;

        if (shouldOpen) {
            setActiveIndex(index);
        }
    }

    function openImage(index: number) {
        setActiveIndex(index);
    }

    function goPrev() {
        setActiveIndex(
            (current) =>
                current === null
                    ? null
                    : (current - 1 + galleryImages.length) %
                      galleryImages.length,
        );
    }

    function goNext() {
        setActiveIndex(
            (current) =>
                current === null
                    ? null
                    : (current + 1) % galleryImages.length,
        );
    }

    const activeImage =
        activeIndex === null ? null : galleryImages[activeIndex];

    return (
        <>
            <section
                id="about-timeline"
                aria-labelledby="about-timeline-heading"
                className="relative isolate mt-20 overflow-visible bg-section sm:mt-24 lg:mt-28"
            >
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[48px_48px]"
                />

                <div className="relative z-10 -mt-[7.5rem] sm:-mt-36 lg:-mt-40">
                    <div
                        ref={scrollRef}
                        className={cn(
                            "flex w-full overflow-x-auto px-4 sm:px-6 lg:px-8",
                            "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
                            "cursor-grab active:cursor-grabbing",
                            "select-none touch-pan-y",
                        )}
                        style={{ gap: CARD_GAP }}
                        aria-label="Project gallery images"
                        onPointerDown={handlePointerDown}
                        onPointerMove={handlePointerMove}
                        onPointerUp={endDrag}
                        onPointerCancel={endDrag}
                    >
                        {galleryImages.map((image, index) => (
                            <article
                                key={`${image.src}-${index}`}
                                data-gallery-index={index}
                                role="button"
                                tabIndex={0}
                                aria-label={`View ${image.alt}`}
                                onKeyDown={(event) => {
                                    if (
                                        event.key === "Enter" ||
                                        event.key === " "
                                    ) {
                                        event.preventDefault();
                                        openImage(index);
                                    }
                                }}
                                className="group relative w-[min(72vw,280px)] shrink-0 cursor-pointer overflow-hidden rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.28)] outline-none sm:w-[300px] lg:w-[320px]"
                                style={{ height: CARD_HEIGHT }}
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    sizes="320px"
                                    draggable={false}
                                    className="pointer-events-none object-cover transition-transform duration-500 ease-out group-hover:scale-110 group-focus-visible:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                                />

                                <div
                                    aria-hidden
                                    className="pointer-events-none absolute inset-0 bg-primary/0 transition-colors duration-500 group-hover:bg-primary/45 group-focus-visible:bg-primary/45 motion-reduce:transition-none"
                                />

                                <span
                                    aria-hidden
                                    className={cn(
                                        "pointer-events-none absolute top-1/2 left-1/2 z-20 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-md transition-all duration-500 ease-out motion-reduce:transition-none",
                                        "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100",
                                        "group-focus-visible:opacity-100 group-focus-visible:scale-100",
                                    )}
                                >
                                    <HiPlus className="size-6" />
                                </span>
                            </article>
                        ))}
                    </div>
                </div>

                <AboutTimeline />
            </section>

            {activeImage && activeIndex !== null && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image detail view"
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-primary/90 p-4 backdrop-blur-sm sm:p-8"
                    onClick={() => setActiveIndex(null)}
                >
                    <button
                        type="button"
                        aria-label="Close image view"
                        onClick={() => setActiveIndex(null)}
                        className="absolute top-4 right-4 z-20 flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:top-6 sm:right-6"
                    >
                        <HiX aria-hidden className="size-6" />
                    </button>

                    <button
                        type="button"
                        aria-label="Previous image"
                        onClick={(event) => {
                            event.stopPropagation();
                            goPrev();
                        }}
                        className="absolute top-1/2 left-3 z-20 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-primary shadow-lg transition hover:bg-cream sm:left-6 sm:size-12"
                    >
                        <HiChevronLeft aria-hidden className="size-6" />
                    </button>

                    <button
                        type="button"
                        aria-label="Next image"
                        onClick={(event) => {
                            event.stopPropagation();
                            goNext();
                        }}
                        className="absolute top-1/2 right-3 z-20 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-primary shadow-lg transition hover:bg-cream sm:right-6 sm:size-12"
                    >
                        <HiChevronRight aria-hidden className="size-6" />
                    </button>

                    <div
                        className="relative h-[min(78vh,720px)] w-full max-w-5xl overflow-hidden rounded-2xl shadow-2xl"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <Image
                            src={activeImage.src}
                            alt={activeImage.alt}
                            fill
                            sizes="(max-width: 1024px) 100vw, 1024px"
                            className="object-contain bg-black/40"
                            priority
                        />
                    </div>

                    <p className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white/90 backdrop-blur-sm">
                        {activeIndex + 1} / {galleryImages.length}
                    </p>
                </div>
            )}
        </>
    );
}
