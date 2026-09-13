import type { Metadata } from "next";
import AdminDocument from "@/app/components/admin/layout/AdminDocument";

export const metadata: Metadata = {
    title: "Admin | Mahraj Landscaping",
    description: "Mahraj Landscaping content studio",
    robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: { index: false, follow: false, noimageindex: true },
    },
};

export default function AdminGroupLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <AdminDocument />
            {children}
        </>
    );
}
