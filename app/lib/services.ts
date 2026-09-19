import type { Service } from "@/app/components/ui";

export type ServiceFaq = {
    question: string;
    answer: string;
};

export type ServiceProcessStep = {
    number: string;
    title: string;
    description: string;
};

export type ServiceDetail = Service & {
    slug: string;
    heroDescription: string;
    introTitle: string;
    introBody: string[];
    includedTitle: string;
    includedDescription: string;
    includedItems: string[];
    processTitle: string;
    processDescription: string;
    processSteps: ServiceProcessStep[];
    faqTitle: string;
    faqDescription: string;
    faqs: ServiceFaq[];
    gallery: { src: string; alt: string }[];
};

const galleryPool = [
    {
        src: "/images/home/m-landscaping.webp",
        alt: "Landscaper working on a garden bed",
    },
    {
        src: "/images/home/hero-bg-3.jpg",
        alt: "Gardener trimming hedges",
    },
    {
        src: "/images/home/m-outdoor.webp",
        alt: "Garden lawn and outdoor greenery",
    },
    {
        src: "/images/home/aboutImg.webp",
        alt: "Team caring for garden plants",
    },
    {
        src: "/images/home/our-mission.webp",
        alt: "Professional outdoor maintenance",
    },
    {
        src: "/images/home/hero-bg-2.jpg",
        alt: "Landscaped garden seating area",
    },
];

function galleryFor(...indexes: number[]) {
    return indexes.map((i) => galleryPool[i % galleryPool.length]);
}

