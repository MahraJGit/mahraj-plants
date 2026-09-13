import { BLOG_MONTHS } from "./schema";

export function datePartsFromIso(iso: string) {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) {
        return { day: "01", month: "JAN", year: new Date().getFullYear() };
    }

    return {
        day: String(date.getDate()).padStart(2, "0"),
        month: BLOG_MONTHS[date.getMonth()],
        year: date.getFullYear(),
    };
}

export function toDateTimeLocal(iso: string): string {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return "";

    const pad = (value: number) => String(value).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function fromDateTimeLocal(value: string): string {
    const date = new Date(value);
    return Number.isNaN(date.getTime())
        ? new Date().toISOString()
        : date.toISOString();
}

export function formatAdminDateTime(iso: string): string {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return "—";

    return new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);
}
