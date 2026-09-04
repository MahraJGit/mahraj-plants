import Image from "next/image";
import { ProcessCard, type ProcessStep } from "@/app/components/ui";

const steps: ProcessStep[] = [
    {
        number: "01",
        title: "Consultation & Planning",
        description:
            "We listen closely to your vision, assess your space, and craft a personalized plan that blends beauty, functionality, and long-term growth.",
        icon: "/icons/consultation.svg",
    },
    {
        number: "02",
        title: "Create your garden",
        description:
            "We bring your design to life with expert craftmanship, quality materials, and thoughtful planting that transforms your space into a living sanctuary.",
        icon: "/icons/execution.svg",
    },
    {
        number: "03",
        title: "Finishing Touches & Styling",
        description:
            "We refine every detail with decor, lighting, and layout elements to bring out the garden's full charm and character",
        icon: "/icons/expert-team.svg",
    },
    {
        number: "04",
        title: "Garden care & maintenance",
        description:
            "We keep your garden thriving year-round with routine care, seasonal updates, and responsive support tailored to its evolving needs.",
        icon: "/icons/reliable.svg",
    },
];

export default function Process() {
    return (
        <section
            id="process"
            aria-labelledby="process-heading"
            className="relative isolate overflow-hidden bg-section"
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[48px_48px]"
            />

            <div className="section-container relative">
                <header className="max-w-3xl">
                    <p className="flex items-center gap-2">
                        <Image
                            src="/icons/singleLeaf.svg"
                            alt=""
                            width={14}
                            height={21}
                            unoptimized
                            className="h-5 w-auto shrink-0"
                        />
                        <span className="font-script text-[28px] leading-none text-secondary sm:text-[32px]">
                            Our Working Process
                        </span>
                    </p>

                    <h2
                        id="process-heading"
                        className="mt-4 text-[28px] leading-[1.15] font-bold tracking-[-2%] text-white sm:text-4xl lg:text-[42px]"
                    >
                        Growing Ideas Into Living Spaces
                    </h2>

                    <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
                        We make landscaping easy with a clear, step-by-step process
                        designed to turn your ideas into thriving green spaces.
                    </p>
                </header>

                <div className="mt-12 hidden items-center justify-center gap-2 xl:mt-14 xl:flex xl:gap-3">
                    {steps.map((step, index) => (
                        <div key={step.number} className="contents">
                            <ProcessCard
                                step={step}
                                className="max-w-[16.5rem]"
                            />
                            {index < steps.length - 1 && (
                                <div className="flex w-10 shrink-0 items-center justify-center xl:w-12">
                                    <Image
                                        src="/icons/process-arrow.svg"
                                        alt=""
                                        width={56}
                                        height={32}
                                        unoptimized
                                        className="mx-auto w-12 xl:w-14"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-12 hidden gap-8 sm:grid sm:grid-cols-2 xl:hidden">
                    {steps.map((step) => (
                        <ProcessCard
                            key={step.number}
                            step={step}
                            className="max-w-[16.5rem]"
                        />
                    ))}
                </div>

                <div className="mt-12 flex flex-col items-center gap-8 sm:hidden">
                    {steps.map((step) => (
                        <ProcessCard
                            key={step.number}
                            step={step}
                            className="max-w-[16.5rem]"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
