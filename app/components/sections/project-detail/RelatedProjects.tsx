"use client";

import Link from "next/link";
import { ProjectCard, Reveal } from "@/app/components/ui";
import {
    getProjectsMessages,
    localizeProjects,
    useLocale,
} from "@/app/lib/i18n";
import type { ProjectDetail } from "@/app/lib/projects";

type RelatedProjectsProps = {
    projects: ProjectDetail[];
};

export default function RelatedProjects({ projects }: RelatedProjectsProps) {
    const { locale } = useLocale();
    const messages = getProjectsMessages(locale);
    const localizedProjects = localizeProjects(projects, locale);

    if (localizedProjects.length === 0) return null;

    return (
        <section
            aria-labelledby="related-projects-heading"
            className="relative isolate overflow-hidden bg-primary"
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[48px_48px]"
            />

            <div className="section-container relative">
                <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
                    <div className="max-w-2xl">
                        <p className="font-script text-[28px] leading-none text-secondary sm:text-[32px]">
                            {messages.detail.relatedEyebrow}
                        </p>

                        <h2
                            id="related-projects-heading"
                            className="mt-3 text-[26px] leading-[1.15] font-bold tracking-[-2%] text-white sm:text-3xl lg:text-[38px]"
                        >
                            {messages.detail.relatedTitle}
                        </h2>
                    </div>

                    <Link
                        href="/projects"
                        className="w-fit shrink-0 rounded-lg bg-secondary px-8 py-3.5 text-base font-medium leading-[100%] tracking-[-1%] text-white transition-colors hover:bg-secondary/90"
                    >
                        {messages.detail.viewAll}
                    </Link>
                </Reveal>

                <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-7">
                    {localizedProjects.map((project, index) => (
                        <Reveal key={project.slug} as="li" delayMs={index * 80}>
                            <ProjectCard
                                project={project}
                                href={`/projects/${project.slug}`}
                            />
                        </Reveal>
                    ))}
                </ul>
            </div>
        </section>
    );
}
