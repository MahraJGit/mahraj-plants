import type { Metadata } from "next";
import ContactHero from "@/app/components/sections/contact/ContactHero";
import ContactFormSection from "@/app/components/sections/contact/ContactFormSection";
import ContactOperatingHours from "@/app/components/sections/contact/ContactOperatingHours";
import ContactMap from "@/app/components/sections/contact/ContactMap";
import SiteCTA from "@/app/components/sections/shared/SiteCTA";
import JsonLd from "@/app/components/seo/JsonLd";
import { getDictionary } from "@/app/lib/i18n/get-dictionary";
import { getLocale } from "@/app/lib/i18n/get-locale";
import {
    breadcrumbJsonLd,
    graphJsonLd,
    localBusinessJsonLd,
    organizationJsonLd,
    webPageJsonLd,
    websiteJsonLd,
} from "@/app/lib/seo/json-ld";
import { buildPageMetadata } from "@/app/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getLocale();
    const dictionary = await getDictionary(locale);

    return buildPageMetadata({
        title: dictionary.contactPage.metaTitle,
        description: dictionary.contactPage.metaDescription,
        path: "/contact",
        locale,
        image: "/images/contact/hero-bg.webp",
        imageAlt: dictionary.contactPage.hero.title,
    });
}

export default async function ContactPage() {
    const locale = await getLocale();
    const dictionary = await getDictionary(locale);

    return (
        <>
            <JsonLd
                data={graphJsonLd(
                    organizationJsonLd(),
                    localBusinessJsonLd(),
                    websiteJsonLd(),
                    webPageJsonLd({
                        title: dictionary.contactPage.metaTitle,
                        description: dictionary.contactPage.metaDescription,
                        path: "/contact",
                    }),
                    breadcrumbJsonLd([
                        { name: dictionary.nav.home, path: "/" },
                        { name: dictionary.nav.contact, path: "/contact" },
                    ]),
                )}
            />
            <ContactHero />
            <ContactFormSection />
            <ContactOperatingHours />
            <ContactMap />
            <SiteCTA copy={dictionary.contactPage.siteCta} />
        </>
    );
}
