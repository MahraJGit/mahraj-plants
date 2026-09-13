import blogsEn from "@/messages/blogs.en.json";
import type { BlogBodyFields } from "@/app/lib/admin/schema";

const DEFAULT_BODY = blogsEn.detail.body;
const PLANNING_IMAGE = "/images/home/m-outdoor.webp";
const GALLERY_IMAGES = [
    "/images/home/m-landscaping.webp",
    "/images/home/hero-bg-3.jpg",
] as const;

export function createDefaultBody(): BlogBodyFields {
    return {
        introParagraph: DEFAULT_BODY.introParagraph,
        sectionHeading: DEFAULT_BODY.sectionHeading,
        sectionBody: DEFAULT_BODY.sectionBody,
        quote: DEFAULT_BODY.quote,
        quoteAuthor: DEFAULT_BODY.quoteAuthor,
        includedHeading: DEFAULT_BODY.includedHeading,
        includedItems: [...DEFAULT_BODY.includedItems],
        whyHeading: DEFAULT_BODY.whyHeading,
        whyItems: [...DEFAULT_BODY.whyItems],
        planningHeading: DEFAULT_BODY.planningHeading,
        planningParagraphs: [...DEFAULT_BODY.planningParagraphs],
        planningSteps: [...DEFAULT_BODY.planningSteps],
        planningImage: PLANNING_IMAGE,
        planningImageAlt: DEFAULT_BODY.planningImageAlt,
        maintenanceHeading: DEFAULT_BODY.maintenanceHeading,
        maintenanceTips: [...DEFAULT_BODY.maintenanceTips],
        galleryHeading: DEFAULT_BODY.galleryHeading,
        gallery: DEFAULT_BODY.galleryAlts.map((alt, index) => ({
            src: GALLERY_IMAGES[index] ?? GALLERY_IMAGES[0],
            alt,
        })),
    };
}
