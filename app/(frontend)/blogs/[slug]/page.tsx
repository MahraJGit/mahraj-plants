import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogDetailBody from "@/app/components/sections/blog/BlogDetailBody";
import BlogDetailHero from "@/app/components/sections/blog/BlogDetailHero";
import SiteCTA from "@/app/components/sections/shared/SiteCTA";
import JsonLd from "@/app/components/seo/JsonLd";
import {
    getAllPublishedBlogSlugs,
    getLatestPublishedBlogs,
    getPublishedBlogBySlug,
} from "@/app/lib/blogs";
import {
    getBlogsMessages,
    localizeBlog,
} from "@/app/lib/i18n/blogs-catalog";
import { getDictionary } from "@/app/lib/i18n/get-dictionary";
import { getLocale } from "@/app/lib/i18n/get-locale";
import {
    articleJsonLd,
    blogDateIso,
    breadcrumbJsonLd,
    graphJsonLd,
    organizationJsonLd,
    webPageJsonLd,
    websiteJsonLd,
} from "@/app/lib/seo/json-ld";
import { buildPageMetadata } from "@/app/lib/seo/metadata";

type BlogDetailPageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    const slugs = await getAllPublishedBlogSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: BlogDetailPageProps): Promise<Metadata> {
    const { slug } = await params;
    const article = await getPublishedBlogBySlug(slug);
    const locale = await getLocale();
    const messages = getBlogsMessages(locale);

    if (!article) {
        return { title: messages.detail.notFoundTitle, robots: { index: false } };
    }

    const localized = localizeBlog(article, locale);
    const publishedTime = blogDateIso(article);

    return buildPageMetadata({
        title: messages.detail.metaTitle.replace("{blog}", localized.title),
        description: localized.excerpt,
        path: `/blogs/${slug}`,
        locale,
        image: localized.image,
        imageAlt: localized.alt,
        type: "article",
        publishedTime,
        modifiedTime: article.updatedAt,
    });
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
    const { slug } = await params;
    const article = await getPublishedBlogBySlug(slug);

    if (!article) {
        notFound();
    }

    const locale = await getLocale();
    const dictionary = await getDictionary(locale);
    const messages = getBlogsMessages(locale);
    const localized = localizeBlog(article, locale);
    const latestPosts = await getLatestPublishedBlogs(3);
    const title = messages.detail.metaTitle.replace("{blog}", localized.title);

    return (
        <>
            <JsonLd
                data={graphJsonLd(
                    organizationJsonLd(),
                    websiteJsonLd(),
                    webPageJsonLd({
                        title,
                        description: localized.excerpt,
                        path: `/blogs/${slug}`,
                    }),
                    articleJsonLd(localized, localized.excerpt),
                    breadcrumbJsonLd([
                        { name: dictionary.nav.home, path: "/" },
                        { name: dictionary.nav.blogs, path: "/blogs" },
                        { name: localized.title, path: `/blogs/${slug}` },
                    ]),
                )}
            />
            <BlogDetailHero article={article} />
            <BlogDetailBody article={article} latestPosts={latestPosts} />
            <SiteCTA />
        </>
    );
}
