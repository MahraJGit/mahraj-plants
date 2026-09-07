"use client";

import { FormEvent, useState } from "react";
import { getBlogsMessages, useLocale } from "@/app/lib/i18n";
import { cn } from "@/app/lib/utils";

const inputClassName =
    "w-full rounded-xl border border-primary/12 bg-white px-4 py-3.5 text-sm text-primary outline-none transition placeholder:text-primary/40 focus:border-secondary focus:ring-2 focus:ring-secondary/20 sm:px-5";

export default function BlogCommentForm() {
    const { locale } = useLocale();
    const messages = getBlogsMessages(locale);
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
        saveInfo: false,
    });

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setForm({
            name: "",
            email: "",
            message: "",
            saveInfo: false,
        });
    }

    return (
        <section
            aria-labelledby="blog-comment-heading"
            className="mt-12 rounded-[1.75rem] bg-white p-6 shadow-[0_12px_40px_rgba(10,37,14,0.08)] sm:mt-14 sm:rounded-[2rem] sm:p-8 lg:p-10"
        >
            <h2
                id="blog-comment-heading"
                className="text-[22px] leading-tight font-bold tracking-[-1%] text-primary sm:text-[26px]"
            >
                {messages.comment.heading}
            </h2>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4 sm:mt-8">
                <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                        <span className="sr-only">{messages.comment.name}</span>
                        <input
                            type="text"
                            name="name"
                            required
                            autoComplete="name"
                            placeholder={messages.comment.name}
                            value={form.name}
                            onChange={(event) =>
                                setForm((current) => ({
                                    ...current,
                                    name: event.target.value,
                                }))
                            }
                            className={inputClassName}
                        />
                    </label>
                    <label className="block">
                        <span className="sr-only">{messages.comment.email}</span>
                        <input
                            type="email"
                            name="email"
                            required
                            autoComplete="email"
                            placeholder={messages.comment.email}
                            value={form.email}
                            onChange={(event) =>
                                setForm((current) => ({
                                    ...current,
                                    email: event.target.value,
                                }))
                            }
                            className={inputClassName}
                        />
                    </label>
                </div>

                <label className="block">
                    <span className="sr-only">{messages.comment.message}</span>
                    <textarea
                        name="message"
                        required
                        rows={5}
                        placeholder={messages.comment.message}
                        value={form.message}
                        onChange={(event) =>
                            setForm((current) => ({
                                ...current,
                                message: event.target.value,
                            }))
                        }
                        className={cn(inputClassName, "resize-y")}
                    />
                </label>

                <label className="flex cursor-pointer items-start gap-3 text-sm text-primary/70">
                    <input
                        type="checkbox"
                        checked={form.saveInfo}
                        onChange={(event) =>
                            setForm((current) => ({
                                ...current,
                                saveInfo: event.target.checked,
                            }))
                        }
                        className="mt-1 size-4 rounded border-primary/20 text-secondary focus:ring-secondary/30"
                    />
                    <span>{messages.comment.saveInfo}</span>
                </label>

                <button
                    type="submit"
                    className="inline-flex cursor-pointer items-center justify-center rounded-full bg-secondary px-8 py-3.5 text-sm font-medium text-white transition hover:bg-secondary/90 sm:text-base"
                >
                    {messages.comment.submit}
                </button>
            </form>
        </section>
    );
}
