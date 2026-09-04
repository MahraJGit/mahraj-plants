"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
    Button,
    PortfolioCard,
    type PortfolioProject,
} from "@/app/components/ui";
import { cn } from "@/app/lib/utils";

const filters = [
    "All",
    "Landscape Design",
    "Outdoor Lighting",
    "Rooftop Garden",
    "Urban Farming",
] as const;

type Filter = (typeof filters)[number];

const projects: PortfolioProject[] = [
    {
        title: "Soft Greens & Stunning City Views",
        description:
            "Striking building entrance with a lush vertical garden, integrated LED strips, and modern seating for a vibrant first impression.",
        image: "/images/home/hero-bg-2.jpg",
        alt: "City skyline viewed through lush rooftop greenery at dusk",
        tags: ["Landscape Design", "Outdoor Lighting"],
        client: "Westminster",
        address: "200 Parkside, London",
    },
    {
        title: "Stone Path Garden Revival",
        description:
            "A refreshed courtyard with natural stone pathways, layered planting beds, and drought-tolerant greenery for year-round appeal.",
        image: "/images/home/m-landscaping.webp",
        alt: "Landscaper laying stone pavers in a garden courtyard",
        tags: ["Landscape Design"],
        client: "Greenfield Estate",
        address: "14 Willow Lane, Manchester",
    },
    {
        title: "Trellis & Vine Sanctuary",
        description:
            "A rooftop retreat framed by wooden trellises, climbing vines, and soft ambient lighting for quiet evening gatherings.",
        image: "/images/home/m-outdoor.webp",
        alt: "Garden trellis covered in climbing vines and greenery",
        tags: ["Rooftop Garden"],
        client: "Skyline Residences",
        address: "88 Horizon Terrace, Birmingham",
    },
    {
        title: "Urban Farming Terrace",
        description:
            "Productive raised beds and herb gardens designed for city living, combining edible planting with elegant landscape structure.",
        image: "/images/home/m-trees.webp",
        alt: "Urban terrace garden with trees and raised planting beds",
        tags: ["Urban Farming", "Rooftop Garden"],
        client: "Harbor District",
        address: "5 Canal View, Bristol",
    },
    {
        title: "Illuminated Garden Walkway",
        description:
            "Warm pathway lighting woven through sculpted hedges and seasonal blooms, creating a welcoming route after sunset.",
        image: "/images/home/hero-bg-3.jpg",
        alt: "Garden walkway with professional landscape lighting at dusk",
        tags: ["Outdoor Lighting", "Landscape Design"],
        client: "Oakwood Manor",
        address: "31 Elm Grove, Leeds",
    },
    {
        title: "Corporate Green Entrance",
        description:
            "A polished office arrival experience with layered planters, native species, and low-maintenance irrigation for busy teams.",
        image: "/images/home/our-mission.webp",
        alt: "Corporate building entrance with landscaped green planters",
        tags: ["Landscape Design"],
        client: "Northgate Offices",
        address: "120 Commerce Road, London",
    },
];

const CARD_HEIGHT = 370;

export default function Portfolio() {
    const [filter, setFilter] = useState<Filter>("All");

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
            className="overflow-hidden bg-white"
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
                            Natural Green Plants
                        </span>
                    </p>

                    <h2
                        id="portfolio-heading"
                        className="mt-4 text-[28px] leading-[1.15] font-bold tracking-[-2%] text-primary sm:text-4xl lg:text-[42px]"
                    >
                        Our Latest Green Creations Just Finished!
                    </h2>

                    <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-primary/65 sm:text-base">
                        Explore a selection of our standout garden projects each one a
                        unique blend of thoughtful design, quality craftsmanship, and a
                        deep love for green spaces.
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
                                    {item}
                                </button>
                            );
                        })}
                    </div>

                    <Button
                        variant="secondary"
                        className="w-fit shrink-0 self-start rounded-lg px-7 py-3 lg:self-auto"
                    >
                        View All Projects
                    </Button>
                </div>
            </div>

            {filteredProjects.length > 0 ? (
                <div
                    className="relative left-1/2 mt-10 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden lg:mt-12"
                    style={{ height: CARD_HEIGHT }}
                    aria-label="Featured garden projects"
                >
                    <div
                        key={filter}
                        className="portfolio-marquee-track flex w-max gap-6"
                    >
                        {marqueeProjects.map((project, index) => (
                            <PortfolioCard
                                key={`${project.title}-${index}`}
                                project={project}
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
