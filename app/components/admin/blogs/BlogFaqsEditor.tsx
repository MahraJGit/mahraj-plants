"use client";

import { useState } from "react";
import type { BlogFaq } from "@/app/lib/blogs/faqs";
import {
    MAX_ANSWER,
    MAX_FAQS,
    MAX_QUESTION,
    createEmptyFaq,
} from "@/app/lib/blogs/faqs";
import { AdminInput, AdminTextarea } from "@/app/components/admin/ui/AdminField";
import AdminButton from "@/app/components/admin/ui/AdminButton";
import { cn } from "@/app/lib/utils";

type BlogFaqsEditorProps = {
    faqs: BlogFaq[];
    errors: Record<string, string>;
    onChange: (faqs: BlogFaq[]) => void;
};

export default function BlogFaqsEditor({
    faqs,
    errors,
    onChange,
}: BlogFaqsEditorProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(
        faqs.length > 0 ? 0 : null,
    );

    function updateFaq(index: number, patch: Partial<BlogFaq>) {
        onChange(
            faqs.map((faq, faqIndex) =>
                faqIndex === index ? { ...faq, ...patch } : faq,
            ),
        );
    }

    function addFaq() {
        if (faqs.length >= MAX_FAQS) return;
        const nextIndex = faqs.length;
        onChange([...faqs, createEmptyFaq()]);
        setOpenIndex(nextIndex);
    }

    function removeFaq(index: number) {
        onChange(faqs.filter((_, faqIndex) => faqIndex !== index));
        setOpenIndex((current) => {
            if (current === null) return null;
            if (current === index) return null;
            if (current > index) return current - 1;
            return current;
        });
    }

    function moveFaq(index: number, direction: -1 | 1) {
        const nextIndex = index + direction;
        if (nextIndex < 0 || nextIndex >= faqs.length) return;
        const next = [...faqs];
        const [item] = next.splice(index, 1);
        next.splice(nextIndex, 0, item);
        onChange(next);
        setOpenIndex((current) => {
            if (current === index) return nextIndex;
            if (current === nextIndex) return index;
            return current;
        });
    }

    function toggleFaq(index: number) {
        setOpenIndex((current) => (current === index ? null : index));
    }

    return (
        <section className="rounded-[1.5rem] border border-primary/8 bg-white">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-primary/6 px-5 py-4 sm:px-6">
                <div>
                    <h2 className="text-sm font-semibold text-primary">FAQs</h2>
                    <p className="mt-1 text-xs text-primary/50">
                        Optional. Add common questions to help readers and unlock
                        FAQ rich results in Google.
                    </p>
                </div>
                <AdminButton
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={faqs.length >= MAX_FAQS}
                    onClick={addFaq}
                >
                    Add FAQ
                </AdminButton>
            </div>

            <div className="space-y-3 px-5 py-5 sm:px-6">
                {errors.faqs ? (
                    <p className="text-xs text-red-600">{errors.faqs}</p>
                ) : null}

                {faqs.length === 0 ? (
                    <p className="rounded-xl border border-dashed border-primary/12 bg-cream/40 px-4 py-6 text-center text-sm text-primary/55">
                        No FAQs yet. Add a few clear questions and answers related
                        to this article.
                    </p>
                ) : (
                    faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        const questionError = errors[`faqs.${index}.question`];
                        const answerError = errors[`faqs.${index}.answer`];
                        const hasError = Boolean(questionError || answerError);
                        const summary =
                            faq.question.trim() || "Untitled question";

                        return (
                            <article
                                key={`faq-${index}`}
                                className={cn(
                                    "overflow-hidden rounded-2xl border bg-cream/30",
                                    hasError
                                        ? "border-red-300"
                                        : "border-primary/10",
                                )}
                            >
                                <div className="flex items-stretch gap-1">
                                    <button
                                        type="button"
                                        aria-expanded={isOpen}
                                        onClick={() => toggleFaq(index)}
                                        className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 px-4 py-3.5 text-left transition hover:bg-white/60 sm:px-5"
                                    >
                                        <span
                                            aria-hidden
                                            className={cn(
                                                "flex size-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-primary/55 ring-1 ring-primary/10 transition",
                                                isOpen && "rotate-90",
                                            )}
                                        >
                                            ›
                                        </span>
                                        <span className="min-w-0">
                                            <span className="block text-[11px] font-semibold tracking-wide text-primary/45 uppercase">
                                                FAQ {index + 1}
                                            </span>
                                            <span className="mt-0.5 block truncate text-sm font-medium text-primary">
                                                {summary}
                                            </span>
                                        </span>
                                    </button>

                                    <div className="flex shrink-0 items-center gap-1 pr-3 sm:pr-4">
                                        <button
                                            type="button"
                                            onClick={() => moveFaq(index, -1)}
                                            disabled={index === 0}
                                            className="cursor-pointer rounded-lg px-2 py-1 text-xs font-medium text-primary/60 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                                        >
                                            Up
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => moveFaq(index, 1)}
                                            disabled={index === faqs.length - 1}
                                            className="cursor-pointer rounded-lg px-2 py-1 text-xs font-medium text-primary/60 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                                        >
                                            Down
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => removeFaq(index)}
                                            className="cursor-pointer rounded-lg px-2 py-1 text-xs font-medium text-red-600 hover:bg-white"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>

                                {isOpen ? (
                                    <div className="space-y-3 border-t border-primary/8 bg-white/70 px-4 py-4 sm:px-5">
                                        <AdminInput
                                            id={`blog-faq-question-${index}`}
                                            label="Question"
                                            maxLength={MAX_QUESTION}
                                            value={faq.question}
                                            error={questionError}
                                            hint={`${faq.question.length}/${MAX_QUESTION}`}
                                            placeholder="What do readers usually ask?"
                                            onChange={(event) =>
                                                updateFaq(index, {
                                                    question: event.target.value,
                                                })
                                            }
                                        />
                                        <AdminTextarea
                                            id={`blog-faq-answer-${index}`}
                                            label="Answer"
                                            rows={3}
                                            maxLength={MAX_ANSWER}
                                            value={faq.answer}
                                            error={answerError}
                                            hint={`${faq.answer.length}/${MAX_ANSWER}`}
                                            placeholder="Write a clear, helpful answer"
                                            onChange={(event) =>
                                                updateFaq(index, {
                                                    answer: event.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                ) : null}
                            </article>
                        );
                    })
                )}
            </div>
        </section>
    );
}
