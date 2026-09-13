import type { Metadata } from "next";
import type { Locale } from "@/app/lib/i18n/config";
import {
    DEFAULT_OG_IMAGE,
    DEFAULT_OG_IMAGE_ALT,
    SITE_NAME,
    absoluteAsset,
    absoluteUrl,
    getSiteUrl,
} from "./config";

export type PageMetadataInput = {
    title: string;
    description: string;
    path: string;
    locale: Locale;
    image?: string;
    imageAlt?: string;
    type?: "website" | "article";
    noIndex?: boolean;
    publishedTime?: string;
    modifiedTime?: string;
    keywords?: string | string[];
};

export function buildPageMetadata({
    title,
    description,
    path,
    locale,
    image = DEFAULT_OG_IMAGE,
    imageAlt = DEFAULT_OG_IMAGE_ALT,
    type = "website",
    noIndex = false,
    publishedTime,
    modifiedTime,
    keywords,
}: PageMetadataInput): Metadata {
    const url = absoluteUrl(path);
    const ogImage = absoluteAsset(image);
    const ogLocale = locale === "ar" ? "ar_SA" : "en_US";
    const alternateLocale = locale === "ar" ? "en_US" : "ar_SA";

    return {
        metadataBase: new URL(getSiteUrl()),
        title,
        description,
        keywords,
        applicationName: SITE_NAME,
        authors: [{ name: SITE_NAME, url: getSiteUrl() }],
        creator: SITE_NAME,
        publisher: SITE_NAME,
        alternates: {
            canonical: url,
            languages: {
                en: url,
                ar: url,
                "x-default": url,
            },
        },
        robots: noIndex
            ? { index: false, follow: false, nocache: true }
            : {
                  index: true,
                  follow: true,
                  googleBot: {
                      index: true,
                      follow: true,
                      "max-image-preview": "large",
                      "max-snippet": -1,
                      "max-video-preview": -1,
                  },
              },
        openGraph: {
            type,
            locale: ogLocale,
            alternateLocale: [alternateLocale],
            url,
            siteName: SITE_NAME,
            title,
            description,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: imageAlt,
                },
            ],
            ...(type === "article" && publishedTime
                ? { publishedTime, modifiedTime: modifiedTime ?? publishedTime }
                : {}),
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [ogImage],
        },
    };
}
