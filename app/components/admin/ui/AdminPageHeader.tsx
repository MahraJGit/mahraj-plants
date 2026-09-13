type AdminPageHeaderProps = {
    eyebrow?: string;
    title: string;
    description?: string;
    actions?: React.ReactNode;
};

export default function AdminPageHeader({
    eyebrow = "Admin",
    title,
    description,
    actions,
}: AdminPageHeaderProps) {
    return (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
                <p className="font-script text-2xl text-secondary">{eyebrow}</p>
                <h1 className="mt-1 text-[28px] font-bold tracking-[-2%] text-primary sm:text-[36px]">
                    {title}
                </h1>
                {description ? (
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-primary/60">
                        {description}
                    </p>
                ) : null}
            </div>
            {actions ? (
                <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>
            ) : null}
        </div>
    );
}
