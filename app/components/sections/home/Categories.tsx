import { CategoryCard, type Category } from "@/app/components/ui";

const categories: Category[] = [
    {
        title: "Mahraj Indoor Plants",
        image: "/images/home/m-indoor.webp",
        alt: "Lush indoor plants with dew on the leaves",
        tagline: "Fresh greens for homes, offices, and bright indoor spaces.",
    },
    {
        title: "Mahraj Outdoor Plants",
        image: "/images/home/m-outdoor.webp",
        alt: "Vibrant outdoor plants in natural sunlight",
        tagline: "Hardy selections built to thrive in open air and seasonal sun.",
    },
    {
        title: "Mahraj Trees",
        image: "/images/home/m-trees.webp",
        alt: "Manicured garden with trees and a bench",
        tagline: "Statement trees and saplings that shape gardens for years.",
    },
    {
        title: "Mahraj Garden Landscaping",
        image: "/images/home/m-landscaping.webp",
        alt: "Professionally landscaped garden with stone paths and planting beds",
        tagline: "Custom outdoor design from concept to finished landscape.",
    },
];

export default function Categories() {
    return (
        <section
            id="categories"
            aria-labelledby="categories-heading"
            className="relative overflow-hidden bg-cream/40"
        >
            <div
                aria-hidden
                className="pointer-events-none absolute top-16 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-secondary/10 blur-3xl"
            />

            <div className="section-container relative">
                <header className="mx-auto max-w-4xl text-center">
                    <p className="text-sm font-medium tracking-[0.2em] text-secondary uppercase">
                        Explore our collections
                    </p>

                    <h2
                        id="categories-heading"
                        className="mt-4 text-[28px] leading-[1.15] font-semibold tracking-[-2%] text-primary sm:text-4xl lg:text-[42px]"
                    >
                        <span className="text-secondary">Mahraj Plants</span> Your Trusted
                        Greenery &amp; Landscaping Partner
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-primary/65 sm:text-base">
                        Our curated collection of vibrant plants and custom landscaping
                        solutions. From budget-friendly greens to statement plants that
                        transform your home, garden, or commercial space, we deliver
                        health, beauty, and expert care right to your doorstep.
                    </p>
                </header>

                <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-8 lg:mt-16 lg:grid-cols-4 lg:gap-x-10">
                    {categories.map((category) => (
                        <li key={category.title}>
                            <CategoryCard category={category} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
