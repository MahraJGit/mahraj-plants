import AdminButton from "@/app/components/admin/ui/AdminButton";
import AdminPageHeader from "@/app/components/admin/ui/AdminPageHeader";
import StatCard from "@/app/components/admin/ui/StatCard";
import BlogsTable from "@/app/components/admin/blogs/BlogsTable";
import { getAdminBlogs, getAdminBlogStats } from "@/app/lib/admin/blogs";

export default async function AdminDashboardPage() {
    const blogs = await getAdminBlogs();
    const stats = await getAdminBlogStats();
    const recent = blogs.slice(0, 5);

    return (
        <div>
            <AdminPageHeader
                eyebrow="Overview"
                title="Content studio"
                description="Manage blog posts stored in Supabase. Published articles appear on the public site."
                actions={
                    <AdminButton href="/admin/blogs/new">New article</AdminButton>
                }
            />

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <StatCard
                    label="Articles"
                    value={stats.total}
                    hint="All posts in the database"
                />
                <StatCard
                    label="Published"
                    value={stats.published}
                    hint="Live on /blogs"
                />
                <StatCard
                    label="Categories"
                    value={stats.categories}
                    hint="Used across published posts"
                />
            </div>

            <div className="mt-10 flex items-end justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-primary">Recent articles</h2>
                    <p className="mt-1 text-sm text-primary/55">
                        Open any row to edit the live database record.
                    </p>
                </div>
                <AdminButton href="/admin/blogs" variant="ghost">
                    View all
                </AdminButton>
            </div>

            <div className="mt-5">
                <BlogsTable blogs={recent} />
            </div>
        </div>
    );
}
