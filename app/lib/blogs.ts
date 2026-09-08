export type BlogArticle = {
    slug: string;
    title: string;
    excerpt: string;
    image: string;
    alt: string;
    day: string;
    month: string;
    author: string;
    comments: number;
    category: string;
    tags: string[];
};

export const blogCategories = [
    "DIY garden projects",
    "Garden Design Ideas",
    "Outdoor Living Inspiration",
    "Plant Care & Advice",
    "Seasonal Gardening Tips",
] as const;

export const blogTags = [
    "DIY",
    "Garden Design",
    "Landscaping Ideas",
    "Organic",
    "Plant Care",
    "Soil Health",
    "Tools",
    "Watering Tips",
] as const;

export const blogArticles: BlogArticle[] = [
    {
        slug: "behind-the-green-meet-our-team",
        title: "Behind The Green: Meet Our Talented Team",
        excerpt:
            "Get to know the passionate, skilled people behind Mahraj Landscaping's green transformations. From designers to gardeners, our team is dedicated to turning outdoor dreams into lush reality.",
        image: "/images/home/hero-bg-2.jpg",
        alt: "Mahraj Landscaping team working together in a garden nursery",
        day: "30",
        month: "JUN",
        author: "mahrajplant",
        comments: 0,
        category: "Outdoor Living Inspiration",
        tags: ["Garden Design", "Landscaping Ideas"],
    },
    {
        slug: "balcony-makeovers-decoded",
        title: "Balcony Makeovers Decoded: From Tiny Urban Space To Pocket-Sized Paradise",
        excerpt:
            "Small balconies can feel like full gardens with the right layout, planters, and plant choices. Here is how we turn compact urban spaces into calming green retreats.",
        image: "/images/home/m-outdoor.webp",
        alt: "Balcony garden overlooking a city skyline at sunset",
        day: "28",
        month: "JUN",
        author: "mahrajplant",
        comments: 0,
        category: "Garden Design Ideas",
        tags: ["Garden Design", "DIY"],
    },
    {
        slug: "garden-privacy-shielding-your-space",
        title: "Garden Privacy: Shielding Your Space While Staying Truly Connected",
        excerpt:
            "Privacy planting does not mean closing off your garden. Learn how hedges, trellises, and layered greenery create seclusion without losing light or openness.",
        image: "/images/home/m-landscaping.webp",
        alt: "Private garden with lush lawn and wooden seating",
        day: "25",
        month: "JUN",
        author: "mahrajplant",
        comments: 0,
        category: "Garden Design Ideas",
        tags: ["Landscaping Ideas", "Garden Design"],
    },
    {
        slug: "how-to-create-a-beautiful-balcony-garden",
        title: "How To Create A Beautiful Balcony Garden In A Small Space",
        excerpt:
            "You do not need a large yard to enjoy gardening. With smart planter placement, vertical greenery, and the right species, even the smallest balcony can become a vibrant oasis.",
        image: "/images/home/hero-bg-1.jpg",
        alt: "Small balcony filled with potted plants and flowers",
        day: "22",
        month: "JUN",
        author: "mahrajplant",
        comments: 1,
        category: "DIY garden projects",
        tags: ["DIY", "Garden Design"],
    },
    {
        slug: "seasonal-plant-care-all-year",
        title: "Seasonal Plant Care: Keeping Your Garden Thriving All Year",
        excerpt:
            "From spring planting to winter protection, a seasonal rhythm keeps gardens healthy. Our practical checklist covers watering, pruning, and soil care month by month.",
        image: "/images/home/hero-bg-3.jpg",
        alt: "Gardener tending plants in a landscaped outdoor space",
        day: "18",
        month: "JUL",
        author: "mahrajplant",
        comments: 2,
        category: "Seasonal Gardening Tips",
        tags: ["Plant Care", "Watering Tips", "Soil Health"],
    },
    {
        slug: "sustainable-garden-design-ideas",
        title: "Sustainable Garden Design Ideas For Modern Homes",
        excerpt:
            "Eco-friendly gardens combine native species, smart irrigation, and low-maintenance layouts. Discover design choices that look beautiful and respect the environment.",
        image: "/images/home/m-trees.webp",
        alt: "Sustainable garden with native trees and natural planting",
        day: "05",
        month: "JUL",
        author: "mahrajplant",
        comments: 1,
        category: "Garden Design Ideas",
        tags: ["Garden Design", "Organic", "Landscaping Ideas"],
    },
    {
        slug: "indoor-plants-for-better-air-quality",
        title: "Indoor Plants That Improve Air Quality And Mood",
        excerpt:
            "The right indoor plants do more than decorate — they freshen the air and create a calmer atmosphere. Explore our top picks for homes, offices, and shared workspaces.",
        image: "/images/home/m-indoor.webp",
        alt: "Indoor plants arranged in a bright living room",
        day: "02",
        month: "JUL",
        author: "mahrajplant",
        comments: 3,
        category: "Plant Care & Advice",
        tags: ["Plant Care", "Organic"],
    },
    {
        slug: "gift-ideas-for-plant-lovers",
        title: "Thoughtful Gift Ideas For Plant Lovers And Garden Enthusiasts",
        excerpt:
            "From curated planter sets to care kits and rare species, these gift ideas delight anyone who loves greenery — perfect for birthdays, housewarmings, and special occasions.",
        image: "/images/home/aboutImg.webp",
        alt: "Gift-wrapped plant and gardening accessories",
        day: "29",
        month: "JUN",
        author: "mahrajplant",
        comments: 0,
        category: "DIY garden projects",
        tags: ["DIY", "Tools"],
    },
    {
        slug: "low-maintenance-outdoor-gardens",
        title: "Low-Maintenance Outdoor Gardens For Busy Homeowners",
        excerpt:
            "A beautiful garden does not have to mean endless upkeep. Learn how drought-tolerant plants, mulching, and smart layout reduce maintenance while keeping spaces lush.",
        image: "/images/home/our-mission.webp",
        alt: "Low-maintenance outdoor garden with structured planting",
        day: "15",
        month: "JUL",
        author: "mahrajplant",
        comments: 4,
        category: "Outdoor Living Inspiration",
        tags: ["Landscaping Ideas", "Plant Care", "Watering Tips"],
    },
];

export function getLatestBlogArticles(limit = 3): BlogArticle[] {
    return blogArticles.slice(0, limit);
}

export function getBlogBySlug(slug: string): BlogArticle | undefined {
    return blogArticles.find((article) => article.slug === slug);
}

export function getAllBlogSlugs(): string[] {
    return blogArticles.map((article) => article.slug);
}

const monthLabels: Record<string, string> = {
    JAN: "January",
    FEB: "February",
    MAR: "March",
    APR: "April",
    MAY: "May",
    JUN: "June",
    JUL: "July",
    AUG: "August",
    SEP: "September",
    OCT: "October",
    NOV: "November",
    DEC: "December",
};

export function formatBlogDate(article: BlogArticle, year = 2025): string {
    const month = monthLabels[article.month.toUpperCase()] ?? article.month;
    return `${month} ${Number(article.day)}, ${year}`;
}

