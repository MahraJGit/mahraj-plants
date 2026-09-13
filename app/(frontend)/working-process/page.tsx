import type { Metadata } from "next";
import HowWeWorkHero from "@/app/components/sections/how-we-work/HowWeWorkHero";
import HowWeWorkQuote from "@/app/components/sections/how-we-work/HowWeWorkQuote";
import HowWeWorkSteps from "@/app/components/sections/how-we-work/HowWeWorkSteps";
import Portfolio from "@/app/components/sections/shared/Portfolio";
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
        title: dictionary.workingProcessPage.metaTitle,
        description: dictionary.workingProcessPage.metaDescription,
        path: "/working-process",
        locale,
        image: "/images/how-we-work/how-we-work-bg.webp",
    });
}

export default async function WorkingProcessPage() {
    const locale = await getLocale();
    const dictionary = await getDictionary(locale);

    return (
        <>
            <JsonLd
                data={graphJsonLd(
                    organizationJsonLd(),
                    websiteJsonLd(),
                    webPageJsonLd({
                        title: dictionary.workingProcessPage.metaTitle,
                        description: dictionary.workingProcessPage.metaDescription,
                        path: "/working-process",
                    }),
                    breadcrumbJsonLd([
                        { name: dictionary.nav.home, path: "/" },
                        {
                            name: dictionary.common.howWeWork,
                            path: "/working-process",
                        },
                    ]),
                )}
            />
            <HowWeWorkHero />
            <HowWeWorkQuote />
            <HowWeWorkSteps />
            <div className="mb-16">
            <Portfolio variant="cream" />
            </div>
            <SiteCTA />
        </>
    );
}
