import { notFound } from "next/navigation";
import BlogDetailBody from "@/app/components/sections/blog/BlogDetailBody";
import BlogDetailHero from "@/app/components/sections/blog/BlogDetailHero";
import SiteCTA from "@/app/components/sections/shared/SiteCTA";
import {
    getAllBlogSlugs,
    getBlogBySlug,
} from "@/app/lib/blogs";

type BlogDetailPageProps = {
    params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
    return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogDetailPageProps) {
    const { slug } = await params;
    const article = getBlogBySlug(slug);

    if (!article) {
        return { title: "Blog Not Found | Mahraj Plants" };
    }

    return {
        title: `${article.title} | Mahraj Plants`,
        description: article.excerpt,
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
