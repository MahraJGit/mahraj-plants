import Image from "next/image";
import Button from "../../ui/Button";
import { cn } from "@/app/lib/utils";

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

function LeafIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 14 21"
            fill="none"
            aria-hidden
            className={cn("h-5 w-3.5 shrink-0", className)}
        >
            <path
                d="M6.02387 12.9669C6.02387 13.1236 6.02387 13.2804 6.02387 13.439C6.02806 14.2874 6.20591 15.1256 6.54603 15.8996C6.97078 16.8603 7.50571 17.7662 8.13959 18.5982C8.41422 18.9671 8.73582 19.2972 9.03213 19.6495C9.1726 19.814 9.30467 19.9858 9.42781 20.1642C9.48501 20.2413 9.51303 20.337 9.50673 20.4335C9.50042 20.5301 9.46021 20.6211 9.39348 20.6899C9.32889 20.788 9.24101 20.868 9.13802 20.9221C9.03504 20.9763 8.92029 21.003 8.80448 20.9997C8.73782 20.9924 8.67332 20.9713 8.61491 20.9377C8.55651 20.9041 8.50544 20.8587 8.46481 20.8042C8.26968 20.5718 8.08539 20.3302 7.9011 20.0867C7.72353 19.8193 7.45505 19.6287 7.14768 19.5518C7.02845 19.5284 6.90766 19.5142 6.78633 19.5094C6.6183 19.5094 6.45027 19.5094 6.28405 19.5094C6.11783 19.5094 5.9227 19.5278 5.74202 19.5241C4.72804 19.5587 3.73314 19.237 2.92347 18.6129C2.07322 18.0072 1.36438 17.2174 0.847499 16.2999C0.540581 15.7483 0.32278 15.1497 0.202483 14.5273C0.146474 14.2303 0.101307 13.9297 0.0687849 13.629C0.0362631 13.3284 0.0326481 13.0406 0.0163872 12.7455C0.0163872 12.5979 -0.00167975 12.4504 0.00012701 12.3028C0.00012701 12.0151 0.0145815 11.7292 0.0344559 11.4414C0.104991 10.5096 0.329171 9.59665 0.697537 8.74106C1.11528 7.7597 1.61583 6.81729 2.19354 5.92448C2.70304 5.12765 3.21255 4.33081 3.74193 3.54689C4.09244 3.02674 4.47548 2.52872 4.84948 2.02516C5.12772 1.64888 5.41078 1.27629 5.69865 0.907385C5.89653 0.630855 6.12988 0.382702 6.39245 0.169577C6.45272 0.112305 6.52356 0.067872 6.60084 0.0388659C6.67812 0.00985979 6.76029 -0.00313876 6.84255 0.000639172C6.9248 0.0044171 7.00549 0.0248906 7.07991 0.0608641C7.15432 0.0968376 7.22097 0.147591 7.27596 0.210157C7.56179 0.492908 7.81296 0.810023 8.02396 1.15455C8.38531 1.68762 8.74666 2.22253 9.12247 2.74637C9.35916 3.07654 9.63198 3.38273 9.8795 3.70736C10.2264 4.16296 10.5823 4.61118 10.9039 5.08338C11.4544 5.89128 11.9928 6.7084 12.5192 7.53474C12.9328 8.16933 13.2741 8.85006 13.5364 9.56371C13.7029 10.0304 13.8287 10.5113 13.9122 11.0006C13.9465 11.2175 13.97 11.4361 13.9827 11.6554C13.9971 11.8142 14.0025 11.9737 13.9989 12.1331C13.9826 12.6738 13.8832 13.2084 13.7044 13.7176C13.468 14.4115 13.1292 15.0646 12.6999 15.6543C12.493 15.9371 12.2704 16.2074 12.0332 16.4641C11.7621 16.7555 11.4767 17.0322 11.1822 17.2996C10.8301 17.6257 10.4413 17.9081 10.024 18.1407C9.89329 18.2317 9.73511 18.2722 9.57777 18.2551C9.47799 18.238 9.38196 18.203 9.29411 18.1518C8.96611 17.9188 8.68668 17.6216 8.47203 17.2775C8.13226 16.8127 7.82322 16.3253 7.54697 15.8185C7.1761 15.1509 6.90165 14.4321 6.73212 13.6844C6.64901 13.2712 6.57674 12.858 6.49724 12.4449C6.44485 12.1848 6.38703 11.9247 6.32922 11.6646C6.32087 11.6267 6.3075 11.5901 6.28947 11.5558C6.27863 11.5355 6.25514 11.5097 6.23707 11.5097C6.22564 11.5119 6.2149 11.5169 6.20577 11.5243C6.19665 11.5317 6.18941 11.5412 6.18467 11.5521C6.13666 11.6623 6.10207 11.7782 6.08169 11.897C6.04736 12.2512 6.02929 12.609 6.00581 12.965L6.02387 12.9669Z"
                fill="currentColor"
            />
        </svg>
    );
}

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
                                <LeafIcon className="text-secondary" />
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

                        <article className="flex flex-col bg-primary px-6 py-8 text-white sm:px-8 sm:py-9 lg:px-9">
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
