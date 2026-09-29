import Image from "next/image";

type FillImageProps = {
    src: string;
    alt: string;
    sizes?: string;
    className?: string;
    priority?: boolean;
};

export default function FillImage({
    src,
    alt,
    sizes,
    className = "object-cover",
    priority = false,
}: FillImageProps) {
    if (!src) return null;

    if (src.startsWith("data:") || src.startsWith("blob:")) {
        return (
            // Existing drafts can still hold a local preview. next/image cannot load those.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt={alt} className={`absolute inset-0 size-full ${className}`} />
        );
    }

    return (
        <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className={className}
        />
    );
}
