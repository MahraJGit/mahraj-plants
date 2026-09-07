"use client";

import Image from "next/image";
import { useState } from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaShareAlt,
    FaTwitter,
} from "react-icons/fa";
import { HiPlus } from "react-icons/hi";
import { FACEBOOK_HREF, INSTAGRAM_HREF } from "@/app/lib/contact";
import { cn } from "@/app/lib/utils";

export type TeamMember = {
    name: string;
    role: string;
    image: string;
    icon: string;
};

const socialLinks = [
    { label: "Facebook", href: FACEBOOK_HREF, Icon: FaFacebookF, external: true },
    { label: "Instagram", href: INSTAGRAM_HREF, Icon: FaInstagram, external: true },
    { label: "Twitter", href: "#", Icon: FaTwitter, external: false },
    { label: "LinkedIn", href: "#", Icon: FaLinkedinIn, external: false },
] as const;

type TeamMemberCardProps = {
    member: TeamMember;
};

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
    const [shareOpen, setShareOpen] = useState(false);

    return (
        <article
            className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white p-3 shadow-[0_16px_40px_rgba(0,0,0,0.18)] sm:rounded-[2rem] sm:p-3.5"
            onMouseLeave={() => setShareOpen(false)}
        >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem] sm:rounded-[1.5rem]">
                <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 80vw, (max-width: 1280px) 40vw, 280px"
                    draggable={false}
                    className="pointer-events-none object-cover transition-[filter,transform] duration-500 ease-out group-hover:scale-105 group-hover:blur-[2px] motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-hover:blur-none"
                />

                <div
                    aria-hidden
                    className="absolute inset-0 bg-primary/0 transition-colors duration-500 group-hover:bg-primary/25 motion-reduce:transition-none"
                />

                <button
                    type="button"
                    aria-label={`View more about ${member.name}`}
                    className={cn(
                        "absolute top-1/2 left-1/2 z-20 flex size-12 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/40 bg-white/20 text-white backdrop-blur-md transition-all duration-500 sm:size-14",
                        "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100",
                        "motion-reduce:transition-none",
                    )}
                >
                    <HiPlus aria-hidden className="size-6 sm:size-7" />
                </button>

                <div
                    className={cn(
                        "absolute top-5 right-3 z-30 flex flex-col items-center gap-2.5 transition-all duration-500 ease-out sm:right-4",
                        shareOpen
                            ? "translate-y-0 opacity-100"
                            : "pointer-events-none translate-y-3 opacity-0 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100",
                        "motion-reduce:transition-none",
                    )}
                >
                    {socialLinks.map(({ label, href, Icon, external }) => (
                        <a
                            key={label}
                            href={href}
                            aria-label={`${member.name} on ${label}`}
                            {...(external
                                ? {
                                      target: "_blank",
                                      rel: "noopener noreferrer",
                                  }
                                : {})}
                            className="flex size-9 cursor-pointer items-center justify-center rounded-full bg-white text-primary shadow-sm transition hover:bg-cream sm:size-10"
                        >
                            <Icon aria-hidden className="size-3.5 sm:size-4" />
                        </a>
                    ))}
                </div>

                <button
                    type="button"
                    aria-label={`Share ${member.name}'s profile`}
                    aria-expanded={shareOpen}
                    onClick={() => setShareOpen((open) => !open)}
                    className="absolute right-3 bottom-3 z-20 flex size-9 cursor-pointer items-center justify-center rounded-full bg-secondary text-white shadow-md transition hover:bg-secondary/90 sm:right-4 sm:bottom-4 sm:size-10"
                >
                    <FaShareAlt aria-hidden className="size-3.5 sm:size-4" />
                </button>
            </div>

            <div className="relative flex flex-1 items-end justify-between gap-3 px-2 pt-4 pb-2 sm:px-3 sm:pt-5 sm:pb-3">
                <div className="min-w-0">
                    <h3 className="truncate text-lg font-bold text-primary sm:text-xl">
                        {member.name}
                    </h3>
                    <p className="mt-1 text-sm italic text-primary/60 sm:text-[15px]">
                        {member.role}
                    </p>
                </div>

                <Image
                    src={member.icon}
                    alt=""
                    width={40}
                    height={40}
                    unoptimized
                    draggable={false}
                    style={{ width: "auto" }}
                    className="h-9 w-auto shrink-0 sm:h-10"
                    aria-hidden
                />
            </div>
        </article>
    );
}
