import type { Locale } from "./config";
import type { ServiceDetail } from "@/app/lib/services";
import servicesEn from "@/messages/services.en.json";
import servicesAr from "@/messages/services.ar.json";

export type ServicesMessages = typeof servicesEn;

type ServiceCopy = ServicesMessages["landscape-design-planning"];

const catalogs: Record<Locale, ServicesMessages> = {
    en: servicesEn,
    ar: servicesAr,
};

const SERVICE_SLUGS = [
    "landscape-design-planning",
    "irrigation-drainage-solutions",
    "green-maintenance-packages",
    "hardscaping-lighting",
    "gardening-plant-upgrade",
    "outdoor-maintenance-finishing",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

function isServiceSlug(value: string): value is ServiceSlug {
    return (SERVICE_SLUGS as readonly string[]).includes(value);
}

export function getServicesMessages(locale: Locale): ServicesMessages {
    return catalogs[locale] ?? catalogs.en;
}

export function getServiceCopy(
    slug: string,
    locale: Locale,
): ServiceCopy | undefined {
    if (!isServiceSlug(slug)) return undefined;
    return getServicesMessages(locale)[slug];
}

export function localizeService(
    service: ServiceDetail,
    locale: Locale,
): ServiceDetail {
    const copy = getServiceCopy(service.slug, locale);
    if (!copy) return service;

    return {
        ...service,
        title: copy.title,
        description: copy.description,
        heroDescription: copy.heroDescription,
        alt: copy.alt,
        features: copy.features,
        introTitle: copy.introTitle,
        introBody: copy.introBody,
        includedTitle: copy.includedTitle,
        includedDescription: copy.includedDescription,
        includedItems: copy.includedItems,
        processTitle: copy.processTitle,
        processDescription: copy.processDescription,
        processSteps: copy.processSteps.map((step, index) => ({
            number: step.number || service.processSteps[index]?.number || `${index + 1}`.padStart(2, "0"),
            title: step.title,
            description: step.description,
        })),
        faqTitle: copy.faqTitle,
        faqDescription: copy.faqDescription,
        faqs: copy.faqs,
        gallery: service.gallery.map((image, index) => ({
            ...image,
            alt: copy.galleryAlts[index] ?? image.alt,
        })),
    };
}

export function localizeServices(
    items: ServiceDetail[],
    locale: Locale,
): ServiceDetail[] {
    return items.map((service) => localizeService(service, locale));
}

export function localizeHighlightCopy<T extends { title: string; description: string }>(
    items: T[],
    locale: Locale,
): T[] {
    const highlights = getServicesMessages(locale).highlights;
    return items.map((item, index) => ({
        ...item,
        title: highlights[index]?.title ?? item.title,
        description: highlights[index]?.description ?? item.description,
    }));
}

export function localizeFeatureLabels(
    items: { icon: string; label: string }[],
    labels: string[],
) {
    return items.map((item, index) => ({
        ...item,
        label: labels[index] ?? item.label,
    }));
}

export function localizeTestimonials(
    items: { quote: string; name: string; location: string; image: string }[],
    locale: Locale,
) {
    const copy = getServicesMessages(locale).testimonials.items;
    return items.map((item, index) => ({
        ...item,
        quote: copy[index]?.quote ?? item.quote,
        name: copy[index]?.name ?? item.name,
        location: copy[index]?.location ?? item.location,
    }));
}
