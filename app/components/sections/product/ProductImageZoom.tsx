"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { cn } from "@/app/lib/utils";

const ZOOM_SCALE = 2;

type ProductImageZoomProps = {
    src: string;
    alt: string;
};

export default function ProductImageZoom({ src, alt }: ProductImageZoomProps) {
    const [zoomed, setZoomed] = useState(false);
    const [origin, setOrigin] = useState({ x: 50, y: 50 });

    const updateOrigin = useCallback(
        (event: React.MouseEvent<HTMLDivElement>) => {
            if (
                window.matchMedia("(hover: none)").matches ||
                window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ) {
                return;
            }

            const rect = event.currentTarget.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 100;
            const y = ((event.clientY - rect.top) / rect.height) * 100;

            setOrigin({
                x: Math.min(100, Math.max(0, x)),
                y: Math.min(100, Math.max(0, y)),
            });
            setZoomed(true);
        },
        [],
    );

    return (
        <div
            className="relative mx-auto aspect-[4/5] w-80 max-w-full overflow-hidden rounded-[1.75rem] bg-white shadow-[0_16px_48px_rgba(10,37,14,0.1)] sm:w-96 sm:rounded-[2rem] lg:mx-0 [@media(hover:hover)]:cursor-zoom-in"
            onMouseEnter={updateOrigin}
            onMouseMove={updateOrigin}
            onMouseLeave={() => setZoomed(false)}
        >
            <Image
                src={src}
                alt={alt}
                fill
                priority
                sizes="384px"
                className={cn(
                    "object-contain will-change-transform",
                    "transition-transform duration-200 ease-out motion-reduce:transition-none",
                )}
                style={{
                    transform: zoomed ? `scale(${ZOOM_SCALE})` : "scale(1)",
                    transformOrigin: `${origin.x}% ${origin.y}%`,
                }}
            />
        </div>
    );
}
