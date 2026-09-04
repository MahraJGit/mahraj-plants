import Image from "next/image";
import Link from "next/link";
import { cn } from "@/app/lib/utils";

export type PortfolioProject = {
    slug?: string;
    title: string;
    description: string;
    image: string;
    alt: string;
    tags: string[];
    client: string;
    address: string;
};

type PortfolioCardProps = {
    project: PortfolioProject;
    href?: string;
    className?: string;
};

export default function PortfolioCard({
    project,
    href = "#",
    className,
}: PortfolioCardProps) {
    return (
        <article
            className={cn(
                "group relative h-[370px] w-[440px] max-w-[85vw] shrink-0 overflow-hidden rounded-[1.75rem]",
                className,
            )}
        >
            <Image
                src={project.image}
                alt={project.alt}
                fill
                sizes="440px"
                className="object-cover"
            />

            <Link
                href={href}
                aria-label={`View ${project.title}`}
                className={cn(
                    "absolute top-4 right-4 z-20 flex size-10 items-center justify-center rounded-full bg-white text-primary opacity-0 shadow-md transition-all duration-500 ease-out motion-reduce:transition-none",
                    "pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 group-hover:scale-105",
                    "group-focus-within:pointer-events-auto group-focus-within:opacity-100",
                )}
            >
                <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden
                    className="size-4"
                >
                    <path
                        d="M5 11 11 5M11 5H6M11 5v5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </Link>

            <div
                className={cn(
                    "absolute inset-x-0 bottom-0 z-10 translate-y-6 bg-gradient-to-t from-primary via-primary/95 to-transparent px-5 pb-5 pt-16 opacity-0 transition-all duration-500 ease-out motion-reduce:transition-none",
                    "group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100",
                )}
            >
                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full border border-secondary/50 bg-secondary/15 px-2.5 py-0.5 text-[11px] font-medium text-white"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <h3 className="mt-2.5 text-base font-bold leading-snug text-white">
                    {project.title}
                </h3>

                <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-white/80">
                    {project.description}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-white/85">
                    <span className="inline-flex items-center gap-1">
                        <svg
                            viewBox="0 0 16 16"
                            fill="none"
                            aria-hidden
                            className="size-3 shrink-0"
                        >
                            <path
                                d="M8 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM3 13.5c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5"
                                stroke="currentColor"
                                strokeWidth="1.3"
                                strokeLinecap="round"
                            />
                        </svg>
                        {project.client}
                    </span>
                    <span className="inline-flex items-center gap-1">
                        <svg
                            viewBox="0 0 16 16"
                            fill="none"
                            aria-hidden
                            className="size-3 shrink-0"
                        >
                            <path
                                d="M8 1.5 2.5 5.2V10c0 3 2.4 5.8 5.5 6.5 3.1-.7 5.5-3.5 5.5-6.5V5.2L8 1.5Z"
                                stroke="currentColor"
                                strokeWidth="1.3"
                                strokeLinejoin="round"
                            />
                        </svg>
                        {project.address}
                    </span>
                </div>
            </div>
        </article>
    );
}