export const services: ServiceDetail[] = [
    {
        slug: "landscaping-services",
        title: "Landscaping Services",
        description: "Turn plain outdoor spaces into places people love to spend time in. We shape gardens with beauty, purpose, and a natural sense of flow.",
        heroDescription: "From open yards to complete outdoor makeovers, we bring together plants, pathways, lawns, and garden features through expert softscape design & installation and hardscape design & installation to create spaces that look beautiful and feel right.",
        image: "/images/home/m-landscaping.webp",
        alt: "Landscaping Services",
        icon: "/icons/consultation.svg",
        features: [
            "Garden Layout Planning",
            "Hardscape & Softscape Work",
            "Lawn Installation",
            "Outdoor Feature Design"
        ],
        introTitle: "We Turn Ordinary Yards Into Extraordinary Spaces",
        introBody: [
            "Great garden design isn't just about plants, it's about creating a space that fits how you actually live. Our team walks your property, studies the sunlight, soil, and layout, then designs an outdoor landscaping space that works for your home and your daily life.",
            "Whether you're starting from scratch or ready for a garden makeover & renovation, we handle it all, from the first idea to the final plant in the ground. Every design we create is practical, built to last, and made to grow more beautiful with time.",
        ],
        includedTitle: "What's Covered in Our Landscaping Services",
        includedDescription: "From design and planning to planting and finishing touches, we handle every detail needed to create a landscape that looks beautiful and works naturally for your space.",
        includedItems: [
            "Landscape Design & Planning",
            "Garden Design",
            "Residential Landscaping",
            "Commercial Landscaping",
            "Villa Landscaping",
            "Office Landscaping",
            "Outdoor Landscaping",
            "Softscape Design & Installation",
            "Hardscape Design & Installation",
            "Garden Makeover & Renovation",
            "Lawn Design & Installation",
            "Lawn Maintenance",
            "Garden Maintenance",
            "Planting & Plantation Services",
            "Irrigation System Installation",
            "Drip Irrigation Solutions",
            "Outdoor Lighting",
            "Garden Lighting Design",
            "Landscape Maintenance",
            "Tree Planting & Care",
        ],
        processTitle: "Our Working Process",
        processDescription: "Great gardens start with a clear plan, not guesswork. Here's exactly how we take your outdoor space from a first visit to a design that's ready to build.",
        processSteps: [
            {
                number: "01",
                title: "Site Assessment & Planning",
                description: "We visit your property to closely study the soil, sunlight, drainage, and space, then plan a garden design that truly fits your home, style, and life.",
            },
            {
                number: "02",
                title: "Concept & Visual Design",
                description: "We turn your ideas into clear, realistic 3D visuals, so you can truly see how your whole future garden will look before real work ever begins on site.",
            },
            {
                number: "03",
                title: "Final Plan & Handoff",
                description: "You get a complete, ready-to-build plan handed over with full details, so moving from paper to real planting feels smooth, simple, and effortless too.",
            },
        ],
        faqTitle: "Got Questions? We've Got Answers",
        faqDescription: "Every project comes with its own questions, and that's completely normal. Here are quick answers to what our clients ask us most before getting started.",
        faqs: [
            {
                question: "How much does landscaping cost?",
                answer: "Cost depends on your yard size, design complexity, and the materials you choose. We visit your property first and give you a clear, honest quote, with no hidden charges later.",
            },
            {
                question: "How long does a project take?",
                answer: "Smaller projects can be finished within a few days. Larger redesigns usually take a few weeks, depending on the scope of work and weather conditions.",
            },
            {
                question: "Do you provide 3D design previews?",
                answer: "Yes, we do. Before any real work begins, we show you a realistic visual of your future garden so you know exactly what to expect.",
            },
            {
                question: "Do you handle both residential and commercial projects?",
                answer: "Yes, we work with homes, offices, villas, and commercial spaces of all sizes through both residential landscaping and commercial landscaping. Our team adjusts the design approach based on the property type and its purpose.",
            },
            {
                question: "How do I get started with your team?",
                answer: "Just book a free consultation with us. We'll visit your space, understand your needs, and guide you through every step from there.",
            },
        ],
        gallery: galleryFor(0, 1, 2),
    },
    {
        slug: "nursery-plant-services",
        title: "Nursery & Plant Services",
        description: "Bring your garden to life with plants chosen for your space. From fresh greenery to seasonal favorites, we help every corner feel alive.",
        heroDescription: "Find healthy indoor plants, outdoor plants, and ornamental plants that suit your garden, home, and growing conditions. From choosing the right varieties to getting them settled, we make plant care easier from day one.",
        image: "/images/home/m-outdoor.webp",
        alt: "Nursery & Plant Services",
        icon: "/icons/green-solutions.svg",
        features: [
            "Plant Sourcing & Selection",
            "Nursery Consultation",
            "Potting & Repotting",
            "Plant Delivery & Placement"
        ],
        introTitle: "Great Gardens Begin With Great Plants",
        introBody: [
            "Our nursery & plant services bring healthy, well-grown flowering plants, tropical plants, and more straight to your doorstep. We carefully select every plant based on your local climate, soil type, and the amount of sunlight your space gets, so what you plant today keeps thriving for many years ahead.",
            "From small potted greens to full garden collections, every plant leaves our nursery in the best possible condition, along with simple guidance to help it settle in fast and grow well.",
        ],
        includedTitle: "What's Covered in Our Nursery & Plant Services",
        includedDescription: "We don't just hand you plants, we help you choose, plant, and care for them the right way so your garden grows healthy and strong from the very first day, season after season.",
        includedItems: [
            "Indoor Plants",
            "Outdoor Plants",
            "Ornamental Plants",
            "Flowering Plants",
            "Tropical Plants",
            "Palm Trees",
            "Fruit Plants & Trees",
            "Shade Plants",
            "Hedges & Privacy Plants",
            "Succulents & Cacti",
            "Seasonal Plants",
            "Plant Supply & Delivery",
            "Plant Rental Services",
            "Office Plant Rental",
            "Plant Replacement & Installation",
            "Plant Potting & Repotting",
        ],
        processTitle: "Our Working Process",
        processDescription: "Great outdoor spaces don't happen by accident, they're planned. Here's our simple 3 step process that takes your yard from \"just okay\" to exactly what you pictured.",
        processSteps: [
            {
                number: "01",
                title: "Walk & Discover",
                description: "We visit your property to understand its soil, sunlight, drainage, and layout, then shape a clear plan around your space, needs, and lifestyle always.",
            },
            {
                number: "02",
                title: "Design & Refine",
                description: "Your ideas take shape through clear layouts, plant selections, and outdoor details, refined together until every element feels balanced and right too.",
            },
            {
                number: "03",
                title: "Plan & Build",
                description: "Once the design is ready, we turn it into a clear build plan with defined steps, practical details, and no confusion about what comes next with focus.",
            },
        ],
        faqTitle: "Got Questions? We've Got Answers",
        faqDescription: "Here's everything you need to know about choosing, buying, and caring for plants from our nursery, so no guesswork, no jargon, just straight answers.",
        faqs: [
            {
                question: "What plants do you sell?",
                answer: "We carry a wide range, including indoor plants, outdoor plants, flowering plants, and tropical plants. Our collection also covers palm trees, fruit plants & trees, hedges & privacy plants, and succulents & cacti, so you'll find something for any space or style.",
            },
            {
                question: "Do you check plant health before delivery?",
                answer: "Yes, every single plant goes through a close health check before it leaves our nursery. We look at its strength, growth, and overall quality to make sure only healthy plants reach you.",
            },
            {
                question: "Can I rent plants for my office?",
                answer: "Yes, we offer plant rental services, including office plant rental, designed for commercial spaces. It's a low maintenance way to add greenery to your workplace without a long term commitment.",
            },
            {
                question: "How do you choose plants for my soil type?",
                answer: "We start by assessing your soil's texture, drainage, and nutrient levels. Based on this, we recommend shade plants and other varieties naturally suited to thrive in those exact conditions.",
            },
            {
                question: "Can I visit the nursery in person?",
                answer: "Absolutely, you're welcome to stop by and browse our plants in person. It's a great way to see the quality firsthand and get direct guidance from our team.",
            },
        ],
        gallery: galleryFor(2, 0, 4),
    },
    {
        slug: "specialized-green-services",
        title: "Specialized Green Services",
        description: "Add something special to your landscape with thoughtful green solutions. We create details that bring more character, texture, and life outdoors.",
        heroDescription: "Some spaces need a little more thought than the basics. From vertical garden installation and living green walls to unique planting solutions, we provide tailored care that helps your outdoor space thrive.",
        image: "/images/home/hero-bg-3.jpg",
        alt: "Specialized Green Services",
        icon: "/icons/trees-plants.svg",
        features: [
            "Vertical Garden Setup",
            "Green Wall Solutions",
            "Decorative Plant Features",
            "Sustainable Garden Solutions"
        ],
        introTitle: "Give Your Outdoor Space Something Extra",
        introBody: [
            "Some gardens need more than lawns and flower beds. Our specialized green services help you add distinctive features like rooftop garden design, balcony garden design, and terrace landscaping, solving tricky planting challenges and making smarter use of your outdoor space.",
            "Whether it's greenery on a wall through living green walls, more privacy around your seating area with privacy screening & green barriers, or a standout planting feature, we turn the idea into something practical, beautiful, and built to last.",
        ],
        includedTitle: "What's Covered in Our Specialized Green Services",
        includedDescription: "Our specialized services focus on the details that help unique garden features look their best. Each solution is carefully tailored to your space, with thoughtful plant choices and practical care that supports lasting growth.",
        includedItems: [
            "Vertical Garden Installation",
            "Living Green Walls",
            "Rooftop Garden Design",
            "Balcony Garden Design",
            "Terrace Landscaping",
            "Urban Gardening",
            "Indoor Plant Landscaping",
            "Corporate Green Spaces",
            "Green Entrance Design",
            "Garden Walkway Design",
            "Privacy Screening & Green Barriers",
        ],
        processTitle: "Our Working Process",
        processDescription: "Specialized care isn't a one-size-fits-all job. Here's how we assess, treat, and protect your garden's unique needs, from first inspection to lasting results.",
        processSteps: [
            {
                number: "01",
                title: "Inspect & Assess",
                description: "We begin by inspecting your garden closely, checking plant health, soil condition, and any signs of pests or stress before planning any treatment.",
            },
            {
                number: "02",
                title: "Plan & Treat",
                description: "Next, we design a tailored care plan using safe, effective methods suited to your specific plants, space, and the exact issues we've identified.",
            },
            {
                number: "03",
                title: "Support & Maintain",
                description: "Finally, we apply the treatment carefully and share simple follow-up steps so your garden stays healthy and strong well beyond our visit.",
            },
        ],
        faqTitle: "Got Questions? We're Here to Help",
        faqDescription: "Curious about how our specialized green services work? Here are answers to the questions clients ask us most, explained simply and clearly.",
        faqs: [
            {
                question: "Are your treatments chemical free?",
                answer: "We prioritize natural, chemical conscious methods wherever possible to keep your garden safe for families and pets. When stronger treatment is needed, we use it responsibly and only where necessary.",
            },
            {
                question: "Can you add privacy planting to my yard?",
                answer: "Yes, we design and plant hedges and greenery through privacy screening & green barriers specifically to create privacy around your yard or seating area. We choose plants suited to your space, climate, and how quickly you want coverage.",
            },
            {
                question: "Can you fix an unhealthy lawn?",
                answer: "Yes, we start by diagnosing what's causing the issue, whether it's soil, pests, or watering habits. From there, we apply the right treatment to help your lawn recover and stay healthy.",
            },
            {
                question: "Do you offer ongoing treatment plans?",
                answer: "Yes, we offer recurring care plans to keep your garden consistently healthy over time. This helps us catch issues early and adjust care as the seasons change.",
            },
            {
                question: "Is a consultation required before starting?",
                answer: "Yes, we recommend a quick consultation so we can properly assess your garden's needs. This helps us recommend the right treatment instead of guessing.",
            },
        ],
        gallery: galleryFor(1, 4, 3),
    },
    {
        slug: "ongoing-care-maintenance",
        title: "Ongoing Care & Maintenance",
        description: "Beautiful gardens need care beyond the first day. We keep your plants, lawns, and outdoor spaces looking fresh through every season.",
        heroDescription: "A garden doesn't stay healthy on its own. We take care of the regular work through our garden maintenance packages, like feeding, trimming, and checking your plants, so your outdoor space stays strong all year long.",
        image: "/images/home/hero-bg-2.jpg",
        alt: "Ongoing Care & Maintenance",
        icon: "/icons/execution.svg",
        features: [
            "Lawn Mowing & Edging",
            "Tree & Shrub Trimming",
            "Soil & Fertilizer Care",
            "Garden Cleanup"
        ],
        introTitle: "Keeping Your Garden Looking Its Best",
        introBody: [
            "A beautiful garden needs more than occasional attention. Our plant health & care service takes care of the regular work that keeps your landscape fresh, healthy, and ready to enjoy.",
            "From trimming and watering to feeding plants and checking for early problems, we stay on top of the details throughout the year. You get a well-kept outdoor space without having to manage every garden task yourself.",
        ],
        includedTitle: "What's Covered in Our Ongoing Care & Maintenance",
        includedDescription: "Keep your garden looking its best all year with regular trimming, watering, feeding, cleanup, and seasonal care. Our team handles the details that help your landscape stay fresh, healthy, and well-kept.",
        includedItems: [
            "Garden Maintenance Packages",
            "Plant Health & Care",
            "Tree & Shrub Pruning",
            "Hedge Trimming",
            "Weed Control",
            "Soil Preparation & Improvement",
            "Fertilization Services",
            "Pest & Disease Management",
            "Irrigation Maintenance",
            "Seasonal Garden Cleanup",
        ],
        processTitle: "Our Working Process",
        processDescription: "Great gardens need steady, expert attention. Here's how our ongoing care process keeps your outdoor space healthy, from first checkup to year-round maintenance.",
        processSteps: [
            {
                number: "01",
                title: "Initial Checkup",
                description: "We start with a full garden checkup, reviewing plant health, soil condition, and seasonal needs to build your personalized care schedule fully.",
            },
            {
                number: "02",
                title: "Scheduled Visits",
                description: "Our team carries out regular visits, trimming, watering, and feeding your garden based on the schedule and specific seasonal requirements.",
            },
            {
                number: "03",
                title: "Ongoing Monitoring",
                description: "We continuously monitor your garden's progress, adjusting the care plan as needed so your outdoor space stays healthy and thriving year-round.",
            },
        ],
        faqTitle: "Got Questions? We're Here to Help",
        faqDescription: "Curious about how our ongoing care and maintenance service works? Here are answers to the questions clients ask us most, explained simply and clearly.",
        faqs: [
            {
                question: "What does ongoing maintenance include?",
                answer: "Our service covers regular trimming, watering, feeding, seasonal garden cleanup, and soil preparation & improvement. We handle the routine work that keeps your landscape neat, healthy, and well-maintained.",
            },
            {
                question: "Can you adjust care for different seasons?",
                answer: "Yes! Garden needs change throughout the year, so we adjust care based on seasonal conditions. This may include changes to watering, feeding, trimming, and plant protection.",
            },
            {
                question: "Can you help if my garden has been neglected?",
                answer: "Absolutely! We can assess the current condition and create a practical care plan to bring it back into shape. We focus on the areas that need attention first and build from there.",
            },
            {
                question: "What happens if a plant doesn't survive?",
                answer: "We assess what may have caused the plant to struggle and recommend the next suitable step. If replacement is needed, we can help select a better option for the space and conditions.",
            },
            {
                question: "How do I get started with a maintenance plan?",
                answer: "Simply tell us about your garden, its size, and the type of care it needs. We'll discuss your requirements and help create a maintenance plan that fits your space, including garden maintenance packages suited to your needs.",
            },
        ],
        gallery: galleryFor(5, 0, 1),
    },
    {
        slug: "outdoor-plants",
        title: "Outdoor Plants",
        description: "Bring nature closer with greenery that fits your outdoor space beautifully. We help you choose plants that add life, texture, and lasting charm.",
        heroDescription: "Bring your outdoor space to life with hardy, beautiful plants like bougainvillea, hibiscus, and date palm, chosen to add lasting greenery, natural texture, and fresh character to every corner.",
        image: "/images/home/m-indoor.webp",
        alt: "Outdoor Plants",
        icon: "/icons/trees-plants.svg",
        features: [
            "Tropical & Native Varieties",
            "Shade Loving Plants",
            "Low Care Greenery",
            "Planters & Garden Pots"
        ],
        introTitle: "Plants That Are Built to Handle the Outdoors",
        introBody: [
            "Our outdoor plants service brings strong, sun ready greenery, from royal palm and washingtonia palm to frangipani and jasmine, designed to handle real outdoor conditions, from bright afternoons to heavy rain. We select every plant based on your climate, space, and sunlight exposure, so it doesn't just survive outside, it truly thrives well.",
            "Whether you need bold color for your front yard, cool shade for a patio with varieties like ficus or schefflera, or hardy outdoor trees & large plants for open spaces, we match the right plant to the exact right spot every single time.",
        ],
        includedTitle: "What's Covered in Our Outdoor Plant Services",
        includedDescription: "Outdoor spaces can be tough on plants. That's why we focus on strength first, like picking, placing, and caring for greenery built to survive sun, wind, and rain all year long.",
        includedItems: [
            "Bougainvillea",
            "Date Palm",
            "Queen Palm",
            "Fan Palm",
            "Frangipani",
            "Hibiscus",
            "Jasmine",
            "Ixora",
            "Oleander",
            "Gardenia",
            "Plumeria",
            "Bird of Paradise",
            "Croton",
            "Lantana",
            "Duranta",
            "Ficus",
            "Podocarpus",
            "Schefflera",
            "Agave",
            "Yucca",
            "Outdoor Trees & Large Plants",
            "Royal Palm",
            "Washingtonia Palm",
            "Coconut Palm",
            "Bottle Palm",
            "Olive Tree",
            "Lemon Tree",
            "Mango Tree",
            "Orange Tree",
            "Neem Tree",
            "Acacia",
            "Ghaf Tree",
            "Ghaf-like native trees",
        ],
        processTitle: "Our Working Process",
        processDescription: "We make outdoor planting simple and stress free. Here's exactly how we take your space from bare ground to a thriving, sun ready garden.",
        processSteps: [
            {
                number: "01",
                title: "Site & Climate Assessment",
                description: "We study your outdoor space closely, checking sunlight, wind exposure, and soil quality, so every plant we pick truly fits your environment perfectly.",
            },
            {
                number: "02",
                title: "Careful Selection & Prep",
                description: "We select strong, weather ready plants suited to your exact local climate, prepared with care, so they stay fully healthy before arriving at your home.",
            },
            {
                number: "03",
                title: "Planting & Ongoing Care",
                description: "We place and plant everything at the exact right spots outdoors, then guide you on simple care tips so plants settle in fast and grow really strong.",
            },
        ],
        faqTitle: "Got Questions? We're Here to Help",
        faqDescription: "Thinking about outdoor plants for your space? Explore quick answers to the things our clients want to know before getting started.",
        faqs: [
            {
                question: "Can outdoor plants survive heavy rain?",
                answer: "Yes, most of the plants we recommend, including podocarpus and gardenia, are chosen specifically for their ability to handle heavy rain and proper drainage. We avoid varieties that are prone to root rot or waterlogging in wet conditions.",
            },
            {
                question: "Do you consider my area's climate?",
                answer: "Absolutely! Every plant suggestion, whether it's fan palm, coconut palm, or bottle palm, is based on your local weather patterns, temperature range, and seasonal changes. This ensures your plants aren't just surviving but actually thriving where you live.",
            },
            {
                question: "How often should outdoor plants be watered?",
                answer: "It really depends on the plant type, season, and your local climate. Once your plants are set up, we provide a simple watering schedule so you know exactly what each one needs.",
            },
            {
                question: "Do you offer seasonal plant changes?",
                answer: "Yes, we do. As seasons shift, some plants naturally fade while others come into bloom, like the bird of paradise and plumeria. We help refresh your outdoor space so it stays colorful and full of life all year.",
            },
            {
                question: "What if I'm unsure which plants to choose?",
                answer: "That's completely normal, and that's where we come in. Our team looks at your space, sunlight, and style preferences, then recommends plants that will genuinely work well for you.",
            },
        ],
        gallery: galleryFor(3, 2, 0),
    },
    {
        slug: "flowering-plants",
        title: "Flower Plants",
        description: "Fill your garden with color, fragrance, and seasonal beauty. Our flowering plants add the kind of detail that makes an outdoor space feel alive.",
        heroDescription: "Fill your garden with vibrant blooms like roses, hibiscus, and bougainvillea, gentle fragrance, and natural charm that makes every outdoor corner feel more alive and inviting.",
        image: "/images/home/our-mission.webp",
        alt: "Flower Plants",
        icon: "/icons/reliable.svg",
        features: [
            "Seasonal Flower Selection",
            "Color Themed Planting",
            "Flower Bed Arrangements",
            "Fragrant Garden Plants"
        ],
        introTitle: "Bringing Color and Life to Every Garden",
        introBody: [
            "Flowers do something plants alone can't, they bring real emotion into a garden. A single rose or hibiscus bloom can turn a plain corner into something people stop and truly notice.",
            "That's why we pick flowering plants with real care, thinking about color, blooming seasons, and fragrance, not just appearance. Whether it's a small pot by your door or a full flower bed, every choice we make brings your space to life.",
        ],
        includedTitle: "What's Covered in Our Flower Plant Services",
        includedDescription: "Flowers do more than decorate, they change how a space feels. We handle every detail, from picking the right blooms to keeping them healthy and blooming beautifully for you.",
        includedItems: [
            "Rose",
            "Hibiscus",
            "Jasmine",
            "Bougainvillea",
            "Gardenia",
            "Marigold",
            "Petunia",
            "Geranium",
            "Chrysanthemum",
            "Zinnia",
        ],
        processTitle: "Our Working Process",
        processDescription: "Choosing the right flowers takes more than good taste. Here's how we plan, prepare, and plant blooms that truly thrive in your space.",
        processSteps: [
            {
                number: "01",
                title: "Understanding Your Space",
                description: "We look closely at your garden's sunlight, soil quality, and style, then recommend flowering plants that will really bloom and truly suit your tastes.",
            },
            {
                number: "02",
                title: "Selecting & Preparing Blooms",
                description: "We select fresh, healthy blooms in the exact colors and fragrance you love, always preparing each one carefully before it reaches your own garden bed.",
            },
            {
                number: "03",
                title: "Planting & Seasonal Care",
                description: "We plant every flower in the exact right spot for sunlight and growth, then share basic care tips so your blooms remain vibrant through every season.",
            },
        ],
        faqTitle: "Got Questions? We're Here to Help",
        faqDescription: "Have questions about our flower plant service? Here are quick answers to what clients ask us most, explained simply and clearly.",
        faqs: [
            {
                question: "Which flowers work best in my climate?",
                answer: "It depends on your local weather, sunlight, and soil conditions. During our visit, we assess your space and recommend flowering plants that are naturally suited to thrive there.",
            },
            {
                question: "Do you offer fragrant flowering plants?",
                answer: "Yes, we do. We have a lovely selection of fragrant blooms like jasmine and gardenia that work beautifully near patios, walkways, and seating areas, adding both color and a pleasant scent.",
            },
            {
                question: "Can you match flowers to a specific color theme?",
                answer: "Absolutely! Whether you want soft pastels, bold and bright colors, or a single tone palette, we can curate a flower selection featuring marigold, petunia, or zinnia that fits your exact vision.",
            },
            {
                question: "How long do flowering plants usually bloom?",
                answer: "Bloom time varies by plant type and season. Some flowers bloom for a few weeks, while others last several months, we'll guide you on what to expect for each variety.",
            },
            {
                question: "What if I don't know which flowers to choose?",
                answer: "That's completely fine and very common. Our team looks at your space, sunlight, and personal style, then recommends flowers, from classics like rose and chrysanthemum to fragrant options like bougainvillea, that will genuinely work well for you.",
            },
        ],
        gallery: galleryFor(4, 1, 5),
    }
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
    return services.find((service) => service.slug === slug);
}

export function getAllServiceSlugs(): string[] {
    return services.map((service) => service.slug);
}

export const serviceHighlights = [
    {
        icon: "/icons/pesticide-free.svg",
        title: "Projects Of Every Size",
        description:
            "From backyards to full estates, our team handles projects of every size and scale.",
        iconClassName: "brightness-0 invert",
    },
    {
        icon: "/icons/eco-friendly.svg",
        title: "Built For Local Climate",
        description:
            "Every plant and material we use is chosen to handle Riyadh heat and last for years.",
        iconClassName: "brightness-0 invert",
    },
    {
        icon: "/icons/long-term.svg",
        title: "Free First Visit",
        description:
            "Book a free site visit and consultation before committing to any service or plan.",
        iconClassName: "brightness-0 invert",
    },
    {
        icon: "/icons/sound-friendly.svg",
        title: "On-Time Delivery",
        description:
            "Our crews show up on time and finish within the schedule we agree on together.",
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
