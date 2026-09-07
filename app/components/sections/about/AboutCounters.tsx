"use client";

import Image from "next/image";
import { FaTrophy } from "react-icons/fa";
import { useTranslations } from "@/app/lib/i18n";

type CounterCopy = {
    value: string;
    label: string;
};

const counterMeta = [
    {
        type: "image" as const,
        icon: "/icons/execution.svg",
        iconClassName: "h-7 w-auto",
    },
    {
        type: "image" as const,
        icon: "/icons/projects-completed.svg",
        iconClassName: "h-7 w-auto brightness-0 invert",
    },
    {
        type: "image" as const,
        icon: "/icons/trees-plants.svg",
        iconClassName: "h-8 w-auto brightness-0 invert",
    },
    {
        type: "trophy" as const,
    },
];

export default function AboutCounters() {
    const { t, tObject } = useTranslations("aboutPage.counters");
    const items = tObject<CounterCopy[]>("items") ?? [];

    return (
        <section
            id="about-counters"
            aria-label={t("ariaLabel")}
            className="bg-white"
        >
            <div className="section-container">
                <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 xl:gap-10">
                    {items.map((item, index) => {
                        const meta = counterMeta[index] ?? counterMeta[0];

                        return (
                            <li
                                key={item.label}
                                className="flex items-center gap-4 sm:gap-5"
                            >
                                <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-secondary sm:size-[4.5rem]">
                                    {meta.type === "trophy" ? (
                                        <FaTrophy
                                            aria-hidden
                                            className="size-7 text-white sm:size-8"
                                        />
                                    ) : (
                                        <Image
                                            src={meta.icon}
                                            alt=""
                                            width={36}
                                            height={36}
                                            unoptimized
                                            style={{ width: "auto" }}
                                            className={meta.iconClassName}
                                            aria-hidden
                                        />
                                    )}
                                </div>

                                <div>
                                    <p className="text-3xl font-bold leading-none tracking-tight text-primary sm:text-4xl">
                                        {item.value}
                                    </p>
                                    <p className="mt-2 text-sm text-primary/75 sm:text-[15px]">
                                        {item.label}
                                    </p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
