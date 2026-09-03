import type { Service } from "@/app/components/ui";

export const services: Service[] = [
    {
        slug: "landscape-design-planning",
        title: "Landscape Design & Planning",
        description:
            "Thoughtfully designed outdoor spaces that blend beauty, function, and nature—tailored just for you.",
        image: "/images/home/m-landscaping.webp",
        alt: "Landscaper working on a garden bed with flowering plants",
        icon: "/icons/consultation.svg",
        features: [
            "Custom garden layouts",
            "3D visual planning",
            "Plant Selection & Placement",
        ],
    },
    {
        slug: "irrigation-drainage-solutions",
        title: "Irrigation & Drainage Solutions",
        description:
            "Smart watering and drainage systems designed to keep your garden green, healthy, and flood-free.",
        image: "/images/home/m-outdoor.webp",
        alt: "Garden sprinkler watering a lush green lawn",
        icon: "/icons/green-solutions.svg",
        features: [
            "Automatic Irrigation Systems",
            "Smart Water Scheduling",
            "Garden Drainage Planning",
        ],
    },
    {
        slug: "green-maintenance-packages",
        title: "Green Maintenance Packages",
        description:
            "Year-round garden care made easy — from trimming to pest control, we keep your green space healthy.",
        image: "/images/home/hero-bg-3.jpg",
        alt: "Gardener trimming hedges in a landscaped garden",
        icon: "/icons/trees-plants.svg",
        features: [
            "Seasonal Lawn Care",
            "Pruning & Trimming Services",
            "Weed & Pest Management",
        ],
    },
    {
        slug: "hardscaping-lighting",
        title: "Hardscaping & Lighting",
        description:
            "Elegant pathways, patios, and lighting that add structure, safety, and ambiance to your outdoor space.",
        image: "/images/home/hero-bg-2.jpg",
        alt: "Stone patio pathway with garden lighting at dusk",
        icon: "/icons/execution.svg",
        features: [
            "Patios & Walkways",
            "Garden Lighting Design",
            "Stone & Paver Installation",
        ],
    },
    {
        slug: "gardening-plant-upgrade",
        title: "Gardening & Plant Upgrade",
        description:
            "Refresh your garden with curated plants, seasonal upgrades, and expert planting for lasting vibrancy.",
        image: "/images/home/m-indoor.webp",
        alt: "Modern rooftop patio with wooden furniture and planters",
        icon: "/icons/trees-plants.svg",
        features: [
            "Seasonal Planting Plans",
            "Garden Bed Renovation",
            "Premium Plant Selection",
        ],
    },
    {
        slug: "outdoor-maintenance-finishing",
        title: "Outdoor Maintenance & Finishing",
        description:
            "Complete outdoor care from cleanup to final touches — keeping every corner of your landscape pristine.",
        image: "/images/home/our-mission.webp",
        alt: "Professional gardener trimming a tall hedge",
        icon: "/icons/reliable.svg",
        features: [
            "Seasonal Cleanups",
            "Mulching & Edging",
            "Final Landscape Finishing",
        ],
    },
];

export const serviceHighlights = [
    {
        icon: "/icons/pesticide-free.svg",
        title: "Pesticide-Free Practices",
        description:
            "We use natural, chemical-free methods to keep your garden healthy and safe for families, pets, and the environment.",
        iconClassName: "brightness-0 invert",
    },
    {
        icon: "/icons/eco-friendly.svg",
        title: "Eco-Friendly Materials Only",
        description:
            "Every material we choose is sustainable and earth-conscious—from organic soil to responsibly sourced plants.",
        iconClassName: "brightness-0 invert",
    },
    {
        icon: "/icons/long-term.svg",
        title: "Long-Term Green Solutions",
        description:
            "Our solutions are built to last, helping your landscape thrive season after season with minimal waste.",
        iconClassName: "brightness-0 invert",
    },
    {
        icon: "/icons/sound-friendly.svg",
        title: "Sound-Friendly Garden Care",
        description:
            "Quiet, considerate garden care that respects your neighborhood and keeps outdoor spaces peaceful.",
        iconClassName: "brightness-0 invert",
    },
];

