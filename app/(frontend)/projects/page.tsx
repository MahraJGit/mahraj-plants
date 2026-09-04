import type { Metadata } from "next";
import ProjectsHero from "@/app/components/sections/projects/ProjectsHero";
import ProjectsStandards from "@/app/components/sections/projects/ProjectsStandards";
import ProjectsGrid from "@/app/components/sections/projects/ProjectsGrid";
import LogoMarquee from "@/app/components/sections/home/LogoMarquee";
import Consultation from "@/app/components/sections/home/Consultation";

export const metadata: Metadata = {
    title: "Projects | Mahraj Plants",
    description:
        "Browse completed Mahraj Plants landscaping projects — garden redesigns, rooftop retreats, lighting schemes, and productive urban terraces.",
};

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
