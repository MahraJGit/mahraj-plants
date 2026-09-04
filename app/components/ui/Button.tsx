import { cn } from "@/app/lib/utils";

const variants = {
    primary: "bg-white text-primary hover:bg-white/90",
    secondary: "bg-secondary text-white hover:bg-secondary/90",
} as const;

const baseClassName =
    "inline-flex cursor-pointer items-center justify-center rounded-full px-8 py-3.5 font-medium text-base leading-[100%] tracking-[-1%] transition-colors";

type ButtonProps = {
    children: React.ReactNode;
    variant?: keyof typeof variants;
    className?: string;
    href?: string;
    type?: "button" | "submit" | "reset";
    target?: React.HTMLAttributeAnchorTarget;
    rel?: string;
};

export default function Button({
    children,
    variant = "primary",
    className,
    href,
    type = "button",
    target,
    rel,
}: ButtonProps) {
    const classes = cn(variants[variant], baseClassName, className);

    if (href) {
        return (
            <a
                href={href}
                target={target}
                rel={rel}
                className={classes}
            >
                {children}
            </a>
        );
    }

    return (
        <button type={type} className={classes}>
            {children}
        </button>
    );
}
