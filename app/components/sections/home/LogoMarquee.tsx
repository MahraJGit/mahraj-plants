"use client";

import Image from "next/image";
import { useTranslations } from "@/app/lib/i18n";

const logos = [
    {
        src: "/images/home/LogoMarquee/Emaar-logo.png",
        alt: "Cytozyme",
        width: 169,
        height: 67,
    },
    {
        src: "/images/home/LogoMarquee/green-riyadh-.png",
        alt: "Olive Garden",
        width: 169,
        height: 67,
    },
    {
        src: "/images/home/LogoMarquee/Logo.png",
        alt: "Fortgreen",
        width: 169,
        height: 67,
    },
    {
        src: "/images/home/LogoMarquee/moc-logo.jpg",
        alt: "Brudden",
        width: 169,
        height: 67,
    },
    {
        src: "/images/home/LogoMarquee/Nakheel-logo.png",
        alt: "Spring",
        width: 169,
        height: 67,
    },
    {
        src: "/images/home/LogoMarquee/National-Water-Company.png",
        alt: "National Trust",
        width: 169,
        height: 67,
    },
    {
        src: "/images/home/LogoMarquee/Sela-logo.png",
        alt: "National Trust",
        width: 169,
        height: 67,
    },
];

const LOGO_GAP = 96;

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
                        <div
                            key={`${logo.alt}-${index}`}
                            className="relative shrink-0 flex items-center justify-center"
                            style={{ width: logo.width, height: logo.height }}
                        >
                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                fill
                                sizes={`${logo.width}px`}
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}