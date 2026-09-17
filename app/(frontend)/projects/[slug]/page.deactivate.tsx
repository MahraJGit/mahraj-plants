import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetailHero from "@/app/components/sections/project-detail/ProjectDetailHero";
import ProjectDetailGallery from "@/app/components/sections/project-detail/ProjectDetailGallery";
import ProjectDetailContent from "@/app/components/sections/project-detail/ProjectDetailContent";
import RelatedProjects from "@/app/components/sections/project-detail/RelatedProjects";
import SiteCTA from "@/app/components/sections/shared/SiteCTA";
import JsonLd from "@/app/components/seo/JsonLd";
import {
    getAllProjectSlugs,
    getProjectBySlug,
    getRelatedProjects,
} from "@/app/lib/projects";
import { getDictionary } from "@/app/lib/i18n/get-dictionary";
import {
    getProjectsMessages,
    localizeProject,
} from "@/app/lib/i18n/projects-catalog";
import { getLocale } from "@/app/lib/i18n/get-locale";
import {
    breadcrumbJsonLd,
    graphJsonLd,
    organizationJsonLd,
    projectJsonLd,
    webPageJsonLd,
    websiteJsonLd,
} from "@/app/lib/seo/json-ld";
import { buildPageMetadata } from "@/app/lib/seo/metadata";

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
        return { title: messages.detail.notFoundTitle, robots: { index: false } };
    }

    const localized = localizeProject(project, locale);

    return buildPageMetadata({
        title: messages.detail.metaTitle.replace("{project}", localized.title),
        description: localized.description,
        path: `/projects/${slug}`,
        locale,
        image: localized.image,
        imageAlt: localized.alt,
    });
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
    const locale = await getLocale();
    const dictionary = await getDictionary(locale);
    const messages = getProjectsMessages(locale);
    const localized = localizeProject(project, locale);
    const title = messages.detail.metaTitle.replace("{project}", localized.title);

    return (
        <>
            <JsonLd
                data={graphJsonLd(
                    organizationJsonLd(),
                    websiteJsonLd(),
                    webPageJsonLd({
                        title,
                        description: localized.description,
                        path: `/projects/${slug}`,
                    }),
                    projectJsonLd(localized),
                    breadcrumbJsonLd([
                        { name: dictionary.nav.home, path: "/" },
                        { name: dictionary.nav.projects, path: "/projects" },
                        { name: localized.title, path: `/projects/${slug}` },
                    ]),
                )}
            />
            <ProjectDetailHero project={project} />
            <ProjectDetailGallery project={project} />
            <ProjectDetailContent project={project} />
            <RelatedProjects projects={related} />
            <SiteCTA />
        </>
    );
}
