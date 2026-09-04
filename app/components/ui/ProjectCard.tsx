import Image from "next/image";
import Link from "next/link";
import { cn } from "@/app/lib/utils";
import type { PortfolioProject } from "./PortfolioCard";

type ProjectCardProps = {
    project: PortfolioProject;
    href?: string;
    className?: string;
};

function ClientIcon() {
    return (
        <svg
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden
            className="size-3.5 shrink-0 text-secondary"
        >
            <path
                d="M8 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM3 13.5c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
            />
        </svg>
    );
}

function LocationIcon() {
    return (
        <svg
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden
            className="size-3.5 shrink-0 text-secondary"
        >
            <path
                d="M8 1.5 2.5 5.2V10c0 3 2.4 5.8 5.5 6.5 3.1-.7 5.5-3.5 5.5-6.5V5.2L8 1.5Z"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default function ProjectCard({
    project,
    href = "#",
    className,
}: ProjectCardProps) {
    return (
        <article
            className={cn(
                "group/card flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-[0_16px_48px_rgba(0,0,0,0.18)]",
                className,
            )}
        >
            <div className="relative m-4 mb-0 aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-105 motion-reduce:transition-none motion-reduce:group-hover/card:scale-100"
                />

                <div className="absolute inset-x-3 bottom-3 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-primary/85 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex flex-1 flex-col bg-gradient-to-b from-secondary/5 to-white px-6 pb-6 pt-5 sm:px-7 sm:pb-7 sm:pt-6">
                <h3 className="text-lg font-bold leading-snug text-primary sm:text-xl">
                    {project.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-primary/70 sm:text-[15px]">
                    {project.description}
                </p>

                <ul className="mt-5 space-y-2.5">
                    <li className="flex items-start gap-2.5">
                        <ClientIcon />
                        <span className="text-sm leading-snug text-primary/80">
                            {project.client}
                        </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                        <LocationIcon />
                        <span className="text-sm leading-snug text-primary/80">
                            {project.address}
                        </span>
                    </li>
                </ul>

                <div className="mt-auto border-t border-dashed border-primary/20 pt-5">
                    <Link
                        href={href}
                        className="group flex items-center justify-between gap-4 outline-none"
                    >
                        <span className="text-sm font-medium text-primary transition-colors group-hover:text-secondary group-focus-visible:text-secondary">
                            View Project
                        </span>
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-white transition-transform group-hover:scale-105 group-focus-visible:scale-105">
                            <svg
                                viewBox="0 0 16 16"
                                fill="none"
                                aria-hidden
                                className="size-3.5"
                            >
                                <path
                                    d="M3 8h10M9 4l4 4-4 4"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                    </Link>
                </div>
            </div>
        </article>
    );
}
