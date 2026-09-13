import Link from "next/link";
import { cn } from "@/app/lib/utils";

const variants = {
    primary:
        "bg-secondary text-white hover:bg-secondary/90 shadow-sm",
    dark: "bg-primary text-white hover:bg-section",
    ghost:
        "bg-white text-primary ring-1 ring-primary/10 hover:bg-cream",
    danger: "bg-red-600 text-white hover:bg-red-700",
} as const;

const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-sm sm:text-base",
} as const;

type AdminButtonProps = {
    children: React.ReactNode;
    variant?: keyof typeof variants;
    size?: keyof typeof sizes;
    className?: string;
    href?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    onClick?: () => void;
};

export default function AdminButton({
    children,
    variant = "primary",
    size = "md",
    className,
    href,
    type = "button",
    disabled,
    onClick,
}: AdminButtonProps) {
    const classes = cn(
        "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-medium transition disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
    );

    if (href && !disabled) {
        return (
            <Link href={href} className={classes}>
                {children}
            </Link>
        );
    }

    return (
        <button type={type} disabled={disabled} onClick={onClick} className={classes}>
            {children}
        </button>
    );
}
