"use client";

import { useRef } from "react";
import { HiOutlinePhotograph } from "react-icons/hi";
import { FieldShell, controlClass } from "@/app/components/admin/ui/AdminField";
import AdminMedia, { readImageFiles } from "./AdminMedia";

type FeaturedImageFieldProps = {
    src: string;
    alt: string;
    error?: string;
    altError?: string;
    onChange: (next: { image?: string; alt?: string }) => void;
};

export default function FeaturedImageField({
    src,
    alt,
    error,
    altError,
    onChange,
}: FeaturedImageFieldProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    async function onFileChange(files: FileList | null) {
        if (!files?.length) return;
        const [image] = await readImageFiles(files);
        if (image) onChange({ image });
    }

    return (
        <section className="overflow-hidden rounded-[1.5rem] border border-primary/8 bg-white">
            <div className="flex items-center justify-between px-5 py-4">
                <h2 className="text-sm font-semibold text-primary">Featured image</h2>
                {src ? (
                    <button
                        type="button"
                        onClick={() => onChange({ image: "", alt: "" })}
                        className="cursor-pointer text-xs font-medium text-red-600 hover:underline"
                    >
                        Remove
                    </button>
                ) : null}
            </div>

            <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="relative mx-5 mb-4 block aspect-[16/9] w-[calc(100%-2.5rem)] cursor-pointer overflow-hidden rounded-2xl bg-cream"
            >
                {src ? (
                    <AdminMedia src={src} alt={alt || "Featured image preview"} />
                ) : (
                    <span className="flex h-full flex-col items-center justify-center gap-2 text-primary/45">
                        <HiOutlinePhotograph aria-hidden className="size-8" />
                        <span className="text-sm font-medium">
                            Set featured image
                        </span>
                    </span>
                )}
            </button>

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(event) => {
                    void onFileChange(event.target.files);
                    event.target.value = "";
                }}
            />

            <div className="space-y-3 px-5 pb-5">
                {error ? (
                    <p className="text-xs text-red-600">{error}</p>
                ) : null}
                <FieldShell label="Image alt text" error={altError} htmlFor="featured-alt">
                    <input
                        id="featured-alt"
                        value={alt}
                        onChange={(event) => onChange({ alt: event.target.value })}
                        placeholder="Describe the featured image"
                        className={controlClass}
                    />
                </FieldShell>
            </div>
        </section>
    );
}
