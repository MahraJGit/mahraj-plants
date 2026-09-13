import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/app/lib/seo/config";
import { getPublicSitemapEntries } from "@/app/lib/seo/sitemap-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const lastModified = new Date();
    const entries = await getPublicSitemapEntries();

    return entries.map((entry) => ({
        url: absoluteUrl(entry.path),
        lastModified,
        changeFrequency: entry.changeFrequency,
        priority: entry.priority,
    }));
}
