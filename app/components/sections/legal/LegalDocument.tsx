"use client";

import { useTranslations } from "@/app/lib/i18n";

type LegalSection = {
    title: string;
    paragraphs?: string[];
    bullets?: string[];
    lines?: string[];
    boxed?: boolean;
};

type LegalDocumentProps = {
    namespace: "privacyPage" | "termsPage";
};

export default function LegalDocument({ namespace }: LegalDocumentProps) {
    const { t, tObject } = useTranslations(namespace);
    const sections = tObject<LegalSection[]>("sections") ?? [];

    return (
        <section
            aria-labelledby={`${namespace}-document-heading`}
            className="bg-cream/40"
        >
            <div className="section-container py-14 sm:py-16 lg:py-20">
                <article className="mx-auto max-w-3xl">
                    <h2 id={`${namespace}-document-heading`} className="sr-only">
                        {t("hero.title")}
                    </h2>

                    <p className="text-base leading-relaxed text-primary/80 sm:text-lg">
                        {t("intro")}
                    </p>

                    <p className="mt-4 text-sm font-medium text-primary/55">
                        {t("lastUpdated")}
                    </p>

                    <div className="mt-12 space-y-10">
                        {sections.map((section) => (
                            <section key={section.title}>
                                <h3 className="text-xl font-bold tracking-[-0.02em] text-primary sm:text-2xl">
                                    {section.title}
                                </h3>

                                {section.paragraphs?.map((paragraph) => (
                                    <p
                                        key={paragraph}
                                        className="mt-4 text-[15px] leading-relaxed text-primary/75 sm:text-base"
                                    >
                                        {paragraph}
                                    </p>
                                ))}

                                {section.bullets && section.bullets.length > 0 ? (
                                    <ul className="mt-4 list-disc space-y-2 ps-5 text-[15px] leading-relaxed text-primary/75 sm:text-base">
                                        {section.bullets.map((item) => (
                                            <li key={item}>{item}</li>
                                        ))}
                                    </ul>
                                ) : null}

                                {section.lines && section.lines.length > 0 ? (
                                    <div
                                        className={
                                            section.boxed
                                                ? "mt-5 space-y-1.5 rounded-2xl bg-primary px-6 py-6 text-[15px] leading-relaxed text-white sm:px-8 sm:py-7 sm:text-base"
                                                : "mt-4 space-y-1.5 text-[15px] leading-relaxed text-primary/75 sm:text-base"
                                        }
                                    >
                                        {section.lines.map((line, index) => (
                                            <p
                                                key={line}
                                                dir="auto"
                                                className={
                                                    section.boxed && index === 0
                                                        ? "font-semibold text-white"
                                                        : section.boxed
                                                          ? "text-white/85"
                                                          : undefined
                                                }
                                            >
                                                {line}
                                            </p>
                                        ))}
                                    </div>
                                ) : null}
                            </section>
                        ))}
                    </div>
                </article>
            </div>
        </section>
    );
}
