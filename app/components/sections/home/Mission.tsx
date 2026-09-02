import Image from "next/image";

export default function Mission() {
    return (
        <section
            id="mission"
            aria-labelledby="vision-heading"
            className="bg-cream/40"
        >
            <div className="section-container">
                <div className="grid items-stretch gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 xl:gap-16">
                    <div className="flex flex-col justify-center lg:order-1">
                        <div>
                            <h2
                                id="vision-heading"
                                className="text-[22px] font-bold leading-tight tracking-[-2%] text-primary sm:text-2xl lg:text-[28px]"
                            >
                                Our Vision
                            </h2>
                            <p className="mt-4 text-sm leading-relaxed text-primary/70 sm:text-base">
                                To be the leading name in sustainable green design,
                                transforming urban and suburban spaces into thriving,
                                vibrant eco-sanctuaries that connect people back to
                                nature.
                            </p>
                        </div>

                        <div
                            aria-hidden
                            className="my-7 border-t border-dotted border-[#C4A862]/70 sm:my-8"
                        />

                        <div>
                            <h2
                                id="mission-heading"
                                className="text-[22px] font-bold leading-tight tracking-[-2%] text-primary sm:text-2xl lg:text-[28px]"
                            >
                                Our Mission
                            </h2>
                            <p className="mt-4 text-sm leading-relaxed text-primary/70 sm:text-base">
                                At Mahraj Plants &amp; Landscaping, our mission is to
                                deliver exceptional botanical quality and custom outdoor
                                design through expert craftsmanship, eco-friendly
                                irrigation, and dedicated plant care making beautiful
                                green spaces accessible, effortless, and lasting for every
                                client.
                            </p>
                        </div>
                    </div>

                    <div className="relative mx-auto h-full min-h-[22rem] w-full sm:min-h-[26rem] lg:order-2 lg:mx-0">
                        <div className="absolute inset-0 overflow-hidden rounded-tr-[2.5rem] rounded-bl-[2.5rem] shadow-[0_20px_50px_rgba(10,37,14,0.12)] sm:rounded-tr-[3rem] sm:rounded-bl-[3rem]">
                            <Image
                                src="/images/home/our-mission.webp"
                                alt="Mahraj Plants team working on sustainable garden landscaping"
                                fill
                                sizes="(max-width: 1024px) 100vw, 55vw"
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
