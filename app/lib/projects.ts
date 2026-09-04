import type { PortfolioProject } from "@/app/components/ui";

export type ProjectMetaItem = {
    label: string;
    value: string;
};

export type ProjectResult = {
    value: string;
    label: string;
};

export type ProjectPhase = {
    number: string;
    title: string;
    description: string;
};

export type ProjectTestimonial = {
    quote: string;
    name: string;
    role: string;
};

export type ProjectDetail = PortfolioProject & {
    slug: string;
    category: string;
    heroDescription: string;
    overviewTitle: string;
    overviewBody: string[];
    scopeTitle: string;
    scopeDescription: string;
    scopeItems: string[];
    approachTitle: string;
    approachDescription: string;
    approachSteps: ProjectPhase[];
    results: ProjectResult[];
    meta: ProjectMetaItem[];
    testimonial: ProjectTestimonial;
    gallery: { src: string; alt: string }[];
};

export const projectFilters = [
    "All",
    "Landscape Design",
    "Outdoor Lighting",
    "Rooftop Garden",
    "Urban Farming",
] as const;

export type ProjectFilter = (typeof projectFilters)[number];

export const projectHighlights = [
    {
        icon: "/icons/vision.svg",
        title: "Design-Led Thinking",
        description:
            "Every project starts with a considered plan—balancing your site, climate, and lifestyle before a single plant goes in.",
        iconClassName: "brightness-0 invert",
    },
    {
        icon: "/icons/execution.svg",
        title: "Craftsmanship On Site",
        description:
            "Our own crews handle planting, hardscaping, and finishing, so detail and quality stay consistent from start to handover.",
        iconClassName: "brightness-0 invert",
    },
    {
        icon: "/icons/gurantee.svg",
        title: "Built To Last",
        description:
            "Durable materials, healthy stock, and smart irrigation mean each landscape keeps looking its best for years.",
        iconClassName: "brightness-0 invert",
    },
    {
        icon: "/icons/reliable.svg",
        title: "Delivered On Schedule",
        description:
            "Clear timelines, tidy sites, and steady communication—so you always know exactly where your project stands.",
        iconClassName: "brightness-0 invert",
    },
];

export const projectStandards = [
    {
        icon: "/icons/consultation.svg",
        label: "Site-Specific Design Studies",
    },
    {
        icon: "/icons/trees-plants.svg",
        label: "Climate-Suited Plant Palettes",
    },
    {
        icon: "/icons/pesticide-free.svg",
        label: "Pesticide-Free Establishment",
    },
    {
        icon: "/icons/long-term.svg",
        label: "Low-Water Irrigation Design",
    },
];

export const projectDelivery = [
    {
        icon: "/icons/expert-team.svg",
        label: "One Dedicated Project Lead",
    },
    {
        icon: "/icons/execution.svg",
        label: "In-House Build & Planting Crews",
    },
    {
        icon: "/icons/client-satisfaction.svg",
        label: "Weekly Progress Check-Ins",
    },
    {
        icon: "/icons/gurantee.svg",
        label: "Aftercare & Plant Guarantee",
    },
];

const galleryPool = [
    {
        src: "/images/home/m-landscaping.webp",
        alt: "Landscaper shaping a planted garden bed",
    },
    {
        src: "/images/home/hero-bg-3.jpg",
        alt: "Gardener trimming a mature hedge",
    },
    {
        src: "/images/home/m-outdoor.webp",
        alt: "Manicured lawn framed by layered planting",
    },
    {
        src: "/images/home/aboutImg.webp",
        alt: "Team planting seasonal flowers together",
    },
    {
        src: "/images/home/our-mission.webp",
        alt: "Finished outdoor space with green borders",
    },
    {
        src: "/images/home/hero-bg-2.jpg",
        alt: "Landscaped seating area surrounded by hedges",
    },
    {
        src: "/images/home/m-trees.webp",
        alt: "Mature trees and raised planting beds",
    },
    {
        src: "/images/home/why-us-content-img.webp",
        alt: "Close detail of healthy garden planting",
    },
];

