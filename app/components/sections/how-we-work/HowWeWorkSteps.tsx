import Image from "next/image";
import { cn } from "@/app/lib/utils";

const steps = [
    {
        number: "01",
        title: "Consultation & Planning",
        description:
            "We begin by listening carefully to your needs, exploring creative possibilities, and surveying your outdoor space with attention to every detail. From there, we develop a thoughtful design plan — one that balances your vision, practical needs, budget, and the natural potential of your landscape — to ensure your garden grows beautifully from the very first step.",
        image: "/images/how-we-work/img-1.webp",
        alt: "Garden consultants reviewing landscape plans on a tablet outdoors",
        icon: "/icons/consultation.svg",
        imageLeft: true,
    },
    {
        number: "02",
        title: "Garden Creation",
        description:
            "Once the design is approved, our skilled team gets to work, carefully turning plans into reality. Using high-quality plants, sustainable materials, and precise craftsmanship, we shape each part of your garden with care. Every plant, pathway, and feature is installed with attention to detail — creating a space that feels natural, welcoming, and ready to grow beautifully for years to come.",
        image: "/images/how-we-work/img-2.webp",
        alt: "Landscapers planting and shaping a new garden bed",
        icon: "/icons/execution.svg",
        imageLeft: false,
    },
    {
        number: "03",
        title: "Finishing Touches & Styling",
        description:
            "As your garden takes shape, we focus on the final touches that complete the space. From layout adjustments to styling features like lighting, décor, and natural accents, every detail is refined with care. We enhance the character of your garden to create a space that feels both welcoming and personal. These finishing touches help your garden look and feel fully alive from the very first day.",
        image: "/images/how-we-work/img-3.webp",
        alt: "Finished garden details with styling and decorative accents",
        icon: "/icons/expert-team.svg",
        imageLeft: true,
    },
    {
        number: "04",
        title: "Garden Care & Maintenance",
        description:
            "After your garden is complete, we're here to help it grow. Our team offers ongoing care and maintenance services to keep every plant healthy and every space looking its best. From seasonal pruning to routine upkeep, we ensure your garden stays vibrant and beautiful all year round. With expert hands and a love for nature, we help your outdoor space flourish over time.",
        image: "/images/how-we-work/img-4.webp",
        alt: "Gardener providing ongoing care and maintenance in a thriving garden",
        icon: "/icons/reliable.svg",
        imageLeft: false,
    },
] as const;

export default function HowWeWorkSteps() {
    return (
        <section
            aria-labelledby="how-we-work-steps-heading"
            className="bg-white"
        >
            <h2 id="how-we-work-steps-heading" className="sr-only">
                Our working process steps
            </h2>

            <div className="section-container pt-0">
                <ol className="space-y-0">
                    {steps.map((step, index) => {
                        const isLast = index === steps.length - 1;

                        return (
                            <li
                                key={step.number}
                                className={cn(
                                    "grid items-center gap-8 py-10 sm:gap-10 sm:py-12 lg:grid-cols-2 lg:gap-14 lg:py-16",
                                    !isLast &&
                                        "border-b border-dashed border-primary/15",
                                )}
                            >
                                <div
                                    className={cn(
                                        "relative aspect-[4/3] overflow-hidden sm:aspect-[5/4] lg:aspect-[4/3]",
                                        step.imageLeft
                                            ? "rounded-tr-[4rem] rounded-bl-[4rem] sm:rounded-tr-[5.5rem] sm:rounded-bl-[5.5rem] lg:order-1"
                                            : "rounded-tl-[4rem] rounded-br-[4rem] sm:rounded-tl-[5.5rem] sm:rounded-br-[5.5rem] lg:order-2",
                                    )}
                                >
                                    <Image
                                        src={step.image}
                                        alt={step.alt}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        className="object-cover"
                                    />
                                </div>

                                <div
                                    className={cn(
                                        "relative",
                                        step.imageLeft
                                            ? "lg:order-2"
                                            : "lg:order-1",
                                    )}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <span
                                            aria-hidden
                                            className="bg-linear-to-b from-secondary to-secondary/15 bg-clip-text text-[4.5rem] leading-none font-bold text-transparent sm:text-[5.5rem] lg:text-[6.5rem]"
                                        >
                                            {step.number}.
                                        </span>

                                        <Image
                                            src={step.icon}
                                            alt=""
                                            width={48}
                                            height={48}
                                            unoptimized
                                            style={{ width: "auto", height: "auto" }}
                                            className="mt-2 h-10 w-auto [filter:brightness(0)_saturate(100%)_invert(67%)_sepia(35%)_saturate(650%)_hue-rotate(42deg)_brightness(94%)_contrast(90%)] sm:h-11"
                                            aria-hidden
                                        />
                                    </div>

                                    <h3 className="mt-4 text-[24px] leading-tight font-bold tracking-[-2%] text-primary sm:text-[28px] lg:text-[32px]">
                                        {step.title}
                                    </h3>

                                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-primary/65 sm:text-[15px] sm:leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </li>
                        );
                    })}
                </ol>
            </div>
        </section>
    );
}
