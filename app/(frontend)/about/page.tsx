import type { Metadata } from "next";
import AboutHero from "../../components/sections/about/AboutHero";
import AboutQuote from "../../components/sections/about/AboutQuote";
import AboutWhoWeAre from "../../components/sections/about/AboutWhoWeAre";
import AboutGallery from "../../components/sections/about/AboutGallery";
import AboutExpertise from "../../components/sections/about/AboutExpertise";
import AboutCounters from "../../components/sections/about/AboutCounters";
import AboutWhyChooseUs from "../../components/sections/about/AboutWhyChooseUs";
import AboutTeam from "../../components/sections/about/AboutTeam";
import Features, {
    type FeatureCard,
} from "../../components/sections/home/Features";
import Consultation from "../../components/sections/home/Consultation";

export const metadata: Metadata = {
    title: "About Us | Mahraj Plants",
    description:
        "Built with care, grown with love. Learn how Mahraj Plants shapes green spaces that reflect your values and bring nature closer to home.",
};

const aboutFeatureCards: FeatureCard[] = [
    {
        icon: "/icons/consultation.svg",
        title: "Free Consultation",
        description:
            "Start your project with confidence. Our free consultation helps you explore ideas, understand options, and receive expert guidance tailored to your outdoor space",
    },
    {
        icon: "/icons/execution.svg",
        title: "Professional Execution",
        description:
            "We bring great designs to life through expert execution — combining technical precision, timely delivery, and lasting quality in every outdoor project.",
    },
    {
        icon: "/icons/gurantee.svg",
        title: "Plant Warranty",
        description:
            "We stand behind the quality of every plant we install. Our plant warranty ensures peace of mind, offering replacements for plants that don't thrive",
    },
    {
        icon: "/icons/reliable.svg",
        title: "On-Time Service",
        description:
            "Your time matters. We pride ourselves on punctual scheduling and reliable service, ensuring your project stays on track and finishes as promised",
    },
];

export default function AboutPage() {
    return (
        <>
            <AboutHero />
            <Features
                cards={aboutFeatureCards}
                id="about-features"
                aria-label="What you can expect from Mahraj Plants"
            />
            <AboutQuote />
            <AboutWhoWeAre />
            <AboutGallery />
            <AboutExpertise />
            <AboutCounters />
            <AboutWhyChooseUs />
            <AboutTeam />
            <Consultation variant="newsletter" />
        </>
    );
}
