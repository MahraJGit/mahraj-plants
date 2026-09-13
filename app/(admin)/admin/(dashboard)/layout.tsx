import AdminShell from "@/app/components/admin/layout/AdminShell";
import AuthSplitLayout from "@/app/components/admin/auth/AuthSplitLayout";
import LoginForm from "@/app/components/admin/auth/LoginForm";
import { getAdminSession } from "@/app/lib/admin/session";

export default async function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getAdminSession();

    if (!session) {
        return (
            <AuthSplitLayout
                eyebrow="Welcome back"
                title="Sign in to the studio"
                subtitle="Access blogs and every field the public site already shows — cards, heroes, and article body."
            >
                <LoginForm />
            </AuthSplitLayout>
        );
    }

    return <AdminShell session={session}>{children}</AdminShell>;
}
