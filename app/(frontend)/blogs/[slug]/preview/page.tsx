import { notFound } from "next/navigation";
import BlogDetailBody from "@/app/components/sections/blog/BlogDetailBody";
import BlogDetailHero from "@/app/components/sections/blog/BlogDetailHero";
import SiteCTA from "@/app/components/sections/shared/SiteCTA";
import { getAdminBlogBySlug } from "@/app/lib/admin/blogs";
import { getLatestPublishedBlogs } from "@/app/lib/blogs";
import { getBlogsMessages } from "@/app/lib/i18n/blogs-catalog";
import { getLocale } from "@/app/lib/i18n/get-locale";

type BlogPreviewPageProps = {
    params: Promise<{ slug: string }>;
};

export default async function BlogPreviewPage({ params }: BlogPreviewPageProps) {
    const { slug } = await params;
    const article = await getAdminBlogBySlug(slug);

    if (!article) notFound();

    const locale = await getLocale();
    const messages = getBlogsMessages(locale);
    const latestPosts = await getLatestPublishedBlogs(3);

    return (
        <>
            <div className="bg-primary px-4 py-2 text-center text-xs font-medium text-white">
                Preview mode: this blog is not publicly visible yet.
            </div>
            <BlogDetailHero article={article} />
            <BlogDetailBody article={article} latestPosts={latestPosts} />
            <SiteCTA copy={messages.siteCta} />
        </>
    );
}