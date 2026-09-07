"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import Reveal from "@/app/components/ui/Reveal";
import {
    getServicesMessages,
    localizeService,
    useLocale,
} from "@/app/lib/i18n";
import type { ServiceDetail } from "@/app/lib/services";
import { cn } from "@/app/lib/utils";

type GalleryItem = { src: string; alt: string };

type ServiceDetailGalleryProps = {
    images?: GalleryItem[];
    service?: ServiceDetail;
};

function Chevron({ direction }: { direction: "left" | "right" }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
            className={cn("size-5", direction === "left" && "rotate-180")}
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

export default function ServiceDetailGallery({
    images,
    service,
}: ServiceDetailGalleryProps) {
    const { locale } = useLocale();
    const messages = getServicesMessages(locale);
    const galleryImages = useMemo(() => {
        if (service) return localizeService(service, locale).gallery;
        return images ?? [];
    }, [images, locale, service]);
    const [offset, setOffset] = useState(0);

    const next = useCallback(() => {
        setOffset((current) => (current + 1) % galleryImages.length);
    }, [galleryImages.length]);

    const prev = useCallback(() => {
        setOffset(
            (current) =>
                (current - 1 + galleryImages.length) % galleryImages.length,
        );
    }, [galleryImages.length]);

    const visibleImages = Array.from(
        { length: Math.min(3, galleryImages.length) },
        (_, i) => galleryImages[(offset + i) % galleryImages.length],
    );

    return (
        <section
            aria-label={messages.detail.galleryLabel}
            className="bg-gradient-to-b from-[#F4F8EC] to-white pt-8 sm:pt-10"
        >
            <div className="section-container relative pt-4">
                <Reveal>
                    <div className="relative">
                        <button
                            type="button"
                            aria-label={messages.detail.prevImages}
                            onClick={prev}
                            className="absolute top-1/2 -left-2 z-10 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-secondary text-white shadow-md transition hover:bg-secondary/90 sm:-left-4"
                        >
                            <Chevron direction="left" />
                        </button>
                        <button
                            type="button"
                            aria-label={messages.detail.nextImages}
                            onClick={next}
                            className="absolute top-1/2 -right-2 z-10 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-secondary text-white shadow-md transition hover:bg-secondary/90 sm:-right-4"
                        >
                            <Chevron direction="right" />
                        </button>

                        <ul className="grid gap-4 sm:grid-cols-3 sm:gap-5">
                            {visibleImages.map((image, index) => (
                                <li
                                    key={`${image.src}-${offset}-${index}`}
                                    className="relative aspect-[4/3] overflow-hidden rounded-2xl"
                                >
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        sizes="(max-width: 640px) 100vw, 33vw"
                                        className="object-cover transition-transform duration-500 ease-out hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100"
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
