import type { Locale } from "./config";
import type { ProjectDetail, ProjectFilter } from "@/app/lib/projects";
import projectsEn from "@/messages/projects.en.json";
import projectsAr from "@/messages/projects.ar.json";

export type ProjectsMessages = typeof projectsEn;

type ProjectCopy = ProjectsMessages["soft-greens-city-views"];

const catalogs: Record<Locale, ProjectsMessages> = {
    en: projectsEn,
    ar: projectsAr as ProjectsMessages,
};

const PROJECT_SLUGS = [
    "soft-greens-city-views",
    "stone-path-garden-revival",
    "trellis-vine-sanctuary",
    "urban-farming-terrace",
    "illuminated-garden-walkway",
    "corporate-green-entrance",
] as const;

export type ProjectSlug = (typeof PROJECT_SLUGS)[number];

function isProjectSlug(value: string): value is ProjectSlug {
    return (PROJECT_SLUGS as readonly string[]).includes(value);
}

export function getProjectsMessages(locale: Locale): ProjectsMessages {
    return catalogs[locale] ?? catalogs.en;
}

export function getProjectCopy(
    slug: string,
    locale: Locale,
): ProjectCopy | undefined {
    if (!isProjectSlug(slug)) return undefined;
    return getProjectsMessages(locale)[slug];
}

export function localizeProject(
    project: ProjectDetail,
    locale: Locale,
): ProjectDetail {
    const copy = getProjectCopy(project.slug, locale);
    if (!copy) return project;

    return {
        ...project,
        title: copy.title,
        category: copy.category,
        description: copy.description,
        heroDescription: copy.heroDescription,
        alt: copy.alt,
        tags: [...copy.tags],
        client: copy.client,
        address: copy.address,
        overviewTitle: copy.overviewTitle,
        overviewBody: [...copy.overviewBody],
        scopeTitle: copy.scopeTitle,
        scopeDescription: copy.scopeDescription,
        scopeItems: [...copy.scopeItems],
        approachTitle: copy.approachTitle,
        approachDescription: copy.approachDescription,
        approachSteps: copy.approachSteps.map((step, index) => ({
            number:
                step.number ||
                project.approachSteps[index]?.number ||
                `${index + 1}`.padStart(2, "0"),
            title: step.title,
            description: step.description,
        })),
        results: copy.results.map((result, index) => ({
            value: result.value || project.results[index]?.value || "",
            label: result.label,
        })),
        meta: copy.meta.map((item) => ({
            label: item.label,
            value: item.value,
        })),
        testimonial: {
            quote: copy.testimonial.quote,
            name: copy.testimonial.name,
            role: copy.testimonial.role,
        },
        gallery: project.gallery.map((image, index) => ({
            ...image,
            alt: copy.galleryAlts[index] ?? image.alt,
        })),
    };
}

export function localizeProjects(
    items: ProjectDetail[],
    locale: Locale,
): ProjectDetail[] {
    return items.map((project) => localizeProject(project, locale));
}

export function localizeProjectHighlights<
    T extends { title: string; description: string },
>(items: T[], locale: Locale): T[] {
    const highlights = getProjectsMessages(locale).highlights;
    return items.map((item, index) => ({
        ...item,
        title: highlights[index]?.title ?? item.title,
        description: highlights[index]?.description ?? item.description,
    }));
}

export function localizeProjectFeatureLabels(
    items: { icon: string; label: string }[],
    labels: string[],
) {
    return items.map((item, index) => ({
        ...item,
        label: labels[index] ?? item.label,
    }));
}

export function localizeProjectFilterLabel(
    filter: ProjectFilter | string,
    locale: Locale,
): string {
    const labels = getProjectsMessages(locale).filters;
    return labels[filter as keyof typeof labels] ?? filter;
}
