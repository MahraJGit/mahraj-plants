import { notFound } from "next/navigation";
import AdminButton from "@/app/components/admin/ui/AdminButton";
import AdminPageHeader from "@/app/components/admin/ui/AdminPageHeader";
import BlogEditorForm from "@/app/components/admin/blogs/BlogEditorForm";
import { getAdminBlogBySlug } from "@/app/lib/admin/blogs";

type AdminBlogDetailPageProps = {
    params: Promise<{ slug: string }>;
};

export default async function AdminBlogDetailPage({
    params,
}: AdminBlogDetailPageProps) {
    const { slug } = await params;
    const blog = await getAdminBlogBySlug(slug);

    if (!blog) {
        notFound();
    }

    return (
        <div>
            <AdminPageHeader
                eyebrow="Edit post"
                title={blog.title}
                description="Update the title, short description, article, images, tags, and publish date."
                actions={
                    <>
                        <AdminButton href="/admin/blogs" variant="ghost">
                            Back to blogs
                        </AdminButton>
                        <AdminButton href={`/blogs/${blog.slug}`} variant="dark">
                            View public page
                        </AdminButton>
                    </>
                }
            />
            <div className="mt-8">
                <BlogEditorForm initialBlog={blog} mode="edit" />
            </div>
        </div>
    );
}
