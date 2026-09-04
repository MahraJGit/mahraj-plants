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

    if (!project) {
        return { title: "Project Not Found | Mahraj Plants" };
    }

    return {
        title: `${project.title} | Mahraj Plants`,
        description: project.description,
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
            <ProjectDetailGallery images={project.gallery} />
            <ProjectDetailContent project={project} />
            <RelatedProjects projects={related} />
            <SiteCTA />
        </>
    );
}
