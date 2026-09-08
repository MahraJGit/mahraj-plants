"use client";

import Image from "next/image";
import { useMemo } from "react";
import { ProcessCard, type ProcessStep } from "@/app/components/ui";
import { useTranslations } from "@/app/lib/i18n";

const stepMeta = [
    { number: "01", icon: "/icons/consultation.svg" },
    { number: "02", icon: "/icons/execution.svg" },
    { number: "03", icon: "/icons/expert-team.svg" },
    { number: "04", icon: "/icons/reliable.svg" },
];

type StepCopy = {
    title: string;
    description: string;
};

export default function Process() {
    const { t, tObject, locale } = useTranslations("home.process");

    const steps = useMemo(() => {
        const copy = tObject<StepCopy[]>("steps");
        if (!Array.isArray(copy)) return [] as ProcessStep[];

        return copy.map((step, index) => ({
            number: stepMeta[index].number,
            title: step.title,
            description: step.description,
            icon: stepMeta[index].icon,
        }));
    }, [tObject, locale]);

    return (
        <section
            id="process"
            aria-labelledby="process-heading"
            className="relative isolate overflow-hidden bg-section"
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[48px_48px]"
            />

            <div className="section-container relative">
                <header className="max-w-3xl">
                    <p className="flex items-center gap-2">
                        <Image
                            src="/icons/singleLeaf.svg"
                            alt=""
                            width={14}
                            height={21}
                            unoptimized
                            style={{ width: "auto", height: "auto" }}
                            className="h-5 w-auto shrink-0"
                        />
                        <span className="font-script text-[28px] leading-none text-secondary sm:text-[32px]">
                            {t("eyebrow")}
                        </span>
                    </p>

                    <h2
                        id="process-heading"
                        className="mt-4 text-[28px] leading-[1.15] font-bold tracking-[-2%] text-white sm:text-4xl lg:text-[42px]"
                    >
                        {t("title")}
                    </h2>

                    <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
                        {t("description")}
                    </p>
                </header>

                <div className="mt-12 hidden items-center justify-center gap-2 xl:mt-14 xl:flex xl:gap-3">
                    {steps.map((step, index) => (
                        <div key={step.number} className="contents">
                            <ProcessCard
                                step={step}
                                className="max-w-[16.5rem]"
                            />
                            {index < steps.length - 1 && (
                                <div className="flex w-10 shrink-0 items-center justify-center xl:w-12">
                                    <Image
                                        src="/icons/process-arrow.svg"
                                        alt=""
                                        width={56}
                                        height={32}
                                        unoptimized
                                        style={{ width: "auto", height: "auto" }}
                                        className="mx-auto w-12 xl:w-14 rtl:rotate-180"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-12 hidden gap-8 sm:grid sm:grid-cols-2 xl:hidden">
                    {steps.map((step) => (
                        <ProcessCard
                            key={step.number}
                            step={step}
                            className="max-w-[16.5rem]"
                        />
                    ))}
                </div>

                <div className="mt-12 flex flex-col items-center gap-8 sm:hidden">
                    {steps.map((step) => (
                        <ProcessCard
                            key={step.number}
                            step={step}
                            className="max-w-[16.5rem]"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
