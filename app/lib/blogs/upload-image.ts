"use client";

import { createBrowserSupabase } from "@/app/lib/supabase/browser";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const DATA_URL = /data:image\/[a-zA-Z0-9.+-]+;base64,[a-zA-Z0-9+/=]+/g;

export function assertBlogImageFile(file: File) {
    if (!file.type.startsWith("image/")) {
        throw new Error("Choose an image file.");
    }
    if (file.size > MAX_IMAGE_BYTES) {
        throw new Error("Use an image smaller than 5 MB.");
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
