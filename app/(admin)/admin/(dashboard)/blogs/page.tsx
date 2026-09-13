import AdminButton from "@/app/components/admin/ui/AdminButton";
import AdminPageHeader from "@/app/components/admin/ui/AdminPageHeader";
import BlogsPageClient from "@/app/components/admin/blogs/BlogsPageClient";
import { getAdminBlogs } from "@/app/lib/admin/blogs";

export default async function AdminBlogsPage() {
    const blogs = await getAdminBlogs();

    return (
        <div>
            <AdminPageHeader
                eyebrow="Catalog"
                title="Blogs"
                description="Create and manage articles stored in Supabase. Published posts appear on the public site."
                actions={
                    <AdminButton href="/admin/blogs/new">New article</AdminButton>
                }
            />
            <BlogsPageClient blogs={blogs} />
        </div>
    );
}
