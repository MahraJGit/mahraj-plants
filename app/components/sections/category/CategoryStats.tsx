"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "@/app/lib/i18n";

type ParsedStat = {
    target: number;
    suffix: string;
};

type StatCopy = {
    value: string;
    label: string;
};

const statIcons = [
    "/icons/projects-completed.svg",
    "/icons/trees-plants.svg",
    "/icons/client-satisfaction.svg",
    "/icons/expert-team.svg",
];

function parseStatValue(value: string): ParsedStat {
    const match = value.match(/^(\d+)(.*)$/);
    return {
        target: match ? Number.parseInt(match[1], 10) : 0,
        suffix: match?.[2] ?? "",
    };
}

function useCountUp(target: number, active: boolean, duration = 2000) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!active) {
            return;
        }

        let frame = 0;
        let startTime: number | null = null;

        const animate = (timestamp: number) => {
            if (startTime === null) {
                startTime = timestamp;
            }

            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));

            if (progress < 1) {
                frame = requestAnimationFrame(animate);
            }
        };

        frame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(frame);
    }, [active, duration, target]);

    return count;
}

function AnimatedStatValue({
    value,
    active,
}: {
    value: string;
    active: boolean;
}) {
    const { target, suffix } = parseStatValue(value);
    const count = useCountUp(target, active);

    return (
        <>
            {count}
            {suffix}
        </>
    );
}

export default function CategoryStats() {
    const sectionRef = useRef<HTMLElement>(null);
    const [inView, setInView] = useState(false);
    const { t, tObject, locale } = useTranslations("categoriesPage");

    const stats = useMemo(() => {
        const items = tObject<StatCopy[]>("stats");
        if (!Array.isArray(items)) return [];

        return items.map((item, index) => ({
            ...item,
            icon: statIcons[index] ?? statIcons[0],
        }));
    }, [tObject, locale]);

    useEffect(() => {
        const node = sectionRef.current;
        if (!node) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.35 },
        );

        observer.observe(node);

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            aria-label={t("statsAriaLabel")}
            className="bg-white"
        >
            <div className="section-container pt-0">
                <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
                    {stats.map((stat) => (
                        <li key={stat.label}>
                            <article className="relative overflow-hidden rounded-2xl bg-secondary px-6 py-7 sm:px-7 sm:py-8">
                                <div className="relative z-10">
                                    <p className="text-4xl font-bold leading-none text-white sm:text-[2.75rem]">
                                        <AnimatedStatValue
                                            value={stat.value}
                                            active={inView}
                                        />
                                    </p>
                                    <p className="mt-3 text-sm font-medium text-white/95 sm:text-base">
                                        {stat.label}
                                    </p>
                                </div>

                                <Image
                                    src={stat.icon}
                                    alt=""
                                    width={88}
                                    height={88}
                                    unoptimized
                                    aria-hidden
                                    style={{ width: "auto" }}
                                    className="pointer-events-none absolute end-4 bottom-4 h-16 w-auto opacity-20 brightness-0 invert sm:h-20"
                                />
                            </article>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
