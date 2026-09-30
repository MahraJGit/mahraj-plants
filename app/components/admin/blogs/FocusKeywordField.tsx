"use client";

import type { AdminBlog } from "@/app/lib/admin/schema";
import {
    analyzeFocusKeyword,
    focusKeywordScore,
} from "@/app/lib/admin/seo-focus";
import { AdminInput } from "@/app/components/admin/ui/AdminField";
import { cn } from "@/app/lib/utils";

type FocusKeywordFieldProps = {
    blog: AdminBlog;
    error?: string;
    onChange: (focusKeyword: string) => void;
};

const toneStyles = {
    empty: "border-primary/8 bg-cream/40 text-primary/60",
    poor: "border-red-200 bg-red-50 text-red-700",
    ok: "border-amber-200 bg-amber-50 text-amber-800",
    good: "border-emerald-200 bg-emerald-50 text-emerald-800",
} as const;

const toneLabels = {
    empty: "Add a focus keyword to guide SEO",
    poor: "Needs work",
    ok: "Getting there",
    good: "Looking strong",
} as const;

export default function FocusKeywordField({
    blog,
    error,
    onChange,
}: FocusKeywordFieldProps) {
    const checks = analyzeFocusKeyword(blog);
    const score = focusKeywordScore(checks);

    return (
        <div className="space-y-4">
            <AdminInput
                id="blog-focus-keyword"
                label="Focus keyword"
                maxLength={100}
                value={blog.focusKeyword}
                error={error}
                hint={`${blog.focusKeyword.length}/100 characters. The main phrase you want this post to rank for in search.`}
                placeholder="e.g. lawn care tips Dubai"
                onChange={(event) => onChange(event.target.value)}
            />

            <div
                className={cn(
                    "rounded-xl border px-4 py-3",
                    toneStyles[score.tone],
                )}
            >
                <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold">SEO focus checklist</p>
                    <p className="text-xs font-medium">
                        {score.tone === "empty"
                            ? toneLabels.empty
                            : `${toneLabels[score.tone]} · ${score.passed}/${score.total}`}
                    </p>
                </div>
                <ul className="mt-3 space-y-2">
                    {checks.map((check) => (
                        <li
                            key={check.id}
                            className="flex items-start gap-2 text-xs leading-5"
                        >
                            <span
                                aria-hidden
                                className={cn(
                                    "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                                    check.passed
                                        ? "bg-emerald-500 text-white"
                                        : "bg-primary/10 text-primary/40",
                                )}
                            >
                                {check.passed ? "✓" : "–"}
                            </span>
                            <span
                                className={
                                    check.passed
                                        ? "text-inherit"
                                        : "text-primary/55"
                                }
                            >
                                {check.label}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
