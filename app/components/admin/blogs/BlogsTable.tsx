"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import type { AdminBlog } from "@/app/lib/admin/schema";
import { deleteBlogAction, setBlogStatusAction } from "@/app/lib/admin/blog-actions";
import AdminBadge from "@/app/components/admin/ui/AdminBadge";

type BlogsTableProps = {
    blogs: AdminBlog[];
};

function PendingActionButton({
    children,
    pendingLabel,
    className,
}: {
    children: React.ReactNode;
    pendingLabel: string;
    className?: string;
}) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className={`cursor-pointer ${className ?? ""}`}
        >
            {pending ? pendingLabel : children}
        </button>
    );
}

export default function BlogsTable({ blogs }: BlogsTableProps) {
    const [deleteBlog, setDeleteBlog] = useState<AdminBlog | null>(null);
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [loadingEdit, setLoadingEdit] = useState<string | null>(null);
    const [loadingView, setLoadingView] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function closeMenu(event: MouseEvent) {
            if (!menuRef.current?.contains(event.target as Node)) {
                setOpenMenu(null);
            }
        }

        document.addEventListener("mousedown", closeMenu);
        return () => document.removeEventListener("mousedown", closeMenu);
    }, []);

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
                                    <div className="flex justify-end">
                                        <div
                                            ref={openMenu === blog.id ? menuRef : undefined}
                                            className="relative"
                                        >
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setOpenMenu((current) =>
                                                        current === blog.id ? null : blog.id,
                                                    )
                                                }
                                                className="flex cursor-pointer items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-medium text-white transition hover:bg-section"
                                            >
                                                Actions
                                                <span aria-hidden="true">+</span>
                                            </button>
                                            {openMenu === blog.id ? (
                                            <div className="absolute right-0 z-10 mt-2 w-36 overflow-hidden rounded-xl border border-primary/10 bg-white p-1.5 shadow-[0_8px_30px_rgba(10,37,14,0.12)]">
                                                <Link
                                                    href={`/admin/blogs/${blog.slug}`}
                                                    onClick={() => {
                                                        setOpenMenu(null);
                                                        setLoadingEdit(blog.id);
                                                    }}
                                                    className="block rounded-lg px-3 py-2 text-sm text-primary hover:bg-cream"
                                                >
                                                    {loadingEdit === blog.id ? "Opening..." : "Edit"}
                                                </Link>
                                                <form
                                                    action={setBlogStatusAction}
                                                    onSubmit={() => setOpenMenu(null)}
                                                >
                                                    <input type="hidden" name="id" value={blog.id} />
                                                    <input type="hidden" name="slug" value={blog.slug} />
                                                    <input
                                                        type="hidden"
                                                        name="status"
                                                        value={blog.status === "published" ? "archived" : "published"}
                                                    />
                                                    <PendingActionButton
                                                        pendingLabel="Saving..."
                                                        className="block w-full rounded-lg px-3 py-2 text-left text-sm text-primary hover:bg-cream disabled:opacity-50"
                                                    >
                                                        {blog.status === "published" ? "Inactive" : "Active"}
                                                    </PendingActionButton>
                                                </form>
                                                <form
                                                    action={deleteBlogAction}
                                                >
                                                    <input type="hidden" name="id" value={blog.id} />
                                                    <input type="hidden" name="slug" value={blog.slug} />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setOpenMenu(null);
                                                            setDeleteBlog(blog);
                                                        }}
                                                        className="block w-full cursor-pointer rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                                                    >
                                                        Delete
                                                    </button>
                                                </form>
                                                <Link
                                                    href={`/blogs/${blog.slug}/preview`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={() => {
                                                        setOpenMenu(null);
                                                        setLoadingView(blog.id);
                                                    }}
                                                    className="block rounded-lg px-3 py-2 text-sm text-primary hover:bg-cream"
                                                >
                                                    {loadingView === blog.id ? "Opening..." : "View"}
                                                </Link>
                                            </div>
                                            ) : null}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {deleteBlog ? (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-primary/45 p-4"
                    role="presentation"
                    onClick={() => setDeleteBlog(null)}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="delete-blog-title"
                        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <h2 id="delete-blog-title" className="text-lg font-semibold text-primary">
                            Delete blog?
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-primary/65">
                            Are you sure you want to delete &quot;{deleteBlog.title}&quot;? This action cannot be undone.
                        </p>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setDeleteBlog(null)}
                                className="cursor-pointer rounded-full bg-white px-5 py-2.5 text-sm font-medium text-primary ring-1 ring-primary/10 hover:bg-cream"
                            >
                                Cancel
                            </button>
                            <form action={deleteBlogAction} onSubmit={() => setDeleteBlog(null)}>
                                <input type="hidden" name="id" value={deleteBlog.id} />
                                <input type="hidden" name="slug" value={deleteBlog.slug} />
                                <PendingActionButton
                                    pendingLabel="Deleting..."
                                    className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
                                >
                                    Delete
                                </PendingActionButton>
                            </form>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
