import Image from "next/image";
import { cn } from "@/app/lib/utils";

export type Service = {
    title: string;
    description: string;
    image: string;
    alt: string;
    features: string[];
};

type ServiceCardProps = {
    service: Service;
    href?: string;
    className?: string;
};

function ArrowBullet() {
    return (
        <svg
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden
            className="mt-0.5 size-3 shrink-0 text-[#C4A862]"
        >
            <path
                d="M2 6h8M7 3l3 3-3 3"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default function ServiceCard({
    service,
    href = "#",
    className,
}: ServiceCardProps) {
    return (
        <article
            className={cn(
                "flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-[0_16px_48px_rgba(0,0,0,0.18)]",
                className,
            )}
        >
            <div className="relative m-4 mb-0 aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                />
            </div>

            <div className="flex flex-1 flex-col px-6 pb-6 pt-5 sm:px-7 sm:pb-7 sm:pt-6">
                <h3 className="text-lg font-bold leading-snug text-primary sm:text-xl">
                    {service.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-primary/70 sm:text-[15px]">
                    {service.description}
                </p>

                <ul className="mt-5 space-y-2.5">
                    {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5">
                            <ArrowBullet />
                            <span className="text-sm leading-snug text-primary/80">
                                {feature}
                            </span>
                        </li>
                    ))}
                </ul>

                <div className="mt-auto border-t border-dashed border-primary/20 pt-5">
                    <a
                        href={href}
                        className="group flex items-center justify-between gap-4 outline-none"
                    >
                        <span className="text-sm font-medium text-primary transition-colors group-hover:text-secondary group-focus-visible:text-secondary">
                            Read More
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
                    </a>
                </div>
            </div>
        </article>
    );
}
