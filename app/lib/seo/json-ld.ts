import type { BlogArticle } from "@/app/lib/blogs/types";
import type { Product } from "@/data/types";
import type { ServiceDetail } from "@/app/lib/services";
import type { ProjectDetail } from "@/app/lib/projects";
import { absoluteAsset, absoluteUrl, BUSINESS, SITE_NAME, SOCIAL_PROFILES } from "./config";

export type JsonLd = Record<string, unknown>;

export type BreadcrumbItem = {
    name: string;
    path: string;
};

export function organizationJsonLd(): JsonLd {
    return {
        "@type": "Organization",
        "@id": `${absoluteUrl("/")}/#organization`,
        name: BUSINESS.name,
        url: absoluteUrl("/"),
        email: BUSINESS.email,
        telephone: BUSINESS.phoneIntl,
        logo: absoluteAsset("/mahraj-landscaping-logo.png"),
        sameAs: SOCIAL_PROFILES,
        address: postalAddress(),
    };
}

export function localBusinessJsonLd(): JsonLd {
    return {
        "@type": ["LandscapingBusiness", "LocalBusiness"],
        "@id": `${absoluteUrl("/")}/#localbusiness`,
        name: BUSINESS.name,
        url: absoluteUrl("/"),
        email: BUSINESS.email,
        telephone: BUSINESS.phoneIntl,
        image: absoluteAsset("/images/home/hero-bg-1.jpg"),
        priceRange: "$$",
        address: postalAddress(),
        areaServed: {
            "@type": "City",
            name: BUSINESS.city,
            containedInPlace: {
                "@type": "Country",
                name: BUSINESS.countryName,
            },
        },
        openingHoursSpecification: [
            weekdayHours("08:00", "12:00"),
            weekdayHours("13:00", "18:00"),
        ],
        sameAs: SOCIAL_PROFILES,
        parentOrganization: { "@id": `${absoluteUrl("/")}/#organization` },
    };
}

export function websiteJsonLd(): JsonLd {
    return {
        "@type": "WebSite",
        "@id": `${absoluteUrl("/")}/#website`,
        url: absoluteUrl("/"),
        name: SITE_NAME,
        inLanguage: ["en", "ar"],
        publisher: { "@id": `${absoluteUrl("/")}/#organization` },
    };
}

export function webPageJsonLd({
    title,
    description,
    path,
}: {
    title: string;
    description: string;
    path: string;
}): JsonLd {
    return {
        "@type": "WebPage",
        "@id": `${absoluteUrl(path)}#webpage`,
        url: absoluteUrl(path),
        name: title,
        description,
        isPartOf: { "@id": `${absoluteUrl("/")}/#website` },
        about: { "@id": `${absoluteUrl("/")}/#localbusiness` },
    };
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]): JsonLd {
    return {
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: absoluteUrl(item.path),
        })),
    };
}

export function articleJsonLd(
    article: BlogArticle,
    description: string,
    date = blogDateIso(article),
): JsonLd {
    return {
        "@type": "Article",
        headline: article.title,
        description,
        image: [absoluteAsset(article.image)],
        datePublished: date,
        dateModified: date,
        author: {
            "@type": "Person",
            name: article.author,
        },
        publisher: { "@id": `${absoluteUrl("/")}/#organization` },
        mainEntityOfPage: absoluteUrl(`/blogs/${article.slug}`),
        articleSection: article.category,
        keywords: article.tags.join(", "),
    };
}

export function serviceJsonLd(service: ServiceDetail): JsonLd {
    return {
        "@type": "Service",
        name: service.title,
        description: service.description,
        image: absoluteAsset(service.image),
        url: absoluteUrl(`/our-services/${service.slug}`),
        provider: { "@id": `${absoluteUrl("/")}/#localbusiness` },
        areaServed: BUSINESS.city,
        serviceType: service.title,
    };
}

export function faqJsonLd(
    faqs: Array<{ question: string; answer: string }>,
): JsonLd | null {
    if (faqs.length === 0) return null;

    return {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };
}

export function productJsonLd(product: Product, categoryName: string): JsonLd {
    return {
        "@type": "Product",
        name: product.title,
        description: product.description,
        image: absoluteAsset(product.image),
        url: absoluteUrl(`/products/${product.slug}`),
        brand: { "@type": "Brand", name: SITE_NAME },
        category: categoryName,
    };
}

export function projectJsonLd(project: ProjectDetail): JsonLd {
    return {
        "@type": "CreativeWork",
        name: project.title,
        description: project.description,
        image: absoluteAsset(project.image),
        url: absoluteUrl(`/projects/${project.slug}`),
        creator: { "@id": `${absoluteUrl("/")}/#organization` },
        about: project.category,
    };
}

export function graphJsonLd(...nodes: Array<JsonLd | null>): JsonLd {
    return {
        "@context": "https://schema.org",
        "@graph": nodes.filter((node): node is JsonLd => node !== null),
    };
}

export function homeJsonLd(title: string, description: string): JsonLd {
    return graphJsonLd(
        organizationJsonLd(),
        localBusinessJsonLd(),
        websiteJsonLd(),
        webPageJsonLd({ title, description, path: "/" }),
    );
}

function postalAddress() {
    return {
        "@type": "PostalAddress",
        streetAddress: BUSINESS.street,
        addressLocality: BUSINESS.city,
        addressCountry: BUSINESS.country,
    };
}

function weekdayHours(opens: string, closes: string) {
    return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Saturday",
            "Sunday",
        ],
        opens,
        closes,
    };
}

export function blogDateIso(article: BlogArticle): string {
    if (article.publishedAt) {
        return article.publishedAt.slice(0, 10);
    }

    const months = [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
    ];
    const month = String(
        Math.max(months.indexOf(article.month.toUpperCase()) + 1, 1),
    ).padStart(2, "0");
    return `${article.year}-${month}-${article.day.padStart(2, "0")}`;
}
