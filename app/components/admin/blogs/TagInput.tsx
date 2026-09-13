"use client";

import { KeyboardEvent, useState } from "react";
import { HiOutlineX } from "react-icons/hi";
import { BLOG_TAGS } from "@/app/lib/admin/schema";
import { FieldShell } from "@/app/components/admin/ui/AdminField";
import { cn } from "@/app/lib/utils";

type TagInputProps = {
    value: string[];
    error?: string;
    onChange: (tags: string[]) => void;
};

export default function TagInput({ value, error, onChange }: TagInputProps) {
    const [draft, setDraft] = useState("");

    function addTag(raw: string) {
        const tag = raw.trim();
        if (!tag || value.some((item) => item.toLowerCase() === tag.toLowerCase())) {
            setDraft("");
            return;
        }
        onChange([...value, tag]);
        setDraft("");
    }

    function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter" || event.key === ",") {
            event.preventDefault();
            addTag(draft);
        }
        if (event.key === "Backspace" && !draft && value.length > 0) {
            onChange(value.slice(0, -1));
        }
    }

    const suggestions = BLOG_TAGS.filter(
        (tag) => !value.some((item) => item.toLowerCase() === tag.toLowerCase()),
    );

    return (
        <FieldShell
            label="Tags"
            error={error}
            hint="Press Enter to add a custom tag."
        >
            <div
                className={cn(
                    "flex min-h-10 flex-wrap items-center gap-1.5 rounded-xl border bg-white px-2.5 py-2",
                    error ? "border-red-400" : "border-primary/12",
                )}
            >
                {value.map((tag) => (
                    <span
                        key={tag}
                        className="inline-flex items-center gap-1 rounded-full bg-cream px-2.5 py-1 text-xs font-medium text-primary"
                    >
                        {tag}
                        <button
                            type="button"
                            aria-label={`Remove ${tag}`}
                            onClick={() =>
                                onChange(value.filter((item) => item !== tag))
                            }
                            className="cursor-pointer text-primary/45 hover:text-red-600"
                        >
                            <HiOutlineX aria-hidden className="size-3.5" />
                        </button>
                    </span>
                ))}
                <input
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    onKeyDown={onKeyDown}
                    onBlur={() => addTag(draft)}
                    placeholder={value.length ? "Add another" : "Add a tag"}
                    className="min-w-[7rem] flex-1 border-0 bg-transparent py-0.5 text-sm text-primary outline-none placeholder:text-primary/35"
                />
            </div>
            {suggestions.length > 0 ? (
                <div className="mt-2 flex flex-wrap gap-1.5">
                    {suggestions.map((tag) => (
                        <button
                            key={tag}
                            type="button"
                            onClick={() => addTag(tag)}
                            className="cursor-pointer rounded-full border border-primary/10 bg-cream/60 px-2.5 py-1 text-xs font-medium text-primary/70 transition hover:border-secondary hover:bg-secondary/10 hover:text-primary"
                        >
                            + {tag}
                        </button>
                    ))}
                </div>
            ) : null}
        </FieldShell>
    );
}
