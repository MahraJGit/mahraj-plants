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
import { getDictionary } from "@/app/lib/i18n/get-dictionary";
import { getLocale } from "@/app/lib/i18n/get-locale";

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getLocale();
    const dictionary = await getDictionary(locale);

    return {
        title: dictionary.aboutPage.metaTitle,
        description: dictionary.aboutPage.metaDescription,
    };
}

export default function AboutPage() {
    return (
        <>
            <AboutHero />
            <AboutFeatures />
            <AboutQuote />
            <AboutWhoWeAre />
            <AboutGallery />
            <AboutExpertise />
            <AboutCounters />
            <AboutWhyChooseUs />
            <AboutTeam />
            <SiteCTA />
        </>
    );
}
