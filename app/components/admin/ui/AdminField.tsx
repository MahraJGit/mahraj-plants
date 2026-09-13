import { cn } from "@/app/lib/utils";

const controlClass =
    "w-full rounded-xl border border-primary/12 bg-white px-4 py-3 text-sm text-primary outline-none transition placeholder:text-primary/40 focus:border-secondary focus:ring-2 focus:ring-secondary/20";

type FieldShellProps = {
    label: string;
    hint?: string;
    error?: string;
    htmlFor?: string;
    children: React.ReactNode;
};

export function FieldShell({
    label,
    hint,
    error,
    htmlFor,
    children,
}: FieldShellProps) {
    return (
        <label htmlFor={htmlFor} className="block">
            <span className="mb-1.5 block text-sm font-semibold text-primary">
                {label}
            </span>
            {children}
            {error ? (
                <span className="mt-1.5 block text-xs text-red-600">{error}</span>
            ) : hint ? (
                <span className="mt-1.5 block text-xs text-primary/50">{hint}</span>
            ) : null}
        </label>
    );
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    hint?: string;
    error?: string;
};

export function AdminInput({
    label,
    hint,
    error,
    className,
    id,
    ...props
}: InputProps) {
    return (
        <FieldShell label={label} hint={hint} error={error} htmlFor={id}>
            <input
                id={id}
                className={cn(controlClass, error && "border-red-400", className)}
                {...props}
            />
        </FieldShell>
    );
}

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label: string;
    hint?: string;
    error?: string;
};

export function AdminTextarea({
    label,
    hint,
    error,
    className,
    id,
    ...props
}: TextareaProps) {
    return (
        <FieldShell label={label} hint={hint} error={error} htmlFor={id}>
            <textarea
                id={id}
                className={cn(
                    controlClass,
                    "min-h-[7rem] resize-y",
                    error && "border-red-400",
                    className,
                )}
                {...props}
            />
        </FieldShell>
    );
}

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
    label: string;
    hint?: string;
    error?: string;
    options: ReadonlyArray<{ value: string; label: string }>;
};

export function AdminSelect({
    label,
    hint,
    error,
    options,
    className,
    id,
    ...props
}: SelectProps) {
    return (
        <FieldShell label={label} hint={hint} error={error} htmlFor={id}>
            <select
                id={id}
                className={cn(controlClass, error && "border-red-400", className)}
                {...props}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </FieldShell>
    );
}

export { controlClass };
