"use client";

import FeatureHighlights from "../../ui/FeatureHighlights";

const cards = [
    {
        icon: "/icons/consultation.svg",
        title: "Free Expert Consultation",
        description:
            "Share your vision with our horticultural specialists. We'll assess your space and recommend the best plants and outdoor designs at no cost.",
    },
    {
        icon: "/icons/execution.svg",
        title: "Flawless Landscaping Execution",
        description:
            "Our skilled gardeners handle everything from soil preparation to expert planting ensuring your outdoor space is crafted to perfection.",
    },
    {
        icon: "/icons/gurantee.svg",
        title: "Healthy Plant Guarantee",
        description:
            "We stand behind the quality of our greenery. Enjoy total peace of mind with guaranteed healthy, vibrant plants that are built to thrive.",
    },
    {
        icon: "/icons/reliable.svg",
        title: "Punctual & Reliable Service",
        description:
            "We deliver and transform your green space on schedule, maintaining clean work sites and respecting your time every step of the way.",
    },
];

export default function Features() {
    return (
        <section
            id="features"
            aria-label="Why choose Mahraj Plants"
            className="relative z-20 overflow-visible"
        >
            <div className="section-container pt-0">
                <div className="relative -mt-20 sm:-mt-24">
                    <FeatureHighlights items={cards} />
                </div>
            </div>
        </section>
    );
}
