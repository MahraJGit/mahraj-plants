import type { Metadata } from "next";
import BlogHero from "@/app/components/sections/blog/BlogHero";
import BlogContent from "@/app/components/sections/blog/BlogContent";
import SiteCTA from "@/app/components/sections/shared/SiteCTA";
import JsonLd from "@/app/components/seo/JsonLd";
import {
    getLatestPublishedBlogs,
    listPublishedBlogs,
} from "@/app/lib/blogs";
import { getBlogsMessages } from "@/app/lib/i18n/blogs-catalog";
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
    const messages = getBlogsMessages(locale);

    return buildPageMetadata({
        title: messages.detail.pageMetaTitle,
        description: messages.detail.pageMetaDescription,
        path: "/blogs",
        locale,
        image: "/images/blogs/blog-bg.webp",
    });
}

export default async function BlogsPage() {
    const locale = await getLocale();
    const dictionary = await getDictionary(locale);
    const messages = getBlogsMessages(locale);
    const [posts, latestPosts] = await Promise.all([
        listPublishedBlogs(),
        getLatestPublishedBlogs(3),
    ]);

    return (
        <>
            <JsonLd
                data={graphJsonLd(
                    organizationJsonLd(),
                    websiteJsonLd(),
                    webPageJsonLd({
                        title: messages.detail.pageMetaTitle,
                        description: messages.detail.pageMetaDescription,
                        path: "/blogs",
                    }),
                    breadcrumbJsonLd([
                        { name: dictionary.nav.home, path: "/" },
                        { name: dictionary.nav.blogs, path: "/blogs" },
                    ]),
                )}
            />
            <BlogHero />
            <BlogContent posts={posts} latestPosts={latestPosts} />
            <SiteCTA copy={messages.siteCta} />
        </>
    );
}
