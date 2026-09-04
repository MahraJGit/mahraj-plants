import Image from "next/image";

export default function ProductHero() {
    return (
        <section
            aria-labelledby="product-hero-heading"
            className="relative isolate flex min-h-[20rem] items-center overflow-hidden sm:min-h-[22rem] lg:min-h-[26rem]"
        >
            <Image
                src="/images/product-detail/bg-product-detail.webp"
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover"
                aria-hidden
            />
            <div aria-hidden className="absolute inset-0 bg-primary/50" />

            <div className="hero-content relative z-10 w-full py-12 sm:py-16">
                <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
                    <Image
                        src="/icons/singleLeaf.svg"
                        alt=""
                        width={14}
                        height={21}
                        unoptimized
                        className="mx-auto h-6 w-auto"
                        aria-hidden
                    />

                    <p className="mt-4 font-script text-[26px] leading-none text-white sm:text-[32px] lg:text-[36px]">
                        Garden Shop
                    </p>

                    <p
                        id="product-hero-heading"
                        className="mt-4 text-[32px] font-bold leading-tight text-white sm:text-[40px] lg:text-[48px]"
                    >
                        Tools, Plants &amp; Green Essentials
                    </p>

                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base lg:text-lg">
                        Find tools, care products, and garden accessories to
                        help your green space thrive — practical, stylish, and
                        nature-friendly.
                    </p>
                </div>
            </div>
        </section>
    );
}
