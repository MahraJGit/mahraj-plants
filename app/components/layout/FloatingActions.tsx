"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FaWhatsapp } from "react-icons/fa";
import { HiArrowUp } from "react-icons/hi";
import { cn } from "@/app/lib/utils";
import { getWhatsAppHref } from "@/app/lib/contact";

const WHATSAPP_HREF = getWhatsAppHref(
    "Hello, I would like to inquire about Mahraj Landscaping.",
);

const SCROLL_THRESHOLD = 300;

const floatingButtonClass =
    "fixed bottom-8 z-50 flex size-12 items-center justify-center rounded-full shadow-lg transition duration-200 hover:scale-105 sm:size-14";

export default function FloatingActions() {
    const [mounted, setMounted] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        setMounted(true);

        function onScroll() {
            setShowScrollTop(window.scrollY > SCROLL_THRESHOLD);
        }

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    function scrollToTop() {
        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;

        window.scrollTo({
            top: 0,
            behavior: reduceMotion ? "auto" : "smooth",
        });
    }

    if (!mounted) {
        return null;
    }

    return createPortal(
        <>
            <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className={cn(
                    floatingButtonClass,
                    "left-4 bg-whatsapp text-white hover:shadow-xl sm:left-8",
                )}
            >
                <FaWhatsapp aria-hidden className="size-7 sm:size-8" />
            </a>

            <button
                type="button"
                onClick={scrollToTop}
                aria-label="Scroll to top"
                aria-hidden={!showScrollTop}
                tabIndex={showScrollTop ? 0 : -1}
                className={cn(
                    floatingButtonClass,
                    "right-4 cursor-pointer bg-primary text-white hover:bg-primary/90 hover:shadow-xl sm:right-8",
                    showScrollTop
                        ? "pointer-events-auto translate-y-0 opacity-100"
                        : "pointer-events-none translate-y-2 opacity-0",
                )}
            >
                <HiArrowUp aria-hidden className="size-6" />
            </button>
        </>,
        document.body,
    );
}
