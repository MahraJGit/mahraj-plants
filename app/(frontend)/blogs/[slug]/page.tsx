import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogDetailBody from "@/app/components/sections/blog/BlogDetailBody";
import BlogDetailHero from "@/app/components/sections/blog/BlogDetailHero";
import SiteCTA from "@/app/components/sections/shared/SiteCTA";
import {
    getAllBlogSlugs,
    getBlogBySlug,
} from "@/app/lib/blogs";
import {
    getBlogsMessages,
    localizeBlog,
} from "@/app/lib/i18n/blogs-catalog";
import { getLocale } from "@/app/lib/i18n/get-locale";

type BlogDetailPageProps = {
    params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
    return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: BlogDetailPageProps): Promise<Metadata> {
    const { slug } = await params;
    const article = getBlogBySlug(slug);
    const locale = await getLocale();
    const messages = getBlogsMessages(locale);

    if (!article) {
        return { title: messages.detail.notFoundTitle };
    }

    const localized = localizeBlog(article, locale);

    return {
        title: messages.detail.metaTitle.replace("{blog}", localized.title),
        description: localized.excerpt,
    };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
    const { slug } = await params;
    const article = getBlogBySlug(slug);

    if (!article) {
        notFound();
    }

    return (
        <>
            <BlogDetailHero article={article} />
            <BlogDetailBody article={article} />
            <SiteCTA />
        </>
    );
}
