import type { Metadata } from "next";
import BlogHero from "../../components/sections/blog/BlogHero";
import BlogContent from "../../components/sections/blog/BlogContent";
import Consultation from "../../components/sections/home/Consultation";

export const metadata: Metadata = {
    title: "Blogs & News | Mahraj Plants",
    description:
        "Explore expert insights, practical ideas, and fresh inspiration for better gardening and sustainable living from Mahraj Plants.",
};

export default function BlogsPage() {
    return (
        <>
            <BlogHero />
            <BlogContent />
            <Consultation variant="newsletter" />
        </>
    );
}