function galleryFor(...indexes: number[]) {
    return indexes.map((index) => galleryPool[index % galleryPool.length]);
}

export const projects: ProjectDetail[] = [
    {
        slug: "soft-greens-city-views",
        title: "Soft Greens & Stunning City Views",
        category: "Rooftop Garden",
        description:
            "Striking building entrance with a lush vertical garden, integrated LED strips, and modern seating for a vibrant first impression.",
        heroDescription:
            "A rooftop terrace reimagined as a green outdoor lounge—layered planting, warm lighting, and skyline views that work day and night.",
        image: "/images/home/hero-bg-2.jpg",
        alt: "City skyline viewed through lush rooftop greenery at dusk",
        tags: ["Landscape Design", "Outdoor Lighting"],
        client: "Westminster",
        address: "200 Parkside, London",
        overviewTitle:
            "Turning an exposed rooftop into a sheltered, planted retreat.",
        overviewBody: [
            "The existing roof terrace was generous in size but completely unused—windswept, bare, and offering no reason for residents to linger. Our brief was to create a garden that softened the hard edges of the building while keeping the skyline the hero.",
            "We introduced lightweight raised planters along the perimeter, a central seating zone, and a vertical green wall at the lift lobby entrance. Integrated LED strips wash the planting after dark, so the space feels just as inviting in the evening as it does at midday.",
        ],
        scopeTitle: "What This Project Involved",
        scopeDescription:
            "From structural load checks through to final lighting commissioning, every stage was handled by our in-house design and build team.",
        scopeItems: [
            "Rooftop load & wind assessment",
            "Lightweight raised planter system",
            "Vertical green wall installation",
            "Integrated LED strip lighting",
            "Automatic drip irrigation",
            "Modern outdoor seating layout",
        ],
        approachTitle: "How We Delivered It",
        approachDescription:
            "A rooftop build leaves little room for error, so we worked in tight, well-sequenced phases with the building management team.",
        approachSteps: [
            {
                number: "01",
                title: "Survey & Structural Review",
                description:
                    "We measured the terrace, reviewed load limits with the building engineer, and mapped wind exposure to decide where planting could safely go.",
            },
            {
                number: "02",
                title: "Planting & Lighting Build",
                description:
                    "Planters, irrigation, and lighting were craned up and installed in stages, keeping resident access open throughout the works.",
            },
            {
                number: "03",
                title: "Establishment & Handover",
                description:
                    "We tuned the irrigation schedule, commissioned the lighting, and handed over a simple seasonal care plan for the on-site team.",
            },
        ],
        results: [
            { value: "310 m²", label: "Terrace Transformed" },
            { value: "40%", label: "Less Water Use" },
            { value: "9 wks", label: "Start To Handover" },
        ],
        meta: [
            { label: "Client", value: "Westminster" },
            { label: "Location", value: "200 Parkside, London" },
            { label: "Project Type", value: "Rooftop Garden" },
            { label: "Area", value: "310 m²" },
            { label: "Duration", value: "9 Weeks" },
            { label: "Completed", value: "2025" },
        ],
        testimonial: {
            quote: "The terrace went from a space nobody used to the best part of the building. The planting looks established already, and the evening lighting is stunning.",
            name: "Claire Dawson",
            role: "Building Manager, Westminster",
        },
        gallery: galleryFor(5, 2, 6, 0, 7),
    },
    {
        slug: "stone-path-garden-revival",
        title: "Stone Path Garden Revival",
        category: "Landscape Design",
        description:
            "A refreshed courtyard with natural stone pathways, layered planting beds, and drought-tolerant greenery for year-round appeal.",
        heroDescription:
            "A tired courtyard rebuilt around natural stone paths and drought-tolerant planting that holds its colour through every season.",
        image: "/images/home/m-landscaping.webp",
        alt: "Landscaper laying stone pavers in a garden courtyard",
        tags: ["Landscape Design"],
        client: "Greenfield Estate",
        address: "14 Willow Lane, Manchester",
        overviewTitle:
            "A courtyard rebuilt for easy movement and low-maintenance colour.",
        overviewBody: [
            "The original courtyard suffered from poor drainage, patchy lawn, and narrow routes that made the space feel smaller than it was. The owners wanted something calm and structured that would not demand constant upkeep.",
            "We rebuilt the levels, laid natural stone paths that trace a gentle curve through the garden, and framed them with layered planting beds. Drought-tolerant species carry the planting through dry spells while seasonal accents keep the space changing month to month.",
        ],
        scopeTitle: "What This Project Involved",
        scopeDescription:
            "Groundworks, drainage, hard landscaping, and a full replanting scheme delivered as a single coordinated build.",
        scopeItems: [
            "Level re-grading & drainage",
            "Natural stone path laying",
            "Layered planting bed design",
            "Drought-tolerant plant palette",
            "Topsoil & mulch improvement",
            "Seasonal accent planting",
        ],
        approachTitle: "How We Delivered It",
        approachDescription:
            "Because the courtyard sat between occupied buildings, sequencing and site tidiness mattered as much as the finish itself.",
        approachSteps: [
            {
                number: "01",
                title: "Survey & Soil Testing",
                description:
                    "We tested drainage and soil structure, then set new levels so water would move away from the buildings rather than pool on the paving.",
            },
            {
                number: "02",
                title: "Hard Landscaping",
                description:
                    "Stone was set on a permeable base to keep the surface stable and free-draining, with edges detailed to sit flush against the planting.",
            },
            {
                number: "03",
                title: "Planting & Mulching",
                description:
                    "Beds were planted in layers for depth, then mulched to lock in moisture and keep weeding to a minimum in the first seasons.",
            },
        ],
        results: [
            { value: "240 m²", label: "Courtyard Rebuilt" },
            { value: "60%", label: "Lower Upkeep Hours" },
            { value: "7 wks", label: "Start To Handover" },
        ],
        meta: [
            { label: "Client", value: "Greenfield Estate" },
            { label: "Location", value: "14 Willow Lane, Manchester" },
            { label: "Project Type", value: "Landscape Design" },
            { label: "Area", value: "240 m²" },
            { label: "Duration", value: "7 Weeks" },
            { label: "Completed", value: "2025" },
        ],
        testimonial: {
            quote: "They solved the drainage problem we had lived with for years and gave us a courtyard that finally feels finished. Tidy crew, clear updates, no surprises.",
            name: "Marcus Hale",
            role: "Estate Director, Greenfield",
        },
        gallery: galleryFor(0, 3, 7, 2, 4),
    },
    {
        slug: "trellis-vine-sanctuary",
        title: "Trellis & Vine Sanctuary",
        category: "Rooftop Garden",
        description:
            "A rooftop retreat framed by wooden trellises, climbing vines, and soft ambient lighting for quiet evening gatherings.",
        heroDescription:
            "Timber trellises, climbing vines, and soft ambient light turn an open rooftop into a shaded sanctuary for quiet evenings.",
        image: "/images/home/m-outdoor.webp",
        alt: "Garden trellis covered in climbing vines and greenery",
        tags: ["Rooftop Garden"],
        client: "Skyline Residences",
        address: "88 Horizon Terrace, Birmingham",
        overviewTitle:
            "Shade, privacy, and greenery on a fully exposed roof deck.",
        overviewBody: [
            "Residents loved the view from this roof deck but avoided it during the day—there was no shade and no sense of enclosure. The challenge was adding both without blocking the outlook or overloading the structure.",
            "Timber trellis screens now divide the deck into softer zones, planted with fast-establishing climbers that green up the frames within a single season. Warm ambient lighting threads through the structure so the space carries comfortably into the evening.",
        ],
        scopeTitle: "What This Project Involved",
        scopeDescription:
            "A carpentry-led scheme combined with climbing plant selection and a low-glare lighting design.",
        scopeItems: [
            "Timber trellis screen design",
            "Climbing plant selection",
            "Lightweight planter troughs",
            "Ambient low-glare lighting",
            "Drip irrigation to climbers",
            "Zoned seating arrangement",
        ],
        approachTitle: "How We Delivered It",
        approachDescription:
            "Every element was pre-fabricated off site to keep rooftop working time short and disruption to residents minimal.",
        approachSteps: [
            {
                number: "01",
                title: "Zoning & Shade Study",
                description:
                    "We tracked sun and wind across the deck to place screens where they would give shade without cutting off the skyline view.",
            },
            {
                number: "02",
                title: "Trellis Fabrication & Fit",
                description:
                    "Screens were built off site, then anchored to the existing structure using fixings signed off by the building engineer.",
            },
            {
                number: "03",
                title: "Planting & Training",
                description:
                    "Climbers were planted and tied in along the frames, with an irrigation schedule set to establish them through their first summer.",
            },
        ],
        results: [
            { value: "185 m²", label: "Deck Reworked" },
            { value: "4", label: "Distinct Seating Zones" },
            { value: "6 wks", label: "Start To Handover" },
        ],
        meta: [
            { label: "Client", value: "Skyline Residences" },
            { label: "Location", value: "88 Horizon Terrace, Birmingham" },
            { label: "Project Type", value: "Rooftop Garden" },
            { label: "Area", value: "185 m²" },
            { label: "Duration", value: "6 Weeks" },
            { label: "Completed", value: "2024" },
        ],
        testimonial: {
            quote: "The trellises made all the difference—there is finally shade up there. The vines filled in faster than we expected and the whole deck feels private now.",
            name: "Priya Nandra",
            role: "Residents' Committee, Skyline",
        },
        gallery: galleryFor(2, 6, 1, 5, 3),
    },
    {
        slug: "urban-farming-terrace",
        title: "Urban Farming Terrace",
        category: "Urban Farming",
        description:
            "Productive raised beds and herb gardens designed for city living, combining edible planting with elegant landscape structure.",
        heroDescription:
            "Raised beds, herb gardens, and a compact orchard row—an edible terrace that still reads as a designed landscape.",
        image: "/images/home/m-trees.webp",
        alt: "Urban terrace garden with trees and raised planting beds",
        tags: ["Urban Farming", "Rooftop Garden"],
        client: "Harbor District",
        address: "5 Canal View, Bristol",
        overviewTitle:
            "A working kitchen garden that still looks designed, not utilitarian.",
        overviewBody: [
            "The client wanted genuine growing capacity for a shared community kitchen, but the terrace also fronted a public walkway—so it could not look like an allotment. Both needs had to be met in the same footprint.",
            "We laid out generous raised beds on a clear grid, wrapped them in structural evergreen planting, and added a compact fruit row along the sunniest edge. The result produces real harvests while presenting a tidy, intentional face to the street.",
        ],
        scopeTitle: "What This Project Involved",
        scopeDescription:
            "Productive planting design paired with the structure and irrigation needed to keep it viable year-round.",
        scopeItems: [
            "Raised bed layout & build",
            "Edible & herb plant selection",
            "Compact fruit tree row",
            "Structural evergreen framing",
            "Timed drip irrigation",
            "Composting & soil rotation plan",
        ],
        approachTitle: "How We Delivered It",
        approachDescription:
            "Productive gardens live or die on soil and water, so both were engineered before a single bed was planted.",
        approachSteps: [
            {
                number: "01",
                title: "Sunlight & Yield Mapping",
                description:
                    "We mapped daily sun across the terrace to place beds and fruit where light hours would actually support a crop.",
            },
            {
                number: "02",
                title: "Beds, Soil & Irrigation",
                description:
                    "Beds were built and filled with a tailored soil mix, then fitted with timed drip lines to keep watering consistent and efficient.",
            },
            {
                number: "03",
                title: "Planting & Grower Training",
                description:
                    "We planted the first full rotation and walked the community team through sowing, harvesting, and seasonal soil care.",
            },
        ],
        results: [
            { value: "220 m²", label: "Productive Growing Area" },
            { value: "18", label: "Edible Species Planted" },
            { value: "8 wks", label: "Start To Handover" },
        ],
        meta: [
            { label: "Client", value: "Harbor District" },
            { label: "Location", value: "5 Canal View, Bristol" },
            { label: "Project Type", value: "Urban Farming" },
            { label: "Area", value: "220 m²" },
            { label: "Duration", value: "8 Weeks" },
            { label: "Completed", value: "2025" },
        ],
        testimonial: {
            quote: "We are harvesting from it every week and it still looks smart from the walkway. The training session at handover made the whole thing feel manageable.",
            name: "Tom Ashby",
            role: "Community Lead, Harbor District",
        },
        gallery: galleryFor(6, 0, 4, 3, 1),
    },
    {
        slug: "illuminated-garden-walkway",
        title: "Illuminated Garden Walkway",
        category: "Outdoor Lighting",
        description:
            "Warm pathway lighting woven through sculpted hedges and seasonal blooms, creating a welcoming route after sunset.",
        heroDescription:
            "A lighting-led scheme that makes a long garden route feel safe, warm, and quietly dramatic once the sun goes down.",
        image: "/images/home/hero-bg-3.jpg",
        alt: "Garden walkway with professional landscape lighting at dusk",
        tags: ["Outdoor Lighting", "Landscape Design"],
        client: "Oakwood Manor",
        address: "31 Elm Grove, Leeds",
        overviewTitle:
            "Lighting designed around the planting, not bolted on afterwards.",
        overviewBody: [
            "The approach to the main house ran through mature hedging that turned pitch dark after sunset. Guests were using phone torches, and the planting—some of the best on the estate—disappeared entirely at night.",
            "We designed a low-level scheme that grazes light across the hedge faces and picks out specimen planting, keeping fittings hidden and glare out of sightlines. The path is now comfortably navigable while the garden itself becomes the feature.",
        ],
        scopeTitle: "What This Project Involved",
        scopeDescription:
            "A full exterior lighting design, discreet cable infrastructure, and hedge reshaping to suit the new scheme.",
        scopeItems: [
            "Exterior lighting design",
            "Concealed low-voltage cabling",
            "Path & step edge lighting",
            "Specimen plant uplighting",
            "Hedge reshaping & pruning",
            "Zoned timer & dimming control",
        ],
        approachTitle: "How We Delivered It",
        approachDescription:
            "Lighting decisions were made on site after dark, so every fitting was judged on how it actually looked in place.",
        approachSteps: [
            {
                number: "01",
                title: "Night Walk & Light Plan",
                description:
                    "We walked the route after dark with temporary fittings, agreeing brightness and beam angles before anything was fixed.",
            },
            {
                number: "02",
                title: "Cabling & Fitting Install",
                description:
                    "Low-voltage runs were trenched below the beds and fittings tucked into planting so the hardware stays invisible by day.",
            },
            {
                number: "03",
                title: "Focusing & Scene Setting",
                description:
                    "Each fitting was aimed and dimmed on site, then grouped into timed scenes for everyday use and for events.",
            },
        ],
        results: [
            { value: "120 m", label: "Walkway Illuminated" },
            { value: "34", label: "Concealed Fittings" },
            { value: "5 wks", label: "Start To Handover" },
        ],
        meta: [
            { label: "Client", value: "Oakwood Manor" },
            { label: "Location", value: "31 Elm Grove, Leeds" },
            { label: "Project Type", value: "Outdoor Lighting" },
            { label: "Length", value: "120 m" },
            { label: "Duration", value: "5 Weeks" },
            { label: "Completed", value: "2024" },
        ],
        testimonial: {
            quote: "You cannot see a single fitting during the day, and at night the garden looks better than it does in daylight. Exactly the effect we hoped for.",
            name: "Helena Ward",
            role: "Owner, Oakwood Manor",
        },
        gallery: galleryFor(1, 4, 2, 7, 5),
    },
    {
        slug: "corporate-green-entrance",
        title: "Corporate Green Entrance",
        category: "Landscape Design",
        description:
            "A polished office arrival experience with layered planters, native species, and low-maintenance irrigation for busy teams.",
        heroDescription:
            "A commercial forecourt replanted for year-round structure, native resilience, and almost no day-to-day maintenance.",
        image: "/images/home/our-mission.webp",
        alt: "Corporate building entrance with landscaped green planters",
        tags: ["Landscape Design"],
        client: "Northgate Offices",
        address: "120 Commerce Road, London",
        overviewTitle:
            "A first impression that stays sharp with minimal intervention.",
        overviewBody: [
            "The entrance forecourt was planted in seasonal bedding that looked tired for most of the year and demanded constant replacement. Facilities wanted something that would hold its appearance without a weekly gardening visit.",
            "We replaced the bedding with layered planters built around native, structural species that carry form through winter. A pressure-compensating irrigation line keeps them even, so the scheme now needs only light seasonal attention.",
        ],
        scopeTitle: "What This Project Involved",
        scopeDescription:
            "A planting strategy focused on longevity and low intervention, delivered without closing the building entrance.",
        scopeItems: [
            "Layered planter scheme",
            "Native structural species",
            "Automatic irrigation line",
            "Soil replacement & feeding",
            "Evergreen winter structure",
            "Annual maintenance schedule",
        ],
        approachTitle: "How We Delivered It",
        approachDescription:
            "All works were phased around office hours so the main entrance stayed open and presentable throughout.",
        approachSteps: [
            {
                number: "01",
                title: "Site Audit & Plant Strategy",
                description:
                    "We reviewed light, wind, and footfall at the entrance, then built a plant list chosen for resilience rather than seasonal display.",
            },
            {
                number: "02",
                title: "Planter Build & Irrigation",
                description:
                    "Planters were rebuilt with fresh soil and fitted with pressure-compensating drip lines for even watering across every bed.",
            },
            {
                number: "03",
                title: "Planting & Care Handover",
                description:
                    "Planting was completed out of hours, and facilities received a simple annual calendar covering feeding and light pruning.",
            },
        ],
        results: [
            { value: "160 m²", label: "Forecourt Replanted" },
            { value: "75%", label: "Fewer Maintenance Visits" },
            { value: "4 wks", label: "Start To Handover" },
        ],
        meta: [
            { label: "Client", value: "Northgate Offices" },
            { label: "Location", value: "120 Commerce Road, London" },
            { label: "Project Type", value: "Landscape Design" },
            { label: "Area", value: "160 m²" },
            { label: "Duration", value: "4 Weeks" },
            { label: "Completed", value: "2025" },
        ],
        testimonial: {
            quote: "It looks deliberate now, and it stays that way. We went from replanting every season to a couple of tidy visits a year.",
            name: "Daniel Okafor",
            role: "Facilities Manager, Northgate",
        },
        gallery: galleryFor(4, 7, 0, 6, 2),
    },
];

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
    return projects.find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
    return projects.map((project) => project.slug);
}

export function getRelatedProjects(
    project: ProjectDetail,
    limit = 3,
): ProjectDetail[] {
    const sameCategory = projects.filter(
        (item) => item.slug !== project.slug && item.category === project.category,
    );

    const others = projects.filter(
        (item) => item.slug !== project.slug && item.category !== project.category,
    );

    return [...sameCategory, ...others].slice(0, limit);
}
