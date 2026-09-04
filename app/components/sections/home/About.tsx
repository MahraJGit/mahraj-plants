import Image from "next/image";
import Button from "../../ui/Button";

const highlights = [
    "A True Passion for Nature",
    "Proven Expertise in Landscaping & Care",
    "End-to-End Maintenance & Plant Guarantee",
    "Custom Garden & Landscape Design",
    "Personalized, Thoughtful Customer Service",
    "Curated Selection of Healthy Plants",
];

export default function About() {
    return (
        <section
            id="about"
            aria-labelledby="about-heading"
            className="bg-white"
        >
            <div className="section-container">
                <div className="grid items-stretch gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14 xl:gap-16">
                    <div className="relative mx-auto h-full min-h-[22rem] w-full sm:min-h-[24rem] lg:mx-0">
                        <div className="absolute inset-0 overflow-hidden rounded-tl-[2.5rem] rounded-br-[2.5rem] shadow-[0_20px_50px_rgba(10,37,14,0.12)] sm:rounded-tl-[3rem] sm:rounded-br-[3rem]">
                            <Image
                                src="/images/home/aboutImg.webp"
                                alt="Mahraj Plants team caring for garden flowers together"
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </div>

                        <div className="absolute -top-4 right-0 z-10 w-[9.5rem] rounded-tl-[1.75rem] rounded-br-[1.75rem] bg-section px-5 py-7 text-center text-white shadow-lg sm:-top-6 sm:right-2 sm:w-[10.5rem] sm:px-6 sm:py-8 lg:-right-4">
                            <Image
                                src="/icons/leaf.svg"
                                alt=""
                                width={41}
                                height={30}
                                unoptimized
                                className="mx-auto h-7 w-auto"
                            />
                            <p className="mt-3 text-4xl leading-none font-semibold sm:text-[2.75rem]">
                                35+
                            </p>
                            <p className="mt-2 text-sm leading-snug font-light sm:text-base">
                                Years of Gardening
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center">
                        <p className="flex items-center gap-2">
                            <Image
                                src="/icons/singleLeaf.svg"
                                alt=""
                                width={14}
                                height={21}
                                unoptimized
                                className="h-5 w-auto shrink-0"
                                aria-hidden
                            />
                            <span className="font-script text-[28px] leading-none text-primary sm:text-[32px]">
                                Who We Are
                            </span>
                        </p>

                        <h2
                            id="about-heading"
                            className="mt-4 text-[28px] leading-tight font-bold tracking-[-2%] text-primary sm:text-4xl lg:text-[42px]"
                        >
                            Mahraj Plants &amp; Landscaping
                        </h2>

                        <div className="mt-5 space-y-4 text-sm leading-relaxed text-primary/70 sm:text-base">
                            <p>
                                At Mahraj Plants, we bring life, greenery, and timeless
                                beauty to modern living and outdoor spaces.
                            </p>
                            <p>
                                With years of horticultural experience, we craft custom
                                landscaping solutions tailored to bring your vision to life.
                            </p>
                        </div>

                        <div
                            aria-hidden
                            className="my-7 border-t border-dotted border-[#C4A862]/70 sm:my-8"
                        />

                        <ul className="space-y-3.5 sm:space-y-4">
                            {highlights.map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#C4A862]">
                                        <svg
                                            viewBox="0 0 12 12"
                                            fill="none"
                                            aria-hidden
                                            className="size-2.5"
                                        >
                                            <path
                                                d="M2.5 6.2 5 8.7 9.5 3.8"
                                                stroke="white"
                                                strokeWidth="1.6"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </span>
                                    <span className="text-sm leading-snug text-primary sm:text-base">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <Button
                            variant="secondary"
                            className="mt-8 w-fit self-start rounded-lg px-10 py-3.5 sm:mt-10"
                        >
                            Read More
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
