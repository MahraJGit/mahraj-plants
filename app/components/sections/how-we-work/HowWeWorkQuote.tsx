import Image from "next/image";

export default function HowWeWorkQuote() {
    return (
        <section aria-label="Working process philosophy" className="bg-white">
            <div className="section-container">
                <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
                    <Image
                        src="/icons/lawn-mower.svg"
                        alt=""
                        width={67}
                        height={55}
                        unoptimized
                        style={{ width: "auto" }}
                        className="h-12 w-auto sm:h-14"
                        aria-hidden
                    />

                    <blockquote className="mt-6 font-script text-[22px] leading-snug text-primary sm:text-[28px] sm:leading-relaxed lg:text-[32px]">
                        <p>
                            &ldquo;Behind every thriving garden is a careful
                            journey — where ideas take root, skilled hands shape
                            the space, and every detail is crafted to help nature
                            shine.&rdquo;
                        </p>
                    </blockquote>
                </div>
            </div>
        </section>
    );
}
