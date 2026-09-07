"use client";

import Image from "next/image";
import {
    FaFacebookF,
    FaInstagram,
    FaWhatsapp,
} from "react-icons/fa";
import type { BlogArticle } from "@/app/lib/blogs";
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
    const body = messages.detail.body;
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

            <div className="mt-8 space-y-5 text-sm leading-relaxed text-primary/70 sm:mt-10 sm:text-[15px]">
                <p>{localized.excerpt}</p>
                <p>{body.introParagraph}</p>
            </div>

            <h2 className="mt-10 text-[22px] leading-tight font-bold tracking-[-1%] text-primary sm:text-[26px]">
                {body.sectionHeading}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-primary/70 sm:text-[15px]">
                {body.sectionBody}
            </p>

            <blockquote className="relative mt-8 overflow-hidden rounded-2xl bg-section px-6 py-7 text-white sm:rounded-[1.75rem] sm:px-8 sm:py-8">
                <span
                    aria-hidden
                    className="pointer-events-none absolute top-4 left-5 font-serif text-6xl leading-none text-secondary/40 sm:text-7xl"
                >
                    “
                </span>
                <p className="relative z-10 max-w-2xl pl-2 text-sm leading-relaxed text-white/95 sm:pl-4 sm:text-base">
                    {body.quote}
                </p>
                <footer className="relative z-10 mt-5 pl-2 text-sm font-medium text-secondary sm:pl-4">
                    {body.quoteAuthor}
                </footer>
            </blockquote>

            <h3 className="mt-10 text-lg font-bold text-primary sm:text-xl">
                {body.includedHeading}
            </h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {body.includedItems.map((item) => (
                    <li key={item}>
                        <span className="flex min-h-[3rem] items-center justify-center rounded-full bg-cream/80 px-4 py-2.5 text-center text-sm font-medium text-primary">
                            {item}
                        </span>
                    </li>
                ))}
            </ul>

            <h3 className="mt-10 text-lg font-bold text-primary sm:text-xl">
                {body.whyHeading}
            </h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-primary/70 sm:text-[15px]">
                {body.whyItems.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>

            <h3 className="mt-10 text-lg font-bold text-primary sm:text-xl">
                {body.planningHeading}
            </h3>
            <div className="mt-4 gap-6 lg:flex lg:items-start">
                <div className="space-y-4 text-sm leading-relaxed text-primary/70 sm:text-[15px] lg:min-w-0 lg:flex-1">
                    {body.planningParagraphs.map((paragraph) => (
                        <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                    ))}
                    <ol className="list-decimal space-y-2 pl-5">
                        {body.planningSteps.map((step) => (
                            <li key={step}>{step}</li>
                        ))}
                    </ol>
                </div>
                <div className="relative mt-6 aspect-[3/4] w-full overflow-hidden rounded-2xl lg:mt-0 lg:w-56 xl:w-64">
                    <Image
                        src="/images/home/m-outdoor.webp"
                        alt={body.planningImageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 256px"
                        className="object-cover"
                    />
                </div>
            </div>

            <h3 className="mt-10 text-lg font-bold text-primary sm:text-xl">
                {body.maintenanceHeading}
            </h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-primary/70 sm:text-[15px]">
                {body.maintenanceTips.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>

            <h3 className="mt-10 text-lg font-bold text-primary sm:text-xl">
                {body.galleryHeading}
            </h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image
                        src="/images/home/m-landscaping.webp"
                        alt={body.galleryAlts[0]}
                        fill
                        sizes="(max-width: 640px) 100vw, 35vw"
                        className="object-cover"
                    />
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image
                        src="/images/home/hero-bg-3.jpg"
                        alt={body.galleryAlts[1]}
                        fill
                        sizes="(max-width: 640px) 100vw, 35vw"
                        className="object-cover"
                    />
                </div>
            </div>

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
