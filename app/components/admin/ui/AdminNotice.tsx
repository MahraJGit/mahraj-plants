import {
    HiOutlineExclamationCircle,
    HiOutlineInformationCircle,
} from "react-icons/hi";
import { cn } from "@/app/lib/utils";

type AdminNoticeProps = {
    children: React.ReactNode;
    tone?: "info" | "success" | "error";
    className?: string;
};

export default function AdminNotice({
    children,
    tone = "info",
    className,
}: AdminNoticeProps) {
    const Icon =
        tone === "error"
            ? HiOutlineExclamationCircle
            : HiOutlineInformationCircle;

    return (
        <p
            role={tone === "error" ? "alert" : "status"}
            className={cn(
                "flex items-start gap-2 rounded-2xl px-4 py-3 text-sm",
                tone === "info" && "bg-cream text-primary/80",
                tone === "success" && "bg-secondary/15 text-section",
                tone === "error" && "bg-red-50 text-red-800",
                className,
            )}
        >
            <Icon aria-hidden className="mt-0.5 size-4 shrink-0" />
            <span>{children}</span>
        </p>
    );
}
