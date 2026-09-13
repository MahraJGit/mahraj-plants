import type { Metadata } from "next";
import LegalHero from "@/app/components/sections/legal/LegalHero";
import LegalDocument from "@/app/components/sections/legal/LegalDocument";
import SiteCTA from "@/app/components/sections/shared/SiteCTA";
import JsonLd from "@/app/components/seo/JsonLd";
import { getDictionary } from "@/app/lib/i18n/get-dictionary";
import { getLocale } from "@/app/lib/i18n/get-locale";
import {
    breadcrumbJsonLd,
    graphJsonLd,
    organizationJsonLd,
    webPageJsonLd,
    websiteJsonLd,
} from "@/app/lib/seo/json-ld";
import { buildPageMetadata } from "@/app/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getLocale();
    const dictionary = await getDictionary(locale);

    return buildPageMetadata({
        title: dictionary.privacyPage.metaTitle,
        description: dictionary.privacyPage.metaDescription,
        path: "/privacy-policy",
        locale,
        image: "/images/categories/categories-hero-bg.webp",
    });
}

export default async function PrivacyPolicyPage() {
    const locale = await getLocale();
    const dictionary = await getDictionary(locale);

    return (
        <>
            <JsonLd
                data={graphJsonLd(
                    organizationJsonLd(),
                    websiteJsonLd(),
                    webPageJsonLd({
                        title: dictionary.privacyPage.metaTitle,
                        description: dictionary.privacyPage.metaDescription,
                        path: "/privacy-policy",
                    }),
                    breadcrumbJsonLd([
                        { name: dictionary.nav.home, path: "/" },
                        {
                            name: dictionary.privacyPage.hero.title,
                            path: "/privacy-policy",
                        },
                    ]),
                )}
            />
            <LegalHero namespace="privacyPage" />
            <LegalDocument namespace="privacyPage" />
            <SiteCTA />
        </>
    );
}
