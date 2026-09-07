import Image from "next/image";
import { cn } from "@/app/lib/utils";

export type ProcessStep = {
    number: string;
    title: string;
    description: string;
    icon?: string;
};

type ProcessCardProps = {
    step: ProcessStep;
    className?: string;
};

const cardShape =
    "rounded-tl-[2.75rem] rounded-br-[2.75rem] rounded-tr-none rounded-bl-none";

export default function ProcessCard({ step, className }: ProcessCardProps) {
    return (
        <div
            className={cn(
                "group mx-auto h-[20rem] w-full min-w-0 shrink-0 [perspective:1200px] sm:h-[22rem]",
                className,
            )}
            tabIndex={0}
        >
            <div
                className={cn(
                    "relative h-full w-full [transform-style:preserve-3d] transition-transform duration-700 ease-in-out motion-reduce:transition-none",
                    "group-hover:[transform:rotateY(180deg)] group-focus-visible:[transform:rotateY(180deg)]",
                )}
            >
                {/* Front — number + gold line + title */}
                <div
                    className={cn(
                        "absolute inset-0 flex flex-col bg-linear-to-b from-primary to-[#14351A] px-5 py-8 shadow-[0_18px_40px_rgba(10,37,14,0.22)] [backface-visibility:hidden] sm:px-6",
                        cardShape,
                    )}
                >
                    <span className="text-center text-[4rem] font-bold leading-none text-white/20 sm:text-[4.5rem]">
                        {step.number}
                    </span>

                    <span
                        aria-hidden
                        className="mx-auto mt-5 block h-0.5 w-12 rounded-full bg-[#C4A862]"
                    />

                    <h3 className="mt-auto text-center text-base font-bold leading-snug text-white sm:text-lg">
                        {step.title}
                    </h3>
                </div>

                {/* Back — title + leaf + description */}
                <div
                    className={cn(
                        "absolute inset-0 flex flex-col items-center justify-center bg-cream px-5 py-6 text-center shadow-[0_18px_40px_rgba(10,37,14,0.12)] [backface-visibility:hidden] [transform:rotateY(180deg)] sm:px-6",
                        cardShape,
                    )}
                >
                    <h3 className="text-base font-bold leading-snug text-primary sm:text-lg">
                        {step.title}
                    </h3>

                    <Image
                        src={step.icon ?? "/icons/singleLeaf.svg"}
                        alt=""
                        width={28}
                        height={28}
                        unoptimized
                        style={{ width: "auto" }}
                        className="mt-4 h-6 w-auto"
                    />

                    <p className="mt-4 text-sm leading-relaxed text-primary/75">
                        {step.description}
                    </p>
                </div>
            </div>
        </div>
    );
}
