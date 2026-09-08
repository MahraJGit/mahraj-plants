import type { Metadata } from "next";
import LegalHero from "@/app/components/sections/legal/LegalHero";
import LegalDocument from "@/app/components/sections/legal/LegalDocument";
import SiteCTA from "@/app/components/sections/shared/SiteCTA";
import { getDictionary } from "@/app/lib/i18n/get-dictionary";
import { getLocale } from "@/app/lib/i18n/get-locale";

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getLocale();
    const dictionary = await getDictionary(locale);

    return {
        title: dictionary.termsPage.metaTitle,
        description: dictionary.termsPage.metaDescription,
    };
}

export default function TermsAndConditionsPage() {
    return (
        <>
            <LegalHero namespace="termsPage" />
            <LegalDocument namespace="termsPage" />
            <SiteCTA />
        </>
    );
}
