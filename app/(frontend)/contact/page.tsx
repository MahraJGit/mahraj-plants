import type { Metadata } from "next";
import ContactHero from "@/app/components/sections/contact/ContactHero";
import ContactFormSection from "@/app/components/sections/contact/ContactFormSection";
import ContactOperatingHours from "@/app/components/sections/contact/ContactOperatingHours";
import ContactMap from "@/app/components/sections/contact/ContactMap";
import SiteCTA from "@/app/components/sections/shared/SiteCTA";
import { getDictionary } from "@/app/lib/i18n/get-dictionary";
import { getLocale } from "@/app/lib/i18n/get-locale";

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getLocale();
    const dictionary = await getDictionary(locale);

    return {
        title: dictionary.contactPage.metaTitle,
        description: dictionary.contactPage.metaDescription,
    };
}

export default function ContactPage() {
    return (
        <>
            <ContactHero />
            <ContactFormSection />
            <ContactOperatingHours />
            <ContactMap />
            <SiteCTA />
        </>
    );
}
