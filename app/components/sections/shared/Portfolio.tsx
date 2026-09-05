"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { PortfolioCard } from "@/app/components/ui";
import { useTranslations } from "@/app/lib/i18n";
import {
    projectFilters as filters,
    projects,
    type ProjectFilter,
} from "@/app/lib/projects";
import { cn } from "@/app/lib/utils";

const CARD_HEIGHT = 370;

type PortfolioProps = {
    variant?: "white" | "cream";
};

export default function Portfolio({ variant = "white" }: PortfolioProps) {
    const { t } = useTranslations("home.portfolio");
    const { t: tCommon } = useTranslations("common");
    const [filter, setFilter] = useState<ProjectFilter>("All");

    const filteredProjects = useMemo(() => {
        if (filter === "All") return projects;
        return projects.filter((project) => project.tags.includes(filter));
    }, [filter]);

    const marqueeProjects = useMemo(
        () => [...filteredProjects, ...filteredProjects],
        [filteredProjects],
    );

    return (
        <section
            id="portfolio"
            aria-labelledby="portfolio-heading"
            className={cn(
                "overflow-hidden",
                variant === "cream" ? "bg-cream/40" : "bg-white",
            )}
        >
            <div className="section-container">
                <header className="mx-auto max-w-4xl text-center">
                    <p className="flex items-center justify-center gap-2">
                        <Image
                            src="/icons/singleLeaf.svg"
                            alt=""
                            width={14}
                            height={21}
                            unoptimized
                            className="h-5 w-auto shrink-0"
                            aria-hidden
                        />
                        <span className="font-script text-[28px] leading-none text-secondary sm:text-[32px]">
                            {t("eyebrow")}
                        </span>
                    </p>

                    <h2
                        id="portfolio-heading"
                        className="mt-4 text-[28px] leading-[1.15] font-bold tracking-[-2%] text-primary sm:text-4xl lg:text-[42px]"
                    >
                        {t("title")}
                    </h2>

                    <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-primary/65 sm:text-base">
                        {t("description")}
                    </p>
                </header>

                <div className="mt-10 flex flex-col gap-5 lg:mt-12 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex flex-wrap gap-2.5 sm:gap-3">
                        {filters.map((item) => {
                            const isActive = filter === item;

                            return (
                                <button
                                    key={item}
                                    type="button"
                                    onClick={() => setFilter(item)}
                                    className={cn(
                                        "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors sm:px-5 sm:py-2.5",
                                        isActive
                                            ? "border-primary bg-primary text-white"
                                            : "border-primary/15 bg-white text-primary hover:border-primary/30",
                                    )}
                                >
                                    {t(`filters.${item}`)}
                                </button>
                            );
                        })}
                    </div>

                    <Link
                        href="/projects"
                        className="w-fit shrink-0 self-start rounded-lg bg-secondary px-7 py-3 text-base font-medium leading-[100%] tracking-[-1%] text-white transition-colors hover:bg-secondary/90 lg:self-auto"
                    >
                        {tCommon("viewAllProjects")}
                    </Link>
                </div>
            </div>

            {filteredProjects.length > 0 ? (
                <div
                    className="relative left-1/2 mt-10 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden lg:mt-12"
                    style={{ height: CARD_HEIGHT }}
                    aria-label={t("ariaLabel")}
                    dir="ltr"
                >
                    <div
                        key={filter}
                        className="portfolio-marquee-track flex w-max gap-6"
                    >
                        {marqueeProjects.map((project, index) => (
                            <PortfolioCard
                                key={`${project.slug}-${index}`}
                                project={project}
                                href={`/projects/${project.slug}`}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <p className="py-16 text-center text-primary/60">
                    No projects found for this category.
                </p>
            )}
        </section>
    );
}
