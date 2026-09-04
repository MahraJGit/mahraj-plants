"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { HiChevronRight } from "react-icons/hi";
import Button from "../../ui/Button";
import { cn } from "@/app/lib/utils";

const PHONE_DISPLAY = "+966 55 689 1877";
const PHONE_HREF = "tel:+966556891877";

type ConsultationProps = {
    /** `default` = current home CTA. `newsletter` = consultation + phone + email signup. */
    variant?: "default" | "newsletter";
};

export default function Consultation({
    variant = "default",
}: ConsultationProps) {
    if (variant === "newsletter") {
        return <NewsletterConsultation />;
    }

    return <DefaultConsultation />;
}

function DefaultConsultation() {
    return (
        <section
            id="consultation"
            aria-labelledby="consultation-heading"
            className="relative isolate overflow-hidden"
        >
            <Image
                src="/images/home/bg-consultation.webp"
                alt=""
                fill
                sizes="100vw"
                className="object-cover object-[70%_center] lg:object-center"
                aria-hidden
            />

            <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/45 lg:from-primary/92 lg:via-primary/70 lg:to-primary/35"
            />

            <div className="section-container relative">
                <div className="max-w-xl lg:max-w-2xl">
                    <h2
                        id="consultation-heading"
                        className="text-[28px] leading-[1.15] font-bold tracking-[-2%] text-white sm:text-4xl lg:text-[42px]"
                    >
                        Ready To Elevate Your Landscape With Mahraj Plants?
                    </h2>

                    <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/90 sm:text-base">
                        From custom garden design to ongoing care, our experts
                        are here to turn your vision into a thriving green
                        oasis.
                    </p>

                    <Button
                        variant="primary"
                        className="mt-8 rounded-lg px-8 py-3.5 sm:mt-10"
                    >
                        Get a Free Consultation
                    </Button>
                </div>
            </div>
        </section>
    );
}

function NewsletterConsultation() {
    const [email, setEmail] = useState("");

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setEmail("");
    }

    return (
        <section
            id="consultation"
            aria-labelledby="consultation-heading"
            className="relative isolate overflow-hidden"
        >
            <Image
                src="/images/home/bg-consultation.webp"
                alt=""
                fill
                sizes="100vw"
                className="object-cover object-[70%_center] lg:object-center"
                aria-hidden
            />

            <div className="relative grid lg:grid-cols-2">
                <div className="relative flex flex-col justify-center px-4 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20 xl:px-16">
                    <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-r from-primary/75 via-primary/45 to-transparent"
                    />

                    <div className="relative z-10 mx-auto w-full max-w-xl lg:mx-0 lg:max-w-lg">
                        <h2
                            id="consultation-heading"
                            className="text-[28px] leading-[1.15] font-bold tracking-[-2%] text-white sm:text-4xl lg:text-[40px] xl:text-[42px]"
                        >
                            Ready To Elevate Your Landscape With Mahraj Plants?
                        </h2>

                        <div className="mt-8 flex flex-col gap-5 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
                            <Button
                                variant="secondary"
                                className="rounded-md px-7 py-3.5 text-sm sm:text-base"
                            >
                                Get a Free Consultation
                            </Button>

                            <a
                                href={PHONE_HREF}
                                className="inline-flex items-center gap-3 text-white transition hover:text-white/90"
                            >
                                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/20 text-white ring-1 ring-white/30 backdrop-blur-sm sm:size-12">
                                    <FaPhoneAlt
                                        aria-hidden
                                        className="size-4 sm:size-[1.125rem]"
                                    />
                                </span>
                                <span className="text-base font-medium tracking-wide sm:text-lg">
                                    {PHONE_DISPLAY}
                                </span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="relative flex flex-col justify-center bg-section/92 px-4 py-14 sm:px-8 sm:py-16 lg:bg-section/88 lg:px-10 lg:py-20 xl:px-12">
                    <div className="relative z-10 mx-auto w-full max-w-xl lg:mx-0 lg:max-w-md xl:max-w-lg">
                        <p className="flex items-start gap-2.5 sm:gap-3">
                            <Image
                                src="/icons/singleLeaf.svg"
                                alt=""
                                width={14}
                                height={21}
                                unoptimized
                                className="mt-1.5 h-5 w-auto shrink-0 sm:mt-2 sm:h-6"
                                aria-hidden
                            />
                            <span className="font-script text-[28px] leading-[1.15] text-white sm:text-[34px] lg:text-[38px] xl:text-[42px]">
                                Expert Gardening &amp; Sustainable Living
                                Insights
                            </span>
                        </p>

                        <p className="mt-5 text-sm leading-relaxed text-white/80 sm:mt-6 sm:text-[15px]">
                            Receive Curated Gardening Strategies, Seasonal
                            Planting Guides, And Practical Eco-Friendly Updates.
                            Stay Ahead With Expert-Backed Sustainable Practices
                            Delivered Straight To Your Inbox.
                        </p>

                        <form
                            onSubmit={handleSubmit}
                            className="mt-8 flex overflow-hidden rounded-md bg-white shadow-[0_8px_24px_rgba(0,0,0,0.18)] sm:mt-10"
                        >
                            <label htmlFor="newsletter-email" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="newsletter-email"
                                type="email"
                                name="email"
                                required
                                autoComplete="email"
                                placeholder="Enter your email here ..."
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-sm text-primary outline-none placeholder:text-primary/40 sm:px-5 sm:text-base"
                            />
                            <button
                                type="submit"
                                className={cn(
                                    "inline-flex shrink-0 cursor-pointer items-center gap-1.5 bg-secondary px-5 py-3.5 text-sm font-medium text-white transition hover:bg-secondary/90 sm:gap-2 sm:px-6 sm:text-base",
                                )}
                            >
                                Submit
                                <HiChevronRight
                                    aria-hidden
                                    className="size-5"
                                />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
