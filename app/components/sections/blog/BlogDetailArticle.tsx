"use client";

import Image from "next/image";
import {
    FaFacebookF,
    FaInstagram,
    FaWhatsapp,
} from "react-icons/fa";
import type { BlogArticle } from "@/app/lib/blogs/types";
import {
    getBlogsMessages,
    localizeBlog,
    useLocale,
} from "@/app/lib/i18n";
import {
    FACEBOOK_HREF,
    INSTAGRAM_HREF,
    getWhatsAppHref,
} from "@/app/lib/contact";

const shareLinks = [
    { label: "Facebook", href: FACEBOOK_HREF, Icon: FaFacebookF },
    { label: "Instagram", href: INSTAGRAM_HREF, Icon: FaInstagram },
] as const;

type BlogDetailArticleProps = {
    article: BlogArticle;
};

export default function BlogDetailArticle({ article }: BlogDetailArticleProps) {
    const { locale } = useLocale();
    const messages = getBlogsMessages(locale);
    const localized = localizeBlog(article, locale);
    const whatsappShare = getWhatsAppHref(
        messages.detail.whatsappShare.replace("{title}", localized.title),
    );

    return (
        <article className="min-w-0">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem]">
                <Image
                    src={localized.image}
                    alt={localized.alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 70vw"
                    className="object-cover"
                />
            </div>

            <div
                className="blog-article-body mt-8 sm:mt-10"
                dangerouslySetInnerHTML={{ __html: localized.content }}
            />

            <footer className="mt-10 flex flex-col gap-5 border-t border-dashed border-primary/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-primary">
                        {messages.detail.tagsLabel}
                    </span>
                    {localized.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-cream px-3.5 py-1.5 text-xs font-medium text-primary/75"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-primary">
                        {messages.detail.shareLabel}
                    </span>
                    <ul className="flex items-center gap-2">
                        {shareLinks.map(({ label, href, Icon }) => (
                            <li key={label}>
                                <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={messages.detail.shareOn.replace(
                                        "{label}",
                                        label,
                                    )}
                                    className="flex size-9 items-center justify-center rounded-full bg-section text-white transition hover:bg-secondary"
                                >
                                    <Icon aria-hidden className="size-3.5" />
                                </a>
                            </li>
                        ))}
                        <li>
                            <a
                                href={whatsappShare}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={messages.detail.shareWhatsApp}
                                className="flex size-9 items-center justify-center rounded-full bg-whatsapp text-white transition hover:opacity-90"
                            >
                                <FaWhatsapp aria-hidden className="size-4" />
                            </a>
                        </li>
                    </ul>
                </div>
            </footer>
        </article>
    );
}
