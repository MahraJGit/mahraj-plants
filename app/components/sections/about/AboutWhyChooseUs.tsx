"use client";

import Image from "next/image";
import type { IconType } from "react-icons";
import {
    MdDashboardCustomize,
    MdOutlineEco,
    MdOutlineLandscape,
    MdOutlineVerified,
} from "react-icons/md";
import { useTranslations } from "@/app/lib/i18n";
import { cn } from "@/app/lib/utils";

type FeatureCopy = {
    title: string;
    description: string;
};

const featureIcons: IconType[] = [
    MdOutlineLandscape,
    MdDashboardCustomize,
    MdOutlineVerified,
    MdOutlineEco,
];

export default function AboutWhyChooseUs() {
    const { t, tObject } = useTranslations("aboutPage.whyChoose");
    const features = tObject<FeatureCopy[]>("features") ?? [];

    return (
        <section
            id="why-choose-us"
            aria-labelledby="why-choose-us-heading"
            className="bg-white"
        >
            <div className="mx-auto max-w-[84rem] px-4 py-8 lg:px-6 lg:py-16">
                <div className="overflow-hidden rounded-[1.75rem] bg-cream/40 px-6 py-10 sm:rounded-[2rem] sm:px-8 sm:py-12 lg:rounded-[2.5rem] lg:px-12 lg:py-14 xl:px-16">
                    <header className="mx-auto max-w-3xl text-center">
                        <Image
                            src="/icons/singleLeaf.svg"
                            alt=""
                            width={14}
                            height={21}
                            unoptimized
                            style={{ width: "auto", height: "auto" }}
                            className="mx-auto h-5 w-auto"
                            aria-hidden
                        />

                        <p className="mt-4 font-script text-[28px] leading-none text-secondary sm:text-[32px]">
                            {t("eyebrow")}
                        </p>

                        <h2
                            id="why-choose-us-heading"
                            className="mt-4 text-[28px] leading-[1.15] font-bold tracking-[-2%] text-primary sm:text-4xl lg:text-[42px]"
                        >
                            {t("title")}
                        </h2>

                        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-primary/65 sm:text-base">
                            {t("description")}
                        </p>
                    </header>

                    <div className="mt-10 grid items-stretch gap-8 lg:mt-14 lg:grid-cols-2 lg:gap-10 xl:gap-14">
                        <div className="relative min-h-[22rem] overflow-hidden rounded-2xl sm:min-h-[26rem] sm:rounded-[1.75rem] lg:min-h-full">
                            <Image
                                src="/images/about/why-choose-us.webp"
                                alt={t("imageAlt")}
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </div>

                        <ul className="grid sm:grid-cols-2">
                            {features.map((feature, index) => {
                                const Icon = featureIcons[index] ?? featureIcons[0];

                                return (
                                    <li
                                        key={feature.title}
                                        className={cn(
                                            "flex flex-col py-6 sm:px-6 sm:py-7 lg:px-7",
                                            "border-primary/10 border-dashed",
                                            index < 2 && "border-b",
                                            index % 2 === 0 &&
                                                "sm:border-r sm:pr-7 lg:pr-8",
                                            index % 2 === 1 && "sm:pl-7 lg:pl-8",
                                        )}
                                    >
                                        <div className="flex size-12 items-center justify-center rounded-xl bg-secondary sm:size-14">
                                            <Icon
                                                aria-hidden
                                                className="size-6 text-white sm:size-7"
                                            />
                                        </div>

                                        <h3 className="mt-4 text-base font-bold leading-snug text-primary sm:text-lg">
                                            {feature.title}
                                        </h3>

                                        <p className="mt-2.5 text-sm leading-relaxed text-primary/65">
                                            {feature.description}
                                        </p>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
