import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailHero from "@/app/components/sections/service-detail/ServiceDetailHero";
import ServiceDetailGallery from "@/app/components/sections/service-detail/ServiceDetailGallery";
import ServiceDetailContent from "@/app/components/sections/service-detail/ServiceDetailContent";
import SiteCTA from "@/app/components/sections/shared/SiteCTA";
import {
    getAllServiceSlugs,
    getServiceBySlug,
} from "@/app/lib/services";
import {
    getServicesMessages,
    localizeService,
} from "@/app/lib/i18n/services-catalog";
import { getLocale } from "@/app/lib/i18n/get-locale";

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
        return { title: messages.detail.notFoundTitle };
    }

    const localized = localizeService(service, locale);

    return {
        title: messages.detail.metaTitle.replace("{service}", localized.title),
        description: localized.description,
    };
}

export default async function ServiceDetailPage({
    params,
}: ServiceDetailPageProps) {
    const { slug } = await params;
    const service = getServiceBySlug(slug);

    if (!service) {
        notFound();
    }

    return (
        <>
            <ServiceDetailHero service={service} />
            <ServiceDetailGallery service={service} />
            <ServiceDetailContent service={service} />
            <SiteCTA />
        </>
    );
}