export const whyChooseFeatures = [
    {
        icon: "/icons/consultation.svg",
        label: "Expertise in Garden & Landscape Design",
    },
    {
        icon: "/icons/execution.svg",
        label: "Customized Solutions for Every Space",
    },
    {
        icon: "/icons/reliable.svg",
        label: "Reliable Service with Lasting Results",
    },
    {
        icon: "/icons/eco-friendly.svg",
        label: "Eco-Friendly and Sustainable Materials",
    },
];

export const teamFeatures = [
    {
        icon: "/icons/execution.svg",
        label: "Creatives at Heart and Hands",
    },
    {
        icon: "/icons/expert-team.svg",
        label: "Green Thinkers, Skilled Makers",
    },
    {
        icon: "/icons/trees-plants.svg",
        label: "Nature-Loving in Every Step",
    },
    {
        icon: "/icons/gurantee.svg",
        label: "Detail-Oriented Minds and Hands",
    },
];

export type ServicesTestimonial = {
    quote: string;
    name: string;
    location: string;
    image: string;
};

export const servicesTestimonials: ServicesTestimonial[] = [
    {
        quote: "What an incredible transformation! The whole crew was friendly, efficient, and clearly experienced. We now have a garden that looks like it came straight out of a magazine. Absolutely thrilled with the result!",
        name: "Lucas Bennett",
        location: "Queenstown, Otago",
        image: "/images/services/testimonial-1.webp",
    },
    {
        quote: "Great team all round. Very professional, courteous and fun to have around. We are very happy with our new garden and are looking forward to sitting outside and simply enjoying our beautiful, low maintenance garden. A big thank you to all the guys involved.",
        name: "Emily Rose",
        location: "Auckland, New Zealand",
        image: "/images/services/testimonial-2.webp",
    },
    {
        quote: "Brilliant work from a truly professional team. They were easy to communicate with, respected our space, and worked with real care. I now enjoy my morning coffee surrounded by greenery — it's my little slice of paradise!",
        name: "Mia Roberts",
        location: "Napier, Hawke's Bay",
        image: "/images/services/testimonial-3.webp",
    },
    {
        quote: "I really appreciate how the team handled everything — from planning to execution. Everyone was courteous, tidy, and focused. Our yard is now a space we're proud to show off to friends and family. Highly recommended!",
        name: "Ethan Clarke",
        location: "New Plymouth, Taranaki",
        image: "/images/services/testimonial-4.webp",
    },
    {
        quote: "From the first visit to the final cleanup, everything ran smoothly. The garden is not only low-maintenance but also full of charm and personality. It's exactly what I was hoping for. Big thanks to the whole team!",
        name: "Isla Mitchell",
        location: "Whangārei, Northland",
        image: "/images/services/testimonial-5.webp",
    },
];

export type PricingPackage = {
    name: string;
    price: number;
    currency: string;
    period: string;
    featured?: boolean;
    features: string[];
};

export const pricingPackages: PricingPackage[] = [
    {
        name: "Basic Package",
        price: 80,
        currency: "$",
        period: "/ month",
        features: [
            "Lawn mowing",
            "Hedge & shrub trimming",
            "Leaf blowing",
            "Basic weed control",
            "Garden tidying",
            "Monthly maintenance visit",
        ],
    },
    {
        name: "Premium Package",
        price: 150,
        currency: "$",
        period: "/ month",
        featured: true,
        features: [
            "All Basic Package services",
            "Soil aeration & fertilization",
            "Seasonal planting",
            "Decorative mulch or stone layering",
            "Garden bed re-shaping",
            "Pest & disease check",
            "Bi-monthly maintenance",
        ],
    },
    {
        name: "Elite Package",
        price: 400,
        currency: "$",
        period: "/ month",
        features: [
            "All Premium Package services",
            "Custom landscape design",
            "3D visual planning",
            "Water features (ponds, fountains, etc.)",
            "Automatic irrigation system",
            "Weekly maintenance & monitoring",
        ],
    },
];
