"use client";

import Image from "next/image";
import Link from "next/link";
import FeatureHighlights from "@/app/components/ui/FeatureHighlights";
import Reveal from "@/app/components/ui/Reveal";
import {
    getProjectsMessages,
    localizeProject,
    localizeProjectHighlights,
    useLocale,
} from "@/app/lib/i18n";
import { projectHighlights, type ProjectDetail } from "@/app/lib/projects";

type ProjectDetailHeroProps = {
    project: ProjectDetail;
};

export default function ProjectDetailHero({ project }: ProjectDetailHeroProps) {
    const { locale } = useLocale();
    const messages = getProjectsMessages(locale);
    const localized = localizeProject(project, locale);
    const highlights = localizeProjectHighlights(projectHighlights, locale);

    return (
        <section
            aria-labelledby="project-detail-heading"
            className="relative isolate flex min-h-[32rem] w-full flex-col overflow-visible sm:min-h-[36rem] lg:min-h-[40rem]"
        >
            <div className="relative isolate flex min-h-[26rem] flex-1 flex-col overflow-hidden sm:min-h-[30rem]">
                <Image
                    src={localized.image}
                    alt=""
                    fill
                    sizes="100vw"
                    priority
                    className="object-cover will-change-transform hero-zoom-in"
                    aria-hidden
                />
                <div aria-hidden className="absolute inset-0 bg-primary/55" />

                <div className="hero-content relative z-10 my-auto w-full pb-8 sm:pb-10">
                    <div className="hero-copy-in mx-auto w-full max-w-4xl px-6 text-center sm:px-10">
                        <nav
                            aria-label="Breadcrumb"
                            className="flex items-center justify-center gap-2 text-xs text-white/75 sm:text-sm"
                        >
                            <Link
                                href="/projects"
                                className="transition hover:text-secondary"
                            >
                                {messages.detail.breadcrumb}
                            </Link>
                            <span aria-hidden>/</span>
                            <span className="text-secondary">
                                {localized.category}
                            </span>
                        </nav>

                        <h1
                            id="project-detail-heading"
                            className="mt-4 text-balance"
                        >
                            {localized.title}
                        </h1>

                        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base lg:text-lg">
                            {localized.heroDescription}
                        </p>
                    </div>
                </div>
            </div>

            <div className="relative z-20 -mt-16 sm:-mt-20">
                <div className="section-container overflow-visible pt-0">
                    <Reveal>
                        <FeatureHighlights items={highlights} />
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
