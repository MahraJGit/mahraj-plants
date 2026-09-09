import Image from "next/image";
import Link from "next/link";
import { cn } from "@/app/lib/utils";

export type Category = {
    title: string;
    image: string;
    alt: string;
    tagline: string;
    href: string;
};

type CategoryCardProps = {
    category: Category;
    className?: string;
};

export default function CategoryCard({
    category,
    className,
}: CategoryCardProps) {
    return (
        <Link
            href={category.href}
            className={cn(
                "group flex flex-col items-center text-center outline-none",
                className,
            )}
        >
            <div className="relative">
                <div
                    aria-hidden
                    className="absolute inset-0 scale-110 rounded-full bg-secondary/15 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
                />

                <div
                    className={cn(
                        "relative size-32 overflow-hidden rounded-full border-4 border-white shadow-[0_8px_30px_rgba(10,37,14,0.12)] transition-transform duration-500 ease-out sm:size-36 lg:size-40",
                        "ring-2 ring-transparent ring-offset-2 ring-offset-white",
                        "group-hover:scale-[1.04] group-hover:ring-secondary/40 group-focus-visible:scale-[1.04] group-focus-visible:ring-secondary/40",
                    )}
                >
                    <Image
                        src={category.image}
                        alt={category.alt}
                        fill
                        sizes="(max-width: 640px) 40vw, (max-width: 1024px) 25vw, 160px"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-focus-visible:scale-110"
                    />
                    <div className="absolute inset-0 bg-primary/0 transition-colors duration-300 group-hover:bg-primary/15 group-focus-visible:bg-primary/15" />
                </div>
            </div>

            <h3 className="mt-5 text-sm font-medium text-secondary transition-colors duration-300 group-hover:text-primary sm:text-base lg:text-lg lg:h-13">
                {category.title}
            </h3>

            <p className="mt-2 max-w-[14rem] text-xs leading-relaxed text-primary/55 opacity-0 transition-all duration-300 group-hover:max-h-20 group-hover:opacity-100 group-focus-visible:max-h-20 group-focus-visible:opacity-100 [@media(hover:none)]:max-h-20 [@media(hover:none)]:opacity-100 sm:text-sm">
                {category.tagline}
            </p>

            <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100">
                View collection
                <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden
                    className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5"
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
    );
}
