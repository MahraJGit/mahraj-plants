"use client";

import Image from "next/image";
import Link from "next/link";
import { FaStar, FaThumbsUp } from "react-icons/fa";
import { useTranslations } from "@/app/lib/i18n";
import { cn } from "@/app/lib/utils";

function SatisfactionIcon({ className }: { className?: string }) {
    return (
        <span
            className={cn(
                "relative inline-flex size-10 items-center justify-center text-white",
                className,
            )}
            aria-hidden
        >
            <span className="absolute -top-1.5 flex items-center gap-0.5">
                <FaStar className="size-2.5 -rotate-12 opacity-90" />
                <FaStar className="size-3 opacity-95" />
                <FaStar className="size-2.5 rotate-12 opacity-90" />
            </span>
            <FaThumbsUp className="size-5" />
        </span>
    );
}

type StatCopy = {
    value: string;
    label: string;
};

export default function AboutWhoWeAre() {
    const { t, tObject } = useTranslations("aboutPage.whoWeAre");
    const stats = tObject<StatCopy[]>("stats") ?? [];

    return (
        <section
            id="who-we-are"
            aria-labelledby="who-we-are-heading"
            className="bg-white pb-28 pt-10 sm:pb-32 sm:pt-12 lg:pb-36 lg:pt-14"
        >
            <div className="section-container">
                <div className="overflow-hidden rounded-[1.75rem] bg-cream/40 sm:rounded-[2rem] lg:rounded-[2.5rem]">
                    <div className="grid lg:grid-cols-2">
                        <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14 xl:px-14">
                            <p className="flex items-center gap-2">
                                <Image
                                    src="/icons/singleLeaf.svg"
                                    alt=""
                                    width={14}
                                    height={21}
                                    unoptimized
                                    style={{ width: "auto" }}
                                    className="h-5 w-auto shrink-0"
                                    aria-hidden
                                />
                                <span className="font-script text-[28px] leading-none text-secondary sm:text-[32px]">
                                    {t("eyebrow")}
                                </span>
                            </p>

                            <h2
                                id="who-we-are-heading"
                                className="mt-4 max-w-md text-[26px] leading-tight font-bold tracking-[-2%] text-primary sm:text-4xl lg:text-[40px]"
                            >
                                {t("title")}
                            </h2>

                            <div className="mt-8 flex flex-wrap gap-3 sm:mt-10">
                                <Link
                                    href="/#consultation"
                                    className="inline-flex cursor-pointer items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-primary/90 sm:px-8 sm:text-base"
                                >
                                    {t("startGarden")}
                                </Link>
                                <Link
                                    href="/services"
                                    className="inline-flex cursor-pointer items-center justify-center rounded-full bg-secondary px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-secondary/90 sm:px-8 sm:text-base"
                                >
                                    {t("viewServices")}
                                </Link>
                            </div>
                        </div>

                        <div className="flex flex-col justify-center border-t border-dashed border-primary/20 px-6 py-10 sm:px-10 sm:py-12 lg:border-t-0 lg:border-l lg:px-12 lg:py-14 xl:px-14">
                            <p className="text-sm leading-relaxed text-primary/70 sm:text-base sm:leading-relaxed">
                                {t("body")}
                            </p>

                            <div className="mt-8 grid grid-cols-1 gap-6 sm:mt-10 sm:grid-cols-2 sm:gap-8">
                                {stats.map((stat, index) => (
                                    <div
                                        key={stat.label}
                                        className="flex items-center gap-3.5"
                                    >
                                        <div className="flex size-18 shrink-0 items-center justify-center rounded-full bg-secondary shadow-sm">
                                            {index === 0 ? (
                                                <Image
                                                    src="/icons/leaf.svg"
                                                    alt=""
                                                    width={28}
                                                    height={20}
                                                    unoptimized
                                                    style={{ width: "auto" }}
                                                    className="h-5 w-auto brightness-0 invert"
                                                    aria-hidden
                                                />
                                            ) : (
                                                <SatisfactionIcon />
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-3xl font-bold leading-none tracking-tight text-primary sm:text-[2rem]">
                                                {stat.value}
                                            </p>
                                            <p className="mt-1.5 text-sm text-primary/65">
                                                {stat.label}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
