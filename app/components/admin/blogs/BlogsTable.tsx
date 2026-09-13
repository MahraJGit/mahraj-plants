import Image from "next/image";
import Link from "next/link";
import type { AdminBlog } from "@/app/lib/admin/schema";
import AdminBadge from "@/app/components/admin/ui/AdminBadge";
import AdminButton from "@/app/components/admin/ui/AdminButton";

type BlogsTableProps = {
    blogs: AdminBlog[];
};

export default function BlogsTable({ blogs }: BlogsTableProps) {
    if (blogs.length === 0) {
        return (
            <div className="rounded-[1.5rem] border border-dashed border-primary/15 bg-white px-6 py-16 text-center">
                <p className="text-lg font-semibold text-primary">No blogs found</p>
                <p className="mt-2 text-sm text-primary/55">
                    Try another search or create a new article.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-[1.5rem] border border-primary/8 bg-white shadow-[0_8px_30px_rgba(10,37,14,0.05)]">
            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                    <thead className="bg-cream/80 text-xs font-semibold tracking-wider text-primary/55 uppercase">
                        <tr>
                            <th className="px-5 py-3.5">Article</th>
                            <th className="px-5 py-3.5">Category</th>
                            <th className="px-5 py-3.5">Author</th>
                            <th className="px-5 py-3.5">Date</th>
                            <th className="px-5 py-3.5">Status</th>
                            <th className="px-5 py-3.5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-primary/6">
                        {blogs.map((blog) => (
                            <tr key={blog.id} className="align-middle">
                                <td className="px-5 py-4">
                                    <Link
                                        href={`/admin/blogs/${blog.slug}`}
                                        className="flex items-center gap-3"
                                    >
                                        <span className="relative size-14 shrink-0 overflow-hidden rounded-xl">
                                            <Image
                                                src={blog.image}
                                                alt={blog.alt}
                                                fill
                                                sizes="56px"
                                                className="object-cover"
                                            />
                                        </span>
                                        <span>
                                            <span className="block font-semibold text-primary">
                                                {blog.title}
                                            </span>
                                            <span className="mt-0.5 block text-xs text-primary/45">
                                                /{blog.slug}
                                            </span>
                                        </span>
                                    </Link>
                                </td>
                                <td className="px-5 py-4 text-primary/70">
                                    {blog.category}
                                </td>
                                <td className="px-5 py-4 text-primary/70">
                                    {blog.author}
                                </td>
                                <td className="px-5 py-4 text-primary/70">
                                    {blog.day} {blog.month} {blog.year}
                                </td>
                                <td className="px-5 py-4">
                                    <AdminBadge status={blog.status} />
                                </td>
                                <td className="px-5 py-4">
                                    <div className="flex justify-end gap-2">
                                        <AdminButton
                                            href={`/admin/blogs/${blog.slug}`}
                                            variant="ghost"
                                            size="sm"
                                        >
                                            Fields
                                        </AdminButton>
                                        <AdminButton
                                            href={`/blogs/${blog.slug}`}
                                            variant="dark"
                                            size="sm"
                                        >
                                            View
                                        </AdminButton>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
