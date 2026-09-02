import { cn } from "@/app/lib/utils";

export default function Button({
    children,
    variant = "primary",
    className,
}: {
    children: React.ReactNode;
    variant?: "primary" | "secondary";
    className?: string;
}) {
    const variants = {
        primary: "bg-white text-primary hover:bg-white/90",
        secondary: "bg-secondary text-white hover:bg-secondary/90",
    };

    return (
        <button
            type="button"
            className={cn(
                variants[variant],
                "cursor-pointer rounded-full px-8 py-3.5 font-medium text-base leading-[100%] tracking-[-1%] transition-colors",
                className,
            )}
        >
            {children}
        </button>
    );
}