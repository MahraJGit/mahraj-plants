import Image from "next/image";
import Link from "next/link";
import { cn } from "@/app/lib/utils";

export type Service = {
    slug?: string;
    title: string;
    description: string;
    image: string;
    alt: string;
    icon?: string;
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
                "group/card overflow-hidden rounded-[1.75rem] bg-white shadow-[0_16px_48px_rgba(0,0,0,0.18)]",
                className,
            )}
        >
            <Link
                href={href}
                className="flex h-full flex-col outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
            >
                <div className="relative m-4 mb-0 aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image
                        src={service.image}
                        alt={service.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-105 motion-reduce:transition-none motion-reduce:group-hover/card:scale-100"
                    />
                    {service.icon && (
                        <div className="absolute bottom-3 right-3 flex size-11 items-center justify-center rounded-xl bg-primary shadow-md sm:size-12">
                            <Image
                                src={service.icon}
                                alt=""
                                width={24}
                                height={24}
                                unoptimized
                                style={{ width: "auto", height: "auto" }}
                                className="h-6 w-auto brightness-0 invert"
                            />
                        </div>
                    )}
                </div>

                <div className="flex flex-1 flex-col bg-gradient-to-b from-secondary/5 to-white px-6 pb-6 pt-5 sm:px-7 sm:pb-7 sm:pt-6">
                    <h3 className="text-lg font-bold md:h-12 leading-snug text-primary sm:text-xl">
                        {service.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-primary/70 sm:text-[15px] lg:h-20">
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

                    <div className="mt-2 border-t border-dashed border-primary/20 pt-5">
                        <div className="flex items-center justify-between gap-4">
                            <span className="text-sm font-medium text-primary transition-colors group-hover/card:text-secondary">
                                Read More
                            </span>
                            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-white transition-transform group-hover/card:scale-105 rtl:rotate-180">
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
                        </div>
                    </div>
                </div>
            </Link>
        </article>
    );
}