import Image from "next/image";
import { FaTrophy } from "react-icons/fa";

const counters = [
    {
        value: "80+",
        label: "Green Workshops",
        type: "image" as const,
        icon: "/icons/execution.svg",
        iconClassName: "h-7 w-auto",
    },
    {
        value: "500+",
        label: "Projects Complete",
        type: "image" as const,
        icon: "/icons/projects-completed.svg",
        iconClassName: "h-7 w-auto brightness-0 invert",
    },
    {
        value: "300+",
        label: "Tree & Plants Selected",
        type: "image" as const,
        icon: "/icons/trees-plants.svg",
        iconClassName: "h-8 w-auto brightness-0 invert",
    },
    {
        value: "19+",
        label: "Our Awards & Wins",
        type: "trophy" as const,
    },
];

export default function AboutCounters() {
    return (
        <section
            id="about-counters"
            aria-label="Landscape achievements"
            className="bg-white"
        >
            <div className="section-container">
                <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 xl:gap-10">
                    {counters.map((item) => (
                        <li
                            key={item.label}
                            className="flex items-center gap-4 sm:gap-5"
                        >
                            <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-secondary sm:size-[4.5rem]">
                                {item.type === "trophy" ? (
                                    <FaTrophy
                                        aria-hidden
                                        className="size-7 text-white sm:size-8"
                                    />
                                ) : (
                                    <Image
                                        src={item.icon}
                                        alt=""
                                        width={36}
                                        height={36}
                                        unoptimized
                                        className={item.iconClassName}
                                        aria-hidden
                                    />
                                )}
                            </div>

                            <div>
                                <p className="text-3xl font-bold leading-none tracking-tight text-primary sm:text-4xl">
                                    {item.value}
                                </p>
                                <p className="mt-2 text-sm text-primary/75 sm:text-[15px]">
                                    {item.label}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
