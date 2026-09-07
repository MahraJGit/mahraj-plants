import type { Metadata } from "next";
import BlogHero from "@/app/components/sections/blog/BlogHero";
import BlogContent from "@/app/components/sections/blog/BlogContent";
import SiteCTA from "@/app/components/sections/shared/SiteCTA";
import { getBlogsMessages } from "@/app/lib/i18n/blogs-catalog";
import { getLocale } from "@/app/lib/i18n/get-locale";

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getLocale();
    const messages = getBlogsMessages(locale);

    return {
        title: messages.detail.pageMetaTitle,
        description: messages.detail.pageMetaDescription,
    };
}

export default function BlogsPage() {
    return (
        <>
            <BlogHero />
            <BlogContent />
            <SiteCTA />
        </>
    );
}
