import { cn } from "@/app/lib/utils";
import type { BlogStatus } from "@/app/lib/admin/schema";

const statusStyles: Record<BlogStatus, string> = {
    published: "bg-secondary/15 text-section",
    draft: "bg-amber-100 text-amber-800",
    archived: "bg-primary/8 text-primary/60",
};

export default function AdminBadge({
    status,
    className,
}: {
    status: BlogStatus;
    className?: string;
}) {
    return (
        <span
            className={cn(
                "inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase",
                statusStyles[status],
                className,
            )}
        >
            {status}
        </span>
    );
}
