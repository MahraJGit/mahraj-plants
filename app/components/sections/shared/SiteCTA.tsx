"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { HiOutlinePhone } from "react-icons/hi";
import Button from "@/app/components/ui/Button";
import Reveal from "@/app/components/ui/Reveal";

export default function SiteCTA() {
    const [email, setEmail] = useState("");

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setEmail("");
    }

    return (
        <section
            id="consultation"
            aria-labelledby="site-cta-heading"
            className="grid lg:grid-cols-2"
        >
            <div className="relative isolate flex min-h-[20rem] items-center overflow-hidden sm:min-h-[22rem]">
                <Image
                    src="/images/home/bg-consultation.webp"
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    aria-hidden
                />
                <div
                    aria-hidden
                    className="absolute inset-0 bg-primary/70"
                />

                <div className="section-container relative py-12 lg:py-16">
                    <Reveal>
                        <h2
                            id="site-cta-heading"
                            className="max-w-md text-[26px] leading-[1.15] font-bold tracking-[-2%] text-white sm:text-3xl lg:text-[34px]"
                        >
                            Ready To Elevate Your Landscape With Mahraj Plants?
                        </h2>

                        <div className="mt-8 flex flex-wrap items-center gap-4">
                            <Button
                                variant="secondary"
                                className="rounded-lg px-8 py-3.5"
                            >
                                Get a Free Consultation
                            </Button>

                            <a
                                href="tel:+966556891877"
                                className="inline-flex items-center gap-3 text-white transition hover:text-secondary"
                            >
                                <span className="flex size-11 items-center justify-center rounded-full bg-secondary text-white">
                                    <HiOutlinePhone aria-hidden className="size-5" />
                                </span>
                                <span className="text-sm font-medium sm:text-base">
                                    +966 55 689 1877
                                </span>
                            </a>
                        </div>
                    </Reveal>
                </div>
            </div>

            <div className="relative isolate flex min-h-[20rem] items-center overflow-hidden bg-primary sm:min-h-[22rem]">
                <Image
                    src="/images/home/aboutImg.webp"
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-[70%_center]"
                    aria-hidden
                />
                <div
                    aria-hidden
                    className="absolute inset-0 bg-primary/85"
                />

                <div className="section-container relative py-12 lg:py-16">
                    <Reveal delayMs={100}>
                        <p className="flex items-center gap-2">
                            <Image
                                src="/icons/leaf.svg"
                                alt=""
                                width={24}
                                height={18}
                                unoptimized
                                className="h-4 w-auto brightness-0 invert"
                            />
                            <span className="font-script text-[26px] leading-none text-white sm:text-[30px]">
                                Expert Gardening &amp; Sustainable Living
                            </span>
                        </p>

                        <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                            Insights
                        </h3>

                        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80 sm:text-[15px]">
                            Receive curated gardening strategies, seasonal planting guides,
                            and practical eco-friendly updates. Stay ahead with
                            expert-backed sustainable practices delivered straight to your
                            inbox.
                        </p>

                        <form
                            onSubmit={handleSubmit}
                            className="mt-8 flex max-w-md overflow-hidden rounded-full bg-white shadow-lg"
                        >
                            <label htmlFor="site-newsletter-email" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="site-newsletter-email"
                                type="email"
                                required
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="Enter your email here ..."
                                className="min-w-0 flex-1 bg-transparent px-5 py-3.5 text-sm text-primary outline-none placeholder:text-primary/45"
                            />
                            <button
                                type="submit"
                                className="flex shrink-0 cursor-pointer items-center gap-2 bg-secondary px-6 py-3.5 text-sm font-medium text-white transition hover:bg-secondary/90"
                            >
                                Submit
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
                        </form>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
