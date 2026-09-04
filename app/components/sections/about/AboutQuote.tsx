import Image from "next/image";

export default function AboutQuote() {
    return (
        <section
            aria-label="Garden philosophy"
            className="bg-white"
        >
            <div className="section-container">
                <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
                    <Image
                        src="/icons/lawn-mower.svg"
                        alt=""
                        width={67}
                        height={55}
                        unoptimized
                        className="h-12 w-auto sm:h-14"
                        aria-hidden
                    />

                    <blockquote className="mt-6 font-script text-[22px] leading-snug text-primary sm:text-[28px] sm:leading-relaxed lg:text-[32px]">
                        <p>
                            To tend a garden is to nurture more than plants — it
                            is to grow patience, presence, and a love for
                            life&apos;s quiet miracles, unfolding leaf by leaf,
                            reminding us how beauty is sown in stillness and
                            blossoms with care.
                        </p>
                    </blockquote>
                </div>
            </div>
        </section>
    );
}
