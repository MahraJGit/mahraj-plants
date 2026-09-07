import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetailHero from "@/app/components/sections/project-detail/ProjectDetailHero";
import ProjectDetailGallery from "@/app/components/sections/project-detail/ProjectDetailGallery";
import ProjectDetailContent from "@/app/components/sections/project-detail/ProjectDetailContent";
import RelatedProjects from "@/app/components/sections/project-detail/RelatedProjects";
import SiteCTA from "@/app/components/sections/shared/SiteCTA";
import {
    getAllProjectSlugs,
    getProjectBySlug,
    getRelatedProjects,
} from "@/app/lib/projects";
import {
    getProjectsMessages,
    localizeProject,
} from "@/app/lib/i18n/projects-catalog";
import { getLocale } from "@/app/lib/i18n/get-locale";

type ProjectDetailPageProps = {
    params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
    return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: ProjectDetailPageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = getProjectBySlug(slug);
    const locale = await getLocale();
    const messages = getProjectsMessages(locale);

    if (!project) {
        return { title: messages.detail.notFoundTitle };
    }

    const localized = localizeProject(project, locale);

    return {
        title: messages.detail.metaTitle.replace("{project}", localized.title),
        description: localized.description,
    };
}

export default async function ProjectDetailPage({
    params,
}: ProjectDetailPageProps) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    const related = getRelatedProjects(project);

    return (
        <>
            <ProjectDetailHero project={project} />
            <ProjectDetailGallery project={project} />
            <ProjectDetailContent project={project} />
            <RelatedProjects projects={related} />
            <SiteCTA />
        </>
    );
}
