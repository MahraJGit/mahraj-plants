type StatCardProps = {
    label: string;
    value: string | number;
    hint?: string;
};

export default function StatCard({ label, value, hint }: StatCardProps) {
    return (
        <article className="rounded-[1.5rem] border border-primary/8 bg-white p-5 shadow-[0_8px_30px_rgba(10,37,14,0.05)]">
            <p className="text-xs font-semibold tracking-wider text-primary/45 uppercase">
                {label}
            </p>
            <p className="mt-3 text-3xl font-bold tracking-[-2%] text-primary">
                {value}
            </p>
            {hint ? (
                <p className="mt-1 text-xs text-primary/50">{hint}</p>
            ) : null}
        </article>
    );
}
