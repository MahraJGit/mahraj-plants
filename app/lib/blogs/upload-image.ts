"use client";

import { createBrowserSupabase } from "@/app/lib/supabase/browser";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const MAX_FEATURED_SOURCE_BYTES = 12 * 1024 * 1024;
const DATA_URL = /data:image\/[a-zA-Z0-9.+-]+;base64,[a-zA-Z0-9+/=]+/g;

export const FEATURED_IMAGE_WIDTH = 1920;
export const FEATURED_IMAGE_HEIGHT = 1080;

export function assertBlogImageFile(
    file: File,
    maxBytes = MAX_IMAGE_BYTES,
) {
    if (!file.type.startsWith("image/")) {
        throw new Error("Choose an image file.");
    }
    if (file.size > maxBytes) {
        throw new Error(
            `Use an image smaller than ${Math.round(maxBytes / (1024 * 1024))} MB.`,
        );
    }
}

export async function prepareFeaturedBlogImage(file: File): Promise<File> {
    assertBlogImageFile(file, MAX_FEATURED_SOURCE_BYTES);

    const bitmap = await createImageBitmap(file);
    try {
        if (
            bitmap.width < FEATURED_IMAGE_WIDTH ||
            bitmap.height < FEATURED_IMAGE_HEIGHT
        ) {
            throw new Error(
                `Featured image must be at least ${FEATURED_IMAGE_WIDTH}×${FEATURED_IMAGE_HEIGHT} pixels.`,
            );
        }

        const targetRatio = FEATURED_IMAGE_WIDTH / FEATURED_IMAGE_HEIGHT;
        const sourceRatio = bitmap.width / bitmap.height;
        let sx = 0;
        let sy = 0;
        let sw = bitmap.width;
        let sh = bitmap.height;

        if (sourceRatio > targetRatio) {
            sw = Math.round(bitmap.height * targetRatio);
            sx = Math.round((bitmap.width - sw) / 2);
        } else if (sourceRatio < targetRatio) {
            sh = Math.round(bitmap.width / targetRatio);
            sy = Math.round((bitmap.height - sh) / 2);
        }

        const canvas = document.createElement("canvas");
        canvas.width = FEATURED_IMAGE_WIDTH;
        canvas.height = FEATURED_IMAGE_HEIGHT;
        const context = canvas.getContext("2d");
        if (!context) {
            throw new Error("The image could not be processed. Try again.");
        }

        context.drawImage(
            bitmap,
            sx,
            sy,
            sw,
            sh,
            0,
            0,
            FEATURED_IMAGE_WIDTH,
            FEATURED_IMAGE_HEIGHT,
        );

        const blob = await new Promise<Blob>((resolve, reject) => {
            canvas.toBlob(
                (next) =>
                    next
                        ? resolve(next)
                        : reject(
                              new Error(
                                  "The image could not be processed. Try again.",
                              ),
                          ),
                "image/webp",
                0.88,
            );
        });

        return new File([blob], "featured-1920x1080.webp", {
            type: "image/webp",
        });
    } finally {
        bitmap.close();
    }
}

export async function uploadBlogImage(file: File): Promise<string> {
    assertBlogImageFile(file);
    const supabase = createBrowserSupabase();
    const extension = extensionFor(file.type, file.name);
    const path = `${crypto.randomUUID()}.${extension}`;
    const { error } = await supabase.storage.from("blog-images").upload(path, file, {
        contentType: file.type,
        upsert: false,
    });

    if (error) {
        throw new Error("The image could not be uploaded. Try again.");
    }

    const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
    return data.publicUrl;
}

export async function uploadFeaturedBlogImage(file: File): Promise<string> {
    const prepared = await prepareFeaturedBlogImage(file);
    return uploadBlogImage(prepared);
}

export async function replaceEmbeddedImages<T extends { image: string; content: string }>(
    blog: T,
): Promise<T> {
    const cache = new Map<string, Promise<string>>();
    const uploadOnce = (dataUrl: string) => {
        const pending = cache.get(dataUrl) ?? uploadDataUrl(dataUrl);
        cache.set(dataUrl, pending);
        return pending;
    };

    let image = blog.image;
    if (image.startsWith("data:image/")) {
        image = await uploadOnce(image);
    }

    const matches = blog.content.match(DATA_URL) ?? [];
    let content = blog.content;
    for (const dataUrl of matches) {
        const url = await uploadOnce(dataUrl);
        content = content.split(dataUrl).join(url);
    }

    return { ...blog, image, content };
}

async function uploadDataUrl(dataUrl: string): Promise<string> {
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    const extension = extensionFor(blob.type, "image");
    const file = new File([blob], `image.${extension}`, {
        type: blob.type || "image/jpeg",
    });
    return uploadBlogImage(file);
}

function extensionFor(type: string, name: string): string {
    if (type === "image/jpeg") return "jpg";
    if (type === "image/png") return "png";
    if (type === "image/webp") return "webp";
    if (type === "image/gif") return "gif";
    if (type === "image/avif") return "avif";
    const fromName = name.split(".").pop()?.toLowerCase();
    return fromName && /^[a-z0-9]+$/.test(fromName) ? fromName : "jpg";
}
