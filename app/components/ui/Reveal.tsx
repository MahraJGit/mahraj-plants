"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/app/lib/utils";

type RevealProps = {
    children: ReactNode;
    className?: string;
    delayMs?: number;
    id?: string;
    as?: "div" | "li" | "article" | "section" | "header";
};

export default function Reveal({
    children,
    className,
    delayMs = 0,
    id,
    as: Tag = "div",
}: RevealProps) {
    const ref = useRef<HTMLElement | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry?.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <Tag
            id={id}
            ref={ref as never}
            className={cn(
                "reveal-up",
                visible && "reveal-up-visible",
                className,
            )}
            style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
        >
            {children}
        </Tag>
    );
}
