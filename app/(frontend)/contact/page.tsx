import type { Metadata } from "next";
import ContactHero from "../../components/sections/contact/ContactHero";
import ContactFormSection from "../../components/sections/contact/ContactFormSection";
import ContactMap from "../../components/sections/contact/ContactMap";
import SiteCTA from "@/app/components/sections/shared/SiteCTA";

export const metadata: Metadata = {
    title: "Contact Us | Mahraj Plants",
    description:
        "Reach out to Mahraj Plants for garden consultations, inquiries, or support. We're ready to help your outdoor vision grow.",
};

export default function ContactPage() {
    return (
        <>
            <ContactHero />
            <ContactFormSection />
            <ContactMap />
            <SiteCTA />
        </>
    );
}
