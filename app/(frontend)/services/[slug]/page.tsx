import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailHero from "@/app/components/sections/service-detail/ServiceDetailHero";
import ServiceDetailGallery from "@/app/components/sections/service-detail/ServiceDetailGallery";
import ServiceDetailContent from "@/app/components/sections/service-detail/ServiceDetailContent";
import ServicesCTA from "@/app/components/sections/services/ServicesCTA";
import {
    getAllServiceSlugs,
    getServiceBySlug,
} from "@/app/lib/services";

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

    if (!service) {
        return { title: "Service | Mahraj Plants" };
    }

    return {
        title: `${service.title} | Mahraj Plants`,
        description: service.description,
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
            <ServiceDetailGallery images={service.gallery} />
            <ServiceDetailContent service={service} />
            <ServicesCTA />
        </>
    );
}
