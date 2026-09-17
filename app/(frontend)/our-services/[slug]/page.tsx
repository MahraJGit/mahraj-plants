import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailHero from "@/app/components/sections/service-detail/ServiceDetailHero";
import ServiceDetailGallery from "@/app/components/sections/service-detail/ServiceDetailGallery";
import ServiceDetailContent from "@/app/components/sections/service-detail/ServiceDetailContent";
import SiteCTA from "@/app/components/sections/shared/SiteCTA";
import JsonLd from "@/app/components/seo/JsonLd";
import {
    getAllServiceSlugs,
    getServiceBySlug,
} from "@/app/lib/services";
import { getDictionary } from "@/app/lib/i18n/get-dictionary";
import {
    getServicesMessages,
    localizeService,
} from "@/app/lib/i18n/services-catalog";
import { getLocale } from "@/app/lib/i18n/get-locale";
import {
    breadcrumbJsonLd,
    faqJsonLd,
    graphJsonLd,
    organizationJsonLd,
    serviceJsonLd,
    webPageJsonLd,
    websiteJsonLd,
} from "@/app/lib/seo/json-ld";
import { buildPageMetadata } from "@/app/lib/seo/metadata";

type ServiceDetailPageProps = {
    params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
    return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: ServiceDetailPageProps): Promise<Metadata> {
    const { slug } = await params;
    const service = getServiceBySlug(slug);
    const locale = await getLocale();
    const messages = getServicesMessages(locale);

    if (!service) {
        return { title: messages.detail.notFoundTitle, robots: { index: false } };
    }

    const localized = localizeService(service, locale);

    return buildPageMetadata({
        title: messages.detail.metaTitle.replace("{service}", localized.title),
        description: localized.description,
        path: `/our-services/${slug}`,
        locale,
        image: localized.image,
        imageAlt: localized.alt,
    });
}

export default async function ServiceDetailPage({
    params,
}: ServiceDetailPageProps) {
    const { slug } = await params;
    const service = getServiceBySlug(slug);

    if (!service) {
        notFound();
    }

    const locale = await getLocale();
    const dictionary = await getDictionary(locale);
    const messages = getServicesMessages(locale);
    const localized = localizeService(service, locale);
    const title = messages.detail.metaTitle.replace("{service}", localized.title);

    return (
        <>
            <JsonLd
                data={graphJsonLd(
                    organizationJsonLd(),
                    websiteJsonLd(),
                    webPageJsonLd({
                        title,
                        description: localized.description,
                        path: `/our-services/${slug}`,
                    }),
                    serviceJsonLd(localized),
                    faqJsonLd(localized.faqs),
                    breadcrumbJsonLd([
                        { name: dictionary.nav.home, path: "/" },
                        { name: dictionary.nav.services, path: "/our-services" },
                        { name: localized.title, path: `/our-services/${slug}` },
                    ]),
                )}
            />
            <ServiceDetailHero service={service} />
            <ServiceDetailGallery service={service} />
            <ServiceDetailContent service={service} />
            <SiteCTA />
        </>
    );
}
