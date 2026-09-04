import type { Metadata } from "next";
import ServicesHero from "@/app/components/sections/services/ServicesHero";
import WhyChooseTeam from "@/app/components/sections/services/WhyChooseTeam";
import ServicesGrid from "@/app/components/sections/services/ServicesGrid";
import ServicesTestimonials from "@/app/components/sections/services/ServicesTestimonials";
import ServicesPricing from "@/app/components/sections/services/ServicesPricing";
import SiteCTA from "@/app/components/sections/shared/SiteCTA";

export const metadata: Metadata = {
    title: "Services | Mahraj Plants",
    description:
        "Explore Mahraj Plants landscaping services — from design and irrigation to maintenance, hardscaping, and outdoor finishing.",
};

export default function ServicesPage() {
    return (
        <>
            <ServicesHero />
            <WhyChooseTeam />
            <ServicesGrid />
            <ServicesTestimonials />
            {/* <ServicesPricing /> */}
            <SiteCTA />
        </>
    );
}
