"use client";

import { useTranslations } from "@/app/lib/i18n";

const MAP_EMBED_SRC =
    "https://maps.google.com/maps?q=Mahraj%20landscaping%20%26%20Nursery%20company%2C%20FXFM%2BJCF%2C%20Al%20Kharj%20Rd%2C%20Hyt%2C%20Riyadh%2014368%2C%20Saudi%20Arabia&t=m&z=12&output=embed&iwloc=near";

export default function ContactMap() {
    const { t } = useTranslations("contactPage.map");

    return (
        <section
            id="contact-map"
            aria-label={t("ariaLabel")}
            className="w-full"
        >
            <iframe
                title={t("iframeTitle")}
                src={MAP_EMBED_SRC}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="block h-[22rem] w-full border-0 sm:h-[26rem] lg:h-[32rem]"
            />
        </section>
    );
}
