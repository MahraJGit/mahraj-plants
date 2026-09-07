import type { Metadata } from "next";
import ServicesHero from "@/app/components/sections/services/ServicesHero";
import WhyChooseTeam from "@/app/components/sections/services/WhyChooseTeam";
import ServicesGrid from "@/app/components/sections/services/ServicesGrid";
import ServicesTestimonials from "@/app/components/sections/services/ServicesTestimonials";
import SiteCTA from "@/app/components/sections/shared/SiteCTA";
import { getServicesMessages } from "@/app/lib/i18n/services-catalog";
import { getLocale } from "@/app/lib/i18n/get-locale";

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getLocale();
    const messages = getServicesMessages(locale);

    return {
        title: messages.detail.pageMetaTitle,
        description: messages.detail.pageMetaDescription,
    };
}

export default function ServicesPage() {
    return (
        <>
            <ServicesHero />
            <WhyChooseTeam />
            <ServicesGrid />
            <ServicesTestimonials />
            <SiteCTA />
        </>
    );
}
