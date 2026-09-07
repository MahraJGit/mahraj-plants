import type { Metadata } from "next";
import ProjectsHero from "@/app/components/sections/projects/ProjectsHero";
import ProjectsStandards from "@/app/components/sections/projects/ProjectsStandards";
import ProjectsGrid from "@/app/components/sections/projects/ProjectsGrid";
import LogoMarquee from "@/app/components/sections/home/LogoMarquee";
import Consultation from "@/app/components/sections/home/Consultation";
import { getProjectsMessages } from "@/app/lib/i18n/projects-catalog";
import { getLocale } from "@/app/lib/i18n/get-locale";

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getLocale();
    const messages = getProjectsMessages(locale);

    return {
        title: messages.detail.pageMetaTitle,
        description: messages.detail.pageMetaDescription,
    };
}

export default function ProjectsPage() {
    return (
        <>
            <ProjectsHero />
            <ProjectsStandards />
            <ProjectsGrid />
            <LogoMarquee />
            <Consultation />
        </>
    );
}
