"use client";

import Image from "next/image";
import Button from "../../ui/Button";
import { useTranslations } from "@/app/lib/i18n";

export default function About() {
    const { t, tArray } = useTranslations("home.about");
    const { t: tCommon } = useTranslations("common");
    const highlights = tArray("highlights");
    const paragraphs = tArray("paragraphs");

    return (
        <section
            id="about"
            aria-labelledby="about-heading"
            className="bg-white"
        >
            <div className="section-container">
                <div className="grid items-stretch gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14 xl:gap-16">
                    <div className="relative mx-auto h-full min-h-[22rem] w-full sm:min-h-[24rem] lg:mx-0">
                        <div className="absolute inset-0 overflow-hidden rounded-ss-[2.5rem] rounded-ee-[2.5rem] shadow-[0_20px_50px_rgba(10,37,14,0.12)] sm:rounded-ss-[3rem] sm:rounded-ee-[3rem]">
                            <Image
                                src="/images/home/aboutImg.webp"
                                alt={t("imageAlt")}
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </div>

                        <div className="absolute -top-4 end-0 z-10 w-[9.5rem] rounded-ss-[1.75rem] rounded-ee-[1.75rem] bg-section px-5 py-7 text-center text-white shadow-lg sm:-top-6 sm:end-2 sm:w-[10.5rem] sm:px-6 sm:py-8 lg:-end-4">
                            <Image
                                src="/icons/leaf.svg"
                                alt=""
                                width={41}
                                height={30}
                                unoptimized
                                style={{ width: "auto" }}
                                className="mx-auto h-7 w-auto"
                            />
                            <p className="mt-3 text-4xl leading-none font-semibold sm:text-[2.75rem]">
                                35+
                            </p>
                            <p className="mt-2 text-sm leading-snug font-light sm:text-base">
                                {t("yearsLabel")}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center">
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
                            <span className="font-script text-[28px] leading-none text-primary sm:text-[32px]">
                                {t("eyebrow")}
                            </span>
                        </p>

                        <h2
                            id="about-heading"
                            className="mt-4 text-[28px] leading-tight font-bold tracking-[-2%] text-primary sm:text-4xl lg:text-[42px]"
                        >
                            {t("title")}
                        </h2>

                        <div className="mt-5 space-y-4 text-sm leading-relaxed text-primary/70 sm:text-base">
                            {paragraphs.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </div>

                        <div
                            aria-hidden
                            className="my-7 border-t border-dotted border-[#C4A862]/70 sm:my-8"
                        />

                        <ul className="space-y-3.5 sm:space-y-4">
                            {highlights.map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#C4A862]">
                                        <svg
                                            viewBox="0 0 12 12"
                                            fill="none"
                                            aria-hidden
                                            className="size-2.5"
                                        >
                                            <path
                                                d="M2.5 6.2 5 8.7 9.5 3.8"
                                                stroke="white"
                                                strokeWidth="1.6"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </span>
                                    <span className="text-sm leading-snug text-primary sm:text-base">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <Button
                            variant="secondary"
                            href="/about"
                            className="mt-8 w-fit self-start rounded-lg px-10 py-3.5 sm:mt-10"
                        >
                            {tCommon("readMore")}
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
