import type { Metadata } from "next";
import ServicesHero from "@/app/components/sections/services/ServicesHero";
import WhyChooseTeam from "@/app/components/sections/services/WhyChooseTeam";
import ServicesGrid from "@/app/components/sections/services/ServicesGrid";
import ServicesTestimonials from "@/app/components/sections/services/ServicesTestimonials";
import SiteCTA from "@/app/components/sections/shared/SiteCTA";
import JsonLd from "@/app/components/seo/JsonLd";
import { getServicesMessages } from "@/app/lib/i18n/services-catalog";
import { getDictionary } from "@/app/lib/i18n/get-dictionary";
import { getLocale } from "@/app/lib/i18n/get-locale";
import {
    breadcrumbJsonLd,
    graphJsonLd,
    organizationJsonLd,
    webPageJsonLd,
    websiteJsonLd,
} from "@/app/lib/seo/json-ld";
import { buildPageMetadata } from "@/app/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getLocale();
    const messages = getServicesMessages(locale);

    return buildPageMetadata({
        title: messages.detail.pageMetaTitle,
        description: messages.detail.pageMetaDescription,
        path: "/our-services",
        locale,
        image: "/images/home/hero-bg-1.jpg",
    });
}

export default async function ServicesPage() {
    const locale = await getLocale();
    const dictionary = await getDictionary(locale);
    const messages = getServicesMessages(locale);

    return (
        <>
            <JsonLd
                data={graphJsonLd(
                    organizationJsonLd(),
                    websiteJsonLd(),
                    webPageJsonLd({
                        title: messages.detail.pageMetaTitle,
                        description: messages.detail.pageMetaDescription,
                        path: "/our-services",
                    }),
                    breadcrumbJsonLd([
                        { name: dictionary.nav.home, path: "/" },
                        { name: dictionary.nav.services, path: "/our-services" },
                    ]),
                )}
            />
            <ServicesHero />
            <WhyChooseTeam />
            <ServicesGrid />
            <ServicesTestimonials />
            <SiteCTA />
        </>
    );
}
