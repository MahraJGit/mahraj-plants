import Image from "next/image";
import Link from "next/link";
import { ServiceCard } from "@/app/components/ui";
import { services } from "@/app/lib/services";

export default function Services() {
    return (
        <section
            id="services"
            aria-labelledby="services-heading"
            className="relative isolate overflow-hidden bg-section"
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[48px_48px]"
            />

            <div className="section-container relative">
                <header className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
                    <div className="max-w-3xl">
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
                            <span className="font-script text-[28px] leading-none text-white sm:text-[32px]">
                                Best Offer for You
                            </span>
                        </p>

                        <h2
                            id="services-heading"
                            className="mt-4 text-[28px] leading-[1.15] font-bold tracking-[-2%] text-white sm:text-4xl lg:text-[42px]"
                        >
                            Transforming Your Garden Space Into A Natural
                            Masterpiece
                        </h2>

                        <div className="mt-5 space-y-4 text-sm leading-relaxed text-white/75 sm:text-base">
                            <p>
                                We specialize in creating stunning outdoor
                                environments that reflect your unique style and
                                enhance your daily life. From initial concept to
                                final planting, every detail is handled with care.
                            </p>
                            <p>
                                Whether you need a complete landscape
                                transformation or ongoing garden maintenance, our
                                expert team delivers healthy, thriving green
                                spaces you&apos;ll love for years to come.
                            </p>
                        </div>
                    </div>

                    <Link
                        href="/services"
                        className="w-fit shrink-0 self-start rounded-lg bg-secondary px-8 py-3.5 text-base font-medium leading-[100%] tracking-[-1%] text-white transition-colors hover:bg-secondary/90 lg:mt-2"
                    >
                        View All Services →
                    </Link>
                </header>

                <ul className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-3 lg:gap-7">
                    {services.slice(0, 3).map((service) => (
                        <li key={service.title}>
                            <ServiceCard
                                service={service}
                                href={`/services/${service.slug}`}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
