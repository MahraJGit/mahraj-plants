import type { Metadata } from "next";
import HowWeWorkHero from "@/app/components/sections/how-we-work/HowWeWorkHero";
import HowWeWorkQuote from "@/app/components/sections/how-we-work/HowWeWorkQuote";
import HowWeWorkSteps from "@/app/components/sections/how-we-work/HowWeWorkSteps";
import Portfolio from "@/app/components/sections/shared/Portfolio";
import SiteCTA from "@/app/components/sections/shared/SiteCTA";

export const metadata: Metadata = {
    title: "Our Working Process | Mahraj Plants",
    description:
        "We follow a clear, simple process to create gardens that grow beautifully — shaped with care and creativity at every step.",
};

export default function WorkingProcessPage() {
    return (
        <>
            <HowWeWorkHero />
            <HowWeWorkQuote />
            <HowWeWorkSteps />
            <div className="mb-16">
            <Portfolio variant="cream" />
            </div>
            <SiteCTA />
        </>
    );
}