import {
    EMAIL_DISPLAY,
    FACEBOOK_HREF,
    INSTAGRAM_HREF,
    PHONE_DISPLAY,
    X_HREF,
} from "@/app/lib/contact";

export const SITE_NAME = "Mahraj Landscaping";
export const SITE_TAGLINE =
    "Plants, gardens, and outdoor design in Riyadh";

export const DEFAULT_OG_IMAGE = "/images/home/hero-bg-1.jpg";
export const DEFAULT_OG_IMAGE_ALT =
    "Gardener watering flowers in a lush Mahraj Landscaping garden";

export const NURSERY_STREET =
    "Mahraj Agriculture Co, Office No 9, 1st Floor, 5207, AlMalqa";
export const NURSERY_CITY = "Riyadh";
export const NURSERY_COUNTRY = "SA";
export const NURSERY_COUNTRY_NAME = "Saudi Arabia";

export function getSiteUrl(): string {
    const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
    if (configured) return configured;

    const vercelUrl = process.env.VERCEL_URL?.replace(/\/$/, "");
    if (vercelUrl) {
        return vercelUrl.startsWith("http://") || vercelUrl.startsWith("https://")
            ? vercelUrl
            : `https://${vercelUrl}`;
    }

    return "https://mahrajlandscaping.com";
}

export function absoluteUrl(path = "/"): string {
    const base = getSiteUrl();
    if (!path || path === "/") return base;
    return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function absoluteAsset(path: string): string {
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    return absoluteUrl(path);
}

export const SOCIAL_PROFILES = [FACEBOOK_HREF, INSTAGRAM_HREF, X_HREF];

export const BUSINESS = {
    name: SITE_NAME,
    email: EMAIL_DISPLAY,
    phone: PHONE_DISPLAY,
    phoneIntl: "+966556891877",
    street: NURSERY_STREET,
    city: NURSERY_CITY,
    country: NURSERY_COUNTRY,
    countryName: NURSERY_COUNTRY_NAME,
} as const;
