import type { Metadata } from "next";
import ProjectsHero from "@/app/components/sections/projects/ProjectsHero";
import ProjectsStandards from "@/app/components/sections/projects/ProjectsStandards";
import ProjectsGrid from "@/app/components/sections/projects/ProjectsGrid";
import LogoMarquee from "@/app/components/sections/home/LogoMarquee";
import Consultation from "@/app/components/sections/home/Consultation";
import JsonLd from "@/app/components/seo/JsonLd";
import { getProjectsMessages } from "@/app/lib/i18n/projects-catalog";
import { getDictionary } from "@/app/lib/i18n/get-dictionary";
import { getLocale } from "@/app/lib/i18n/get-locale";
import {
    breadcrumbJsonLd,
    graphJsonLd,
    organizationJsonLd,
    webPageJsonLd,
    websiteJsonLd,
} from "@/app/lib/seo/json-ld";
import { buildPageMetadata } from "@/app/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getLocale();
    const messages = getProjectsMessages(locale);

    return buildPageMetadata({
        title: messages.detail.pageMetaTitle,
        description: messages.detail.pageMetaDescription,
        path: "/projects",
        locale,
        image: "/images/home/hero-bg-2.jpg",
    });
}

export default async function ProjectsPage() {
    const locale = await getLocale();
    const dictionary = await getDictionary(locale);
    const messages = getProjectsMessages(locale);

    return (
        <>
            <JsonLd
                data={graphJsonLd(
                    organizationJsonLd(),
                    websiteJsonLd(),
                    webPageJsonLd({
                        title: messages.detail.pageMetaTitle,
                        description: messages.detail.pageMetaDescription,
                        path: "/projects",
                    }),
                    breadcrumbJsonLd([
                        { name: dictionary.nav.home, path: "/" },
                        { name: dictionary.nav.projects, path: "/projects" },
                    ]),
                )}
            />
            <ProjectsHero />
            <ProjectsStandards />
            <ProjectsGrid />
            <LogoMarquee />
            <Consultation />
        </>
    );
}
