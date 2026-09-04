"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
    HiChevronDown,
    HiChevronLeft,
    HiChevronRight,
} from "react-icons/hi";
import type { CategoryListingItem, PlantCategory } from "@/app/lib/categories";
import { cn } from "@/app/lib/utils";

type CategoryListingProps = {
    category: PlantCategory;
};

type SortOption = "default" | "name-asc" | "name-desc";

const PAGE_SIZE = 8;
const SORT_OPTIONS: { value: SortOption; label: string }[] = [
    { value: "default", label: "Default" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" },
];

function sortListings(
    items: CategoryListingItem[],
    sort: SortOption,
): CategoryListingItem[] {
    if (sort === "default") {
        return items;
    }

    const sorted = [...items].sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
    );

    return sort === "name-desc" ? sorted.reverse() : sorted;
}

function SortDropdown({
    value,
    onChange,
}: {
    value: SortOption;
    onChange: (value: SortOption) => void;
}) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedLabel =
        SORT_OPTIONS.find((option) => option.value === value)?.label ??
        "Default";

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="relative">
            <span className="mb-2 block text-xs font-medium tracking-wide text-primary/55 uppercase sm:mb-0 sm:sr-only">
                Sort by
            </span>

            <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => setOpen((current) => !current)}
                className="inline-flex min-w-[12.5rem] cursor-pointer items-center justify-between gap-3 rounded-full border border-primary/12 bg-white px-5 py-3 text-sm font-semibold text-primary shadow-[0_8px_24px_rgba(10,37,14,0.08)] transition hover:border-secondary/40 hover:shadow-[0_10px_28px_rgba(10,37,14,0.12)] focus-visible:border-secondary focus-visible:ring-2 focus-visible:ring-secondary/25 focus-visible:outline-none"
            >
                <span>{selectedLabel}</span>
                <HiChevronDown
                    aria-hidden
                    className={cn(
                        "size-4 shrink-0 text-secondary transition-transform duration-200",
                        open && "rotate-180",
                    )}
                />
            </button>

            {open && (
                <ul
                    role="listbox"
                    aria-label="Sort products"
                    className="absolute top-[calc(100%+0.5rem)] right-0 z-20 min-w-full overflow-hidden rounded-2xl border border-primary/10 bg-white py-1.5 shadow-[0_16px_40px_rgba(10,37,14,0.14)]"
                >
                    {SORT_OPTIONS.map((option) => {
                        const selected = option.value === value;

                        return (
                            <li key={option.value} role="option" aria-selected={selected}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        onChange(option.value);
                                        setOpen(false);
                                    }}
                                    className={cn(
                                        "flex w-full cursor-pointer items-center justify-between px-4 py-2.5 text-left text-sm transition hover:bg-cream/80",
                                        selected
                                            ? "font-semibold text-secondary"
                                            : "font-medium text-primary/80",
                                    )}
                                >
                                    {option.label}
                                    {selected && (
                                        <span
                                            aria-hidden
                                            className="size-1.5 rounded-full bg-secondary"
                                        />
                                    )}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

function CategoryProductCard({ item }: { item: CategoryListingItem }) {
    return (
        <Link
            href={`/products/${item.slug}`}
            className="group relative aspect-[4/5] min-h-[220px] block overflow-hidden rounded-[1.75rem] bg-white shadow-[0_12px_40px_rgba(10,37,14,0.08)] outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 sm:min-h-[260px] lg:min-h-[300px]"
        >
            <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105 group-focus-visible:scale-105"
            />

            <div
                className={cn(
                    "absolute inset-0 flex items-center justify-center bg-primary/55 px-6 text-center opacity-0 transition-opacity duration-300",
                    "group-hover:opacity-100 group-focus-visible:opacity-100",
                    "[@media(hover:none)]:opacity-100",
                )}
            >
                <h3 className="text-lg font-bold text-white sm:text-xl">
                    {item.name}
                </h3>
            </div>
        </Link>
    );
}

export default function CategoryListing({ category }: CategoryListingProps) {
    const [sort, setSort] = useState<SortOption>("default");
    const [page, setPage] = useState(1);

    const sortedListings = useMemo(
        () => sortListings(category.listings, sort),
        [category.listings, sort],
    );

    const totalProducts = sortedListings.length;
    const totalPages = Math.max(1, Math.ceil(totalProducts / PAGE_SIZE));

    useEffect(() => {
        setPage(1);
    }, [sort, category.slug]);

    useEffect(() => {
        if (page > totalPages) {
            setPage(totalPages);
        }
    }, [page, totalPages]);

    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = Math.min(startIndex + PAGE_SIZE, totalProducts);
    const visibleListings = sortedListings.slice(startIndex, endIndex);

    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <section
            aria-labelledby="category-listing-heading"
            className="bg-cream/40"
        >
            <div className="section-container">
                <header className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-medium tracking-[0.2em] text-secondary uppercase">
                        Our Collection
                    </p>
                    <h2
                        id="category-listing-heading"
                        className="mt-4 text-[28px] leading-[1.15] font-bold tracking-[-2%] text-primary sm:text-4xl"
                    >
                        Browse {category.hero.title}
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-primary/65 sm:text-base">
                        Handpicked {category.label.toLowerCase()} from Mahraj
                        Plants — quality you can see and care you can trust.
                    </p>
                </header>

                <div className="mt-10 flex flex-col gap-5 sm:mt-12 sm:flex-row sm:items-end sm:justify-between">
                    <p className="text-sm text-primary/70">
                        Showing{" "}
                        <span className="font-semibold text-primary">
                            {totalProducts === 0
                                ? "0"
                                : `${startIndex + 1}-${endIndex}`}
                        </span>{" "}
                        of{" "}
                        <span className="font-semibold text-primary">
                            {totalProducts}
                        </span>{" "}
                        products
                    </p>

                    <SortDropdown value={sort} onChange={setSort} />
                </div>

                <ul className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-7">
                    {visibleListings.map((item) => (
                        <li key={item.id}>
                            <CategoryProductCard item={item} />
                        </li>
                    ))}
                </ul>

                {totalPages > 1 && (
                    <nav
                        aria-label="Product pagination"
                        className="mt-10 flex flex-wrap items-center justify-center gap-2"
                    >
                        <button
                            type="button"
                            onClick={() => setPage((current) => current - 1)}
                            disabled={page === 1}
                            aria-label="Previous page"
                            className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-primary/15 bg-white text-primary transition hover:border-secondary hover:text-secondary disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <HiChevronLeft className="size-5" aria-hidden />
                        </button>

                        {pageNumbers.map((pageNumber) => (
                            <button
                                key={pageNumber}
                                type="button"
                                onClick={() => setPage(pageNumber)}
                                aria-label={`Page ${pageNumber}`}
                                aria-current={
                                    pageNumber === page ? "page" : undefined
                                }
                                className={cn(
                                    "inline-flex size-10 cursor-pointer items-center justify-center rounded-full border text-sm font-semibold transition",
                                    pageNumber === page
                                        ? "border-secondary bg-secondary text-white"
                                        : "border-primary/15 bg-white text-primary hover:border-secondary hover:text-secondary",
                                )}
                            >
                                {pageNumber}
                            </button>
                        ))}

                        <button
                            type="button"
                            onClick={() => setPage((current) => current + 1)}
                            disabled={page === totalPages}
                            aria-label="Next page"
                            className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-primary/15 bg-white text-primary transition hover:border-secondary hover:text-secondary disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <HiChevronRight className="size-5" aria-hidden />
                        </button>
                    </nav>
                )}
            </div>
        </section>
    );
}
