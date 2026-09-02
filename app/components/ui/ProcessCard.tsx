import Image from "next/image";
import { cn } from "@/app/lib/utils";

export type ProcessStep = {
    number: string;
    title: string;
    description: string;
    icon: string;
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
                "group mx-auto h-[21rem] w-full max-w-[16.5rem] sm:h-[22.5rem] sm:max-w-[17.5rem] [perspective:1200px]",
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
                <div
                    className={cn(
                        "absolute inset-0 flex flex-col bg-secondary p-6 [backface-visibility:hidden]",
                        cardShape,
                    )}
                >
                    <span className="text-center text-[4rem] font-bold leading-none text-white/20 sm:text-[4.5rem]">
                        {step.number}
                    </span>

                    <div className="flex flex-1 items-center justify-center">
                        <div className="flex size-28 items-center justify-center rounded-full border border-dashed border-white/70 sm:size-[7.5rem]">
                            <div className="flex size-[4.5rem] items-center justify-center rounded-full bg-primary sm:size-20">
                                <Image
                                    src={step.icon}
                                    alt=""
                                    width={36}
                                    height={36}
                                    unoptimized
                                    className="h-8 w-auto brightness-0 invert sm:h-9"
                                />
                            </div>
                        </div>
                    </div>

                    <h3 className="text-center text-base font-bold leading-snug text-white sm:text-lg">
                        {step.title}
                    </h3>
                </div>

                <div
                    className={cn(
                        "absolute inset-0 flex flex-col items-center justify-center bg-white px-5 py-6 text-center shadow-[0_0_60px_rgba(255,255,255,0.45)] [backface-visibility:hidden] [transform:rotateY(180deg)] sm:px-6",
                        cardShape,
                    )}
                >
                    <h3 className="text-base font-bold leading-snug text-primary sm:text-lg">
                        {step.title}
                    </h3>

                    <Image
                        src="/icons/singleLeaf.svg"
                        alt=""
                        width={14}
                        height={21}
                        unoptimized
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
