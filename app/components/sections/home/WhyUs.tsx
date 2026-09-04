import Image from "next/image";
import Button from "../../ui/Button";

const highlights = [
    "Tailored landscaping solutions designed around your space and lifestyle",
    "A practical, hands-on approach from design to ongoing care",
    "Integrated services from planting to irrigation and maintenance",
    "Clear communication and reliable project delivery every step of the way",
];

const featureIcons = [
    {
        icon: "/icons/pesticide.svg",
        label: "Pesticide-Free Practices",
    },
    {
        icon: "/icons/green-solutions.svg",
        label: "Long-Term Green Solutions",
    },
];

export default function WhyUs() {
    return (
        <section
            id="why-us"
            aria-labelledby="why-us-heading"
            className="relative isolate overflow-hidden mt-16"
        >
            <Image
                src="/images/home/why-us-bg.jpg"
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
                aria-hidden
            />
            <div
                aria-hidden
                className="absolute inset-0 bg-primary/10"
            />

            <div className="section-container relative">
                <div className="overflow-visible rounded-[2rem] bg-white shadow-[0_24px_60px_rgba(10,37,14,0.14)] sm:rounded-[2.5rem]">
                    <div className="grid gap-8 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-10 lg:py-12 xl:px-14">
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
                                <span className="font-script text-[28px] leading-none text-secondary sm:text-[32px]">
                                    Natural green Plants
                                </span>
                            </p>

                            <h2
                                id="why-us-heading"
                                className="mt-4 text-[28px] leading-tight font-bold tracking-[-2%] text-primary sm:text-4xl lg:text-[42px]"
                            >
                                Why Choose Mahraj Plants?
                            </h2>

                            <p className="mt-5 text-sm leading-relaxed text-primary/70 sm:text-base">
                                We combine thoughtful design, expert planting, and
                                dependable care to create outdoor spaces that feel
                                natural, balanced, and built to last. Every project is
                                handled with the same attention to detail—from the first
                                consultation to long-term maintenance.
                            </p>

                            <ul className="mt-6 space-y-3.5 sm:space-y-4">
                                {highlights.map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-start gap-3"
                                    >
                                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-secondary">
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
                                        <span className="text-sm leading-snug text-primary sm:text-[15px]">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                variant="secondary"
                                className="mt-8 w-fit rounded-lg px-10 py-3.5 sm:mt-10"
                            >
                                Read More
                            </Button>
                        </div>

                        <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none lg:-mt-20 lg:pt-4">
                            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl shadow-[0_16px_40px_rgba(10,37,14,0.12)] sm:rounded-[1.75rem] lg:aspect-auto lg:min-h-[22rem]">
                                <Image
                                    src="/images/home/why-us-content-img.webp"
                                    alt="Mahraj Plants landscaping team standing together in front of a greenhouse"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 45vw"
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid border-t border-primary/8 md:grid-cols-3">
                        <article className="flex flex-col bg-cream px-6 py-8 sm:px-8 sm:py-9 lg:px-9">
                            <h3 className="text-xl font-bold text-primary sm:text-2xl">
                                We Are Since 2023!
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed text-primary/70 sm:text-[15px]">
                                Built on a passion for greenery and sustainable outdoor
                                living, we&apos;ve grown into a trusted partner for
                                homeowners and businesses seeking beautiful, healthy
                                landscapes.
                            </p>

                            <div className="mt-auto flex flex-col gap-5 pt-8 sm:flex-row sm:gap-6">
                                {featureIcons.map((item) => (
                                    <div
                                        key={item.label}
                                        className="flex flex-1 flex-col items-center text-center"
                                    >
                                        <div className="flex size-[4.5rem] items-center justify-center rounded-full bg-white shadow-sm">
                                            <Image
                                                src={item.icon}
                                                alt=""
                                                width={40}
                                                height={40}
                                                unoptimized
                                                className="h-9 w-auto"
                                            />
                                        </div>
                                        <p className="mt-3 text-xs font-medium leading-snug text-primary sm:text-sm">
                                            {item.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </article>

                        <article className="flex flex-col bg-section px-6 py-8 text-white sm:px-8 sm:py-9 lg:px-9">
                            <h3 className="text-xl font-bold sm:text-2xl">
                                Our Commitment
                            </h3>

                            <blockquote className="mt-5 flex-1 text-sm italic leading-relaxed text-white/90 sm:text-[15px]">
                                &ldquo;Every garden we create reflects our promise to
                                nurture nature responsibly—delivering lasting beauty,
                                healthier environments, and spaces our clients are proud
                                to call their own.&rdquo;
                            </blockquote>

                            <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="relative size-11 shrink-0 overflow-hidden rounded-full bg-white/15">
                                        <div className="flex size-full items-center justify-center text-sm font-semibold text-white">
                                            A
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold">Anish</p>
                                        <p className="text-xs text-white/70">
                                            CEO / Company
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                                    <button
                                        type="button"
                                        className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-primary transition hover:bg-white/90"
                                    >
                                        How We Work
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
                                    </button>
                                    <span className="font-script text-2xl text-white/90">
                                        Anish
                                    </span>
                                </div>
                            </div>
                        </article>

                        <article className="flex flex-col bg-cream px-6 py-8 sm:px-8 sm:py-9 lg:px-9">
                            <h3 className="text-xl font-bold text-primary sm:text-2xl">
                                Let&apos;s Talk Today!
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed text-primary/70 sm:text-[15px]">
                                We&apos;re here to help! Reach out anytime our friendly
                                team is happy to assist.
                            </p>

                            <div className="mt-6 space-y-3">
                                <a
                                    href="tel:+1234567890"
                                    className="flex items-center gap-3 rounded-full bg-white px-4 py-3 text-sm text-primary shadow-sm transition hover:shadow-md"
                                >
                                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                                        <svg
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            aria-hidden
                                            className="size-4"
                                        >
                                            <path
                                                d="M3.5 2.5h2l1 2.5-1.5 1c.8 1.6 2.1 2.9 3.7 3.7l1-1.5 2.5 1v2c0 .6-.4 1-1 1C6.8 11.2 4.8 9.2 3.5 6.5c-.3-.6.1-1.2.7-1.2-.1 0-.1 0 0 0Z"
                                                stroke="currentColor"
                                                strokeWidth="1.3"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </span>
                                    +1 (234) 567-890
                                </a>
                                <a
                                    href="mailto:info@mahrajplants.com"
                                    className="flex items-center gap-3 rounded-full bg-white px-4 py-3 text-sm text-primary shadow-sm transition hover:shadow-md"
                                >
                                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                                        <svg
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            aria-hidden
                                            className="size-4"
                                        >
                                            <path
                                                d="M2.5 4.5h11v7h-11v-7Z"
                                                stroke="currentColor"
                                                strokeWidth="1.3"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="m2.5 5 5.5 4 5.5-4"
                                                stroke="currentColor"
                                                strokeWidth="1.3"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </span>
                                    info@mahrajplants.com
                                </a>
                            </div>

                            <button
                                type="button"
                                className="w-full cursor-pointer rounded-lg bg-primary px-6 py-3.5 text-sm font-medium text-white transition hover:bg-primary/90 sm:mt-auto"
                            >
                                Free Quote Now!
                            </button>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    );
}
