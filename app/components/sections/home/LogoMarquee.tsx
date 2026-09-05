"use client";

import { useTranslations } from "@/app/lib/i18n";

const logos = [
    {
        src: "/icons/cytozyme.svg",
        alt: "Cytozyme",
        width: 169,
        height: 67,
    },
    {
        src: "/icons/olive-garden.svg",
        alt: "Olive Garden",
        width: 168,
        height: 58,
    },
    {
        src: "/icons/fortgreen.svg",
        alt: "Fortgreen",
        width: 173,
        height: 54,
    },
    {
        src: "/icons/brudden.svg",
        alt: "Brudden",
        width: 185,
        height: 35,
    },
    {
        src: "/icons/spring.svg",
        alt: "Spring",
        width: 192,
        height: 51,
    },
    {
        src: "/icons/national-trust.svg",
        alt: "National Trust",
        width: 177,
        height: 53,
    },
];

const LOGO_GAP = 96;

function LogoMark({
    src,
    alt,
    width,
    height,
}: {
    src: string;
    alt: string;
    width: number;
    height: number;
}) {
    return (
        <div
            role="img"
            aria-label={alt}
            className="shrink-0 bg-secondary"
            style={{
                width,
                height,
                WebkitMaskImage: `url(${src})`,
                maskImage: `url(${src})`,
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
            }}
        />
    );
}

export default function LogoMarquee() {
    const { t } = useTranslations("home.logos");
    const marqueeLogos = [...logos, ...logos];

    return (
        <section
            aria-label={t("ariaLabel")}
            className="overflow-hidden bg-white py-10 lg:py-14"
        >
            <div
                className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden"
                aria-hidden
                dir="ltr"
            >
                <div
                    className="logo-marquee-track flex w-max items-center"
                    style={{ gap: LOGO_GAP }}
                >
                    {marqueeLogos.map((logo, index) => (
                        <LogoMark
                            key={`${logo.alt}-${index}`}
                            src={logo.src}
                            alt={logo.alt}
                            width={logo.width}
                            height={logo.height}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
