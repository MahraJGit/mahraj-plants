import AdminButton from "@/app/components/admin/ui/AdminButton";
import AdminPageHeader from "@/app/components/admin/ui/AdminPageHeader";
import BlogEditorForm from "@/app/components/admin/blogs/BlogEditorForm";
import { createEmptyAdminBlog } from "@/app/lib/admin/blogs";

export default function AdminNewBlogPage() {
    return (
        <div>
            <AdminPageHeader
                eyebrow="Create"
                title="New post"
                description="Write the title, a short description, and the full article. Add a featured image, extra photos, tags, and a publish date."
                actions={
                    <AdminButton href="/admin/blogs" variant="ghost">
                        Back to blogs
                    </AdminButton>
                }
            />
            <div className="mt-8">
                <BlogEditorForm initialBlog={createEmptyAdminBlog()} mode="create" />
            </div>
        </div>
    );
}
