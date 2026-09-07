"use client";

import Image from "next/image";
import { useMemo } from "react";
import { useTranslations } from "@/app/lib/i18n";

const statsMeta = [
    { value: "200+", icon: "/icons/projects-completed.svg" },
    { value: "300+", icon: "/icons/trees-plants.svg" },
    { value: "98%", icon: "/icons/client-satisfaction.svg" },
    { value: "20+", icon: "/icons/expert-team.svg" },
];

type StatCopy = {
    title: string;
    description: string;
};

export default function Stats() {
    const { t, tObject, locale } = useTranslations("home.stats");

    const stats = useMemo(() => {
        const items = tObject<StatCopy[]>("items");
        if (!Array.isArray(items)) return [];

        return items.map((item, index) => ({
            ...statsMeta[index],
            title: item.title,
            description: item.description,
        }));
    }, [tObject, locale]);

    return (
        <section
            id="stats"
            aria-label={t("ariaLabel")}
            className="relative isolate overflow-hidden"
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
                className="absolute inset-0 bg-primary/80"
            />

            <div className="section-container relative">
                <ul className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-7">
                    {stats.map((stat) => (
                        <li key={stat.title}>
                            <article className="flex h-full flex-col rounded-2xl bg-white/95 px-6 py-8 shadow-[0_12px_40px_rgba(10,37,14,0.15)] backdrop-blur-sm sm:px-7 sm:py-9">
                                <div className="flex size-14 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
                                    <Image
                                        src={stat.icon}
                                        alt=""
                                        width={40}
                                        height={40}
                                        unoptimized
                                        style={{ width: "auto" }}
                                        className="h-9 w-auto"
                                    />
                                </div>

                                <p className="mt-6 text-4xl font-bold leading-none tracking-tight text-primary sm:text-[2.75rem]">
                                    {stat.value}
                                </p>

                                <h3 className="mt-3 text-base font-semibold text-primary sm:text-lg">
                                    {stat.title}
                                </h3>

                                <p className="mt-3 text-sm leading-relaxed text-primary/65 sm:text-[15px]">
                                    {stat.description}
                                </p>
                            </article>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
