import Image from "next/image";
import { cn } from "@/app/lib/utils";

const skills = [
    { label: "Landscape Design Expertise", value: 98 },
    { label: "Sustainable Solutions", value: 70 },
    { label: "Plant Knowledge & Care", value: 80 },
];

const pillars = [
    {
        title: "Our Mission",
        description:
            "To bring life, beauty, and balance to outdoor spaces through thoughtful design and expert care. At Landscape, we're here to make green living part of your everyday life.",
        icon: "/icons/mission.svg",
        tone: "bg-section",
    },
    {
        title: "Our Vision",
        description:
            "To grow as a leading name in landscape and garden design, creating beautiful, sustainable spaces where nature and people connect, relax, and thrive together.",
        icon: "/icons/vision.svg",
        tone: "bg-[#06180A]",
    },
] as const;

export default function AboutExpertise() {
    return (
        <section
            id="expertise"
            aria-labelledby="expertise-heading"
            className="relative isolate overflow-hidden py-16 sm:py-20 lg:py-24"
        >
            <Image
                src="/images/about/expertise-bg.webp"
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
                aria-hidden
            />
            <div aria-hidden className="absolute inset-0 bg-primary/15" />

            <div className="section-container relative">
                <div className="overflow-hidden rounded-[1.75rem] bg-white shadow-[0_24px_60px_rgba(10,37,14,0.14)] sm:rounded-[2rem] lg:rounded-[2.5rem]">
                    <div className="grid gap-10 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-2 lg:gap-12 lg:px-10 lg:py-12 xl:gap-16 xl:px-14">
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
                                <span className="font-script text-[26px] leading-none text-primary sm:text-[30px]">
                                    Rooted in Knowledge, Grown with Care
                                </span>
                            </p>

                            <h2
                                id="expertise-heading"
                                className="mt-4 text-[28px] leading-tight font-bold tracking-[-2%] text-primary sm:text-4xl lg:text-[42px]"
                            >
                                Crafted With Expertise
                            </h2>

                            <p className="mt-5 text-sm leading-relaxed text-primary/70 sm:text-base">
                                We combine horticultural know-how and design
                                sense to create outdoor spaces that are
                                functional, beautiful, and lasting.
                            </p>

                            <ul className="mt-8 space-y-5 sm:mt-10">
                                {skills.map((skill) => (
                                    <li key={skill.label}>
                                        <div className="mb-2 flex items-center justify-between gap-4">
                                            <span className="text-sm font-medium text-primary sm:text-[15px]">
                                                {skill.label}
                                            </span>
                                            <span className="text-sm font-semibold text-primary">
                                                {skill.value}%
                                            </span>
                                        </div>
                                        <div className="h-1.5 overflow-hidden rounded-full bg-primary/10">
                                            <div
                                                className="h-full rounded-full bg-secondary"
                                                style={{
                                                    width: `${skill.value}%`,
                                                }}
                                            />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none">
                            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl shadow-[0_16px_40px_rgba(10,37,14,0.12)] sm:rounded-[1.75rem] lg:aspect-[4/3] lg:min-h-[22rem]">
                                <Image
                                    src="/images/about/expertise-content-img.webp"
                                    alt="Mahraj Plants landscaping team standing together outdoors"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 45vw"
                                    className="object-cover"
                                />

                                <div
                                    aria-hidden
                                    className="absolute bottom-0 left-0 h-[6.5rem] w-[9.75rem] rounded-tr-[1.75rem] bg-white"
                                />
                            </div>

                            <div className="absolute bottom-0 left-0 z-10 flex h-[6.5rem] w-[9.75rem] flex-col justify-center text-center">
                                <p className="text-3xl font-bold leading-none text-primary sm:text-4xl">
                                    20+
                                </p>
                                <p className="mt-1.5 text-sm text-primary/70">
                                    Expert Team
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2">
                        {pillars.map((pillar) => (
                            <article
                                key={pillar.title}
                                className={cn(
                                    "relative overflow-hidden px-6 py-8 text-white sm:px-8 sm:py-10 lg:px-10 lg:py-12",
                                    pillar.tone,
                                )}
                            >
                                <Image
                                    src={pillar.icon}
                                    alt=""
                                    width={180}
                                    height={180}
                                    unoptimized
                                    aria-hidden
                                    className="pointer-events-none absolute -right-4 -bottom-6 size-36 opacity-[0.12] brightness-0 invert sm:size-44 lg:size-52"
                                />

                                <div className="relative z-10">
                                    <div className="flex size-14 items-center justify-center rounded-xl bg-white shadow-sm sm:size-16">
                                        <Image
                                            src={pillar.icon}
                                            alt=""
                                            width={40}
                                            height={40}
                                            unoptimized
                                            className="size-9 sm:size-10"
                                        />
                                    </div>

                                    <h3 className="mt-5 text-xl font-bold sm:text-2xl">
                                        {pillar.title}
                                    </h3>

                                    <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80 sm:text-[15px]">
                                        {pillar.description}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
