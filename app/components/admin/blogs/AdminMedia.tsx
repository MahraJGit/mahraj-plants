import Image from "next/image";

export function isPublicImage(src: string): boolean {
    return src.startsWith("/") && !src.startsWith("//");
}

export default function AdminMedia({
    src,
    alt,
}: {
    src: string;
    alt: string;
}) {
    if (!src) return null;

    if (isPublicImage(src)) {
        return (
            <Image src={src} alt={alt} fill sizes="420px" className="object-cover" />
        );
    }

    return (
        // Local file previews are data URLs and cannot use next/image.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="absolute inset-0 size-full object-cover" />
    );
}

export function readImageFiles(files: FileList | File[]): Promise<string[]> {
    const list = Array.from(files).filter((file) => file.type.startsWith("image/"));

    return Promise.all(
        list.map(
            (file) =>
                new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(String(reader.result ?? ""));
                    reader.onerror = () => reject(reader.error);
                    reader.readAsDataURL(file);
                }),
        ),
    );
}
