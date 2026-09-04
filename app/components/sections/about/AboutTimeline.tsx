import Image from "next/image";
import { cn } from "@/app/lib/utils";

const milestones = [
    {
        period: "Since 1989",
        title: "Rooted in a Love for Nature",
        description:
            "Landscape was founded with a deep appreciation for gardens and outdoor beauty — bringing nature closer to everyday life.",
        cardBelow: true,
    },
    {
        period: "1992–1998",
        title: "From Garden Care to Landscape Craft",
        description:
            "We evolved from simple garden maintenance to offering full landscaping services — blending creativity with care.",
        cardBelow: false,
    },
    {
        period: "2005–2015",
        title: "Sustainable Practices Take Root",
        description:
            "Landscape embraced eco-friendly design, choosing sustainable materials and greener methods for every project we delivered.",
        cardBelow: true,
    },
    {
        period: "2020–Today",
        title: "Greener Designs for Shared Futures",
        description:
            "We focus on community gardens, urban green spaces, and nature-centered design — growing spaces that bring people together.",
        cardBelow: false,
    },
];

function TimelineLabel({
    period,
    title,
    className,
}: {
    period: string;
    title: string;
    className?: string;
}) {
    return (
        <div className={cn("text-center", className)}>
            <p className="text-sm text-white/70 sm:text-[15px]">{period}</p>
            <h3 className="mt-1.5 text-base font-bold leading-snug text-white transition-colors duration-300 group-hover:text-secondary sm:text-lg">
                {title}
            </h3>
        </div>
    );
}

function TimelineCard({
    description,
    className,
}: {
    description: string;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "rounded-tr-[2rem] rounded-bl-[2rem] bg-secondary px-5 py-5 text-left transition-colors duration-300 group-hover:bg-white sm:rounded-tr-[2.5rem] sm:rounded-bl-[2.5rem] sm:px-6 sm:py-6",
                className,
            )}
        >
            <p className="text-sm leading-relaxed text-white transition-colors duration-300 group-hover:text-primary sm:text-[15px]">
                {description}
            </p>
        </div>
    );
}

export default function AboutTimeline() {
    return (
        <div className="section-container relative pt-12 pb-16 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24">
            <header className="mx-auto max-w-3xl text-center">
                <Image
                    src="/icons/singleLeaf.svg"
                    alt=""
                    width={14}
                    height={21}
                    unoptimized
                    className="mx-auto h-5 w-auto"
                    aria-hidden
                />

                <p className="mt-4 font-script text-[28px] leading-none text-white sm:text-[32px] lg:text-[36px]">
                    A Green Timeline
                </p>

                <h2
                    id="about-timeline-heading"
                    className="mt-4 text-[28px] leading-[1.15] font-bold tracking-[-2%] text-white sm:text-4xl lg:text-[42px]"
                >
                    Decades Of Designing With Nature
                </h2>

                <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
                    Our history is shaped by a love for nature — growing from
                    simple gardens into timeless, sustainable landscapes with
                    heart and purpose.
                </p>
            </header>

            {/* Mobile / tablet stacked timeline */}
            <ol className="relative mx-auto mt-12 max-w-xl space-y-10 lg:hidden">
                <div
                    aria-hidden
                    className="absolute top-2 bottom-2 left-[0.6875rem] w-px bg-white/40"
                />

                {milestones.map((item) => (
                    <li key={item.period} className="group relative pl-10">
                        <span
                            aria-hidden
                            className="absolute top-1.5 left-0 size-3.5 rounded-full border-2 border-white bg-primary"
                        />
                        <div className="space-y-4">
                            {item.cardBelow ? (
                                <>
                                    <TimelineLabel
                                        period={item.period}
                                        title={item.title}
                                        className="text-left"
                                    />
                                    <TimelineCard
                                        description={item.description}
                                    />
                                </>
                            ) : (
                                <>
                                    <TimelineCard
                                        description={item.description}
                                    />
                                    <TimelineLabel
                                        period={item.period}
                                        title={item.title}
                                        className="text-left"
                                    />
                                </>
                            )}
                        </div>
                    </li>
                ))}
            </ol>

            {/* Desktop horizontal timeline */}
            <div className="relative mt-16 hidden lg:block">
                <div
                    aria-hidden
                    className="absolute top-1/2 right-0 left-0 h-px -translate-y-1/2 bg-white"
                />

                <ol className="relative grid grid-cols-4 gap-6 xl:gap-8">
                    {milestones.map((item) => (
                        <li
                            key={item.period}
                            className="group relative flex flex-col"
                        >
                            <div className="flex min-h-[11.5rem] flex-col justify-end pb-8">
                                {item.cardBelow ? (
                                    <TimelineLabel
                                        period={item.period}
                                        title={item.title}
                                    />
                                ) : (
                                    <TimelineCard
                                        description={item.description}
                                    />
                                )}
                            </div>

                            <div className="relative z-10 flex justify-center">
                                <span
                                    aria-hidden
                                    className="size-3.5 rounded-full border-2 border-white bg-primary"
                                />
                                <span
                                    aria-hidden
                                    className={cn(
                                        "absolute left-1/2 w-px -translate-x-1/2 border-l border-dashed border-white/70",
                                        item.cardBelow
                                            ? "top-full h-8"
                                            : "bottom-full h-8",
                                    )}
                                />
                            </div>

                            <div className="flex min-h-[11.5rem] flex-col justify-start pt-8">
                                {item.cardBelow ? (
                                    <TimelineCard
                                        description={item.description}
                                    />
                                ) : (
                                    <TimelineLabel
                                        period={item.period}
                                        title={item.title}
                                    />
                                )}
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}
