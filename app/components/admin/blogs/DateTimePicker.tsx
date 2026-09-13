"use client";

import { HiOutlineCalendar } from "react-icons/hi";
import { FieldShell, controlClass } from "@/app/components/admin/ui/AdminField";
import {
    formatAdminDateTime,
    fromDateTimeLocal,
    toDateTimeLocal,
} from "@/app/lib/admin/dates";
import { cn } from "@/app/lib/utils";

type DateTimePickerProps = {
    label?: string;
    value: string;
    error?: string;
    onChange: (iso: string) => void;
};

export default function DateTimePicker({
    label = "Publish date & time",
    value,
    error,
    onChange,
}: DateTimePickerProps) {
    return (
        <FieldShell
            label={label}
            error={error}
            hint={formatAdminDateTime(value)}
            htmlFor="blog-published-at"
        >
            <div className="relative">
                <HiOutlineCalendar
                    aria-hidden
                    className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-primary/40"
                />
                <input
                    id="blog-published-at"
                    type="datetime-local"
                    value={toDateTimeLocal(value)}
                    onChange={(event) =>
                        onChange(fromDateTimeLocal(event.target.value))
                    }
                    className={cn(controlClass, "pl-10", error && "border-red-400")}
                />
            </div>
        </FieldShell>
    );
}
