import type { Metadata } from "next";
import AboutHero from "@/app/components/sections/about/AboutHero";
import AboutQuote from "@/app/components/sections/about/AboutQuote";
import AboutWhoWeAre from "@/app/components/sections/about/AboutWhoWeAre";
import AboutGallery from "@/app/components/sections/about/AboutGallery";
import AboutExpertise from "@/app/components/sections/about/AboutExpertise";
import AboutCounters from "@/app/components/sections/about/AboutCounters";
import AboutWhyChooseUs from "@/app/components/sections/about/AboutWhyChooseUs";
import AboutTeam from "@/app/components/sections/about/AboutTeam";
import AboutFeatures from "@/app/components/sections/about/AboutFeatures";
import SiteCTA from "@/app/components/sections/shared/SiteCTA";
import JsonLd from "@/app/components/seo/JsonLd";
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
    const dictionary = await getDictionary(locale);

    return buildPageMetadata({
        title: dictionary.aboutPage.metaTitle,
        description: dictionary.aboutPage.metaDescription,
        path: "/about-us",
        locale,
        image: "/images/about/bg-about-us.webp",
        imageAlt: dictionary.aboutPage.hero.title,
    });
}

export default async function AboutPage() {
    const locale = await getLocale();
    const dictionary = await getDictionary(locale);

    return (
        <>
            <JsonLd
                data={graphJsonLd(
                    organizationJsonLd(),
                    websiteJsonLd(),
                    webPageJsonLd({
                        title: dictionary.aboutPage.metaTitle,
                        description: dictionary.aboutPage.metaDescription,
                        path: "/about-us",
                    }),
                    breadcrumbJsonLd([
                        { name: dictionary.nav.home, path: "/" },
                        { name: dictionary.nav.about, path: "/about-us" },
                    ]),
                )}
            />
            <AboutHero />
            <AboutFeatures />
            <AboutQuote />
            <AboutWhoWeAre />
            <AboutGallery />
            <AboutExpertise />
            <AboutCounters />
            <AboutWhyChooseUs />
            <AboutTeam />
            <SiteCTA copy={dictionary.aboutPage.siteCta} />
        </>
    );
}
