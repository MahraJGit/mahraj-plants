"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import TeamMemberCard, {
    type TeamMember,
} from "@/app/components/ui/TeamMemberCard";
import { cn } from "@/app/lib/utils";

const team: TeamMember[] = [
    {
        name: "Liam Patel",
        role: "Irrigation Specialist",
        image: "/images/about/irrigation-specialist.webp",
        icon: "/icons/irrigation-specialist.svg",
    },
    {
        name: "Amelia Clarke",
        role: "Landscape Architect",
        image: "/images/about/landscape-architect.webp",
        icon: "/icons/landscape-architect.svg",
    },
    {
        name: "Oliver Harris",
        role: "Senior Gardener",
        image: "/images/about/senior-gardener.webp",
        icon: "/icons/senior-gardener.svg",
    },
    {
        name: "Sophie Turner",
        role: "Project Manager",
        image: "/images/about/project-manager.webp",
        icon: "/icons/project-manager.svg",
    },
];

const slides = [...team, ...team];

const CARD_GAP = 24;

export default function AboutTeam() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const dragMoved = useRef(false);
    const pointerStartX = useRef(0);
    const scrollStartLeft = useRef(0);
    const [active, setActive] = useState(0);

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        function onScroll() {
            if (!container) return;
            const card =
                container.querySelector<HTMLElement>("[data-team-card]");
            if (!card) return;

            const cardWidth = card.offsetWidth + CARD_GAP;
            const index = Math.round(container.scrollLeft / cardWidth);
            setActive(
                ((index % team.length) + team.length) % team.length,
            );
        }

        onScroll();
        container.addEventListener("scroll", onScroll, { passive: true });
        return () => container.removeEventListener("scroll", onScroll);
    }, []);

    function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
        if (event.button !== 0) return;
        if ((event.target as HTMLElement).closest("a, button")) return;

        const container = scrollRef.current;
        if (!container) return;

        isDragging.current = true;
        dragMoved.current = false;
        pointerStartX.current = event.clientX;
        scrollStartLeft.current = container.scrollLeft;
        container.setPointerCapture(event.pointerId);
    }

    function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
        if (!isDragging.current || !scrollRef.current) return;

        const delta = event.clientX - pointerStartX.current;
        if (Math.abs(delta) > 6) dragMoved.current = true;

        if (dragMoved.current) {
            scrollRef.current.scrollLeft = scrollStartLeft.current - delta;
        }
    }

    function endDrag(event: React.PointerEvent<HTMLDivElement>) {
        if (!isDragging.current || !scrollRef.current) return;

        isDragging.current = false;
        if (scrollRef.current.hasPointerCapture(event.pointerId)) {
            scrollRef.current.releasePointerCapture(event.pointerId);
        }
    }

    function goTo(index: number) {
        const container = scrollRef.current;
        if (!container) return;

        const card = container.querySelector<HTMLElement>("[data-team-card]");
        if (!card) return;

        container.scrollTo({
            left: index * (card.offsetWidth + CARD_GAP),
            behavior: "smooth",
        });
        setActive(index);
    }

    return (
        <section
            id="team"
            aria-labelledby="team-heading"
            className="bg-white"
        >
            <div className="mx-auto max-w-[80vw] px-4 py-8 sm:px-6 lg:px-8 lg:py-16">
                <div className="relative isolate overflow-hidden rounded-[1.75rem] bg-section py-16 sm:rounded-[2rem] sm:py-20 lg:rounded-[2.5rem] lg:py-24">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[48px_48px]"
                    />

                    <div className="relative z-10 px-4 sm:px-6 lg:px-8">
                        <header className="mx-auto max-w-3xl text-center">
                            <Image
                                src="/icons/singleLeaf.svg"
                                alt=""
                                width={14}
                                height={21}
                                unoptimized
                                className="mx-auto h-5 w-auto"
                                aria-hidden
                            />

                            <p className="mt-4 font-script text-[28px] leading-none text-white sm:text-[32px] lg:text-[36px]">
                                Meet the Landscape Team
                            </p>

                            <h2
                                id="team-heading"
                                className="mt-4 text-[28px] leading-[1.15] font-bold tracking-[-2%] text-white sm:text-4xl lg:text-[42px]"
                            >
                                Working Hard, Growing Together
                            </h2>

                            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
                                Discover the skilled team dedicated to creating
                                beautiful, sustainable outdoor spaces with
                                passion and care.
                            </p>
                        </header>
                    </div>

                    <div className="max-w-7xl mx-auto relative z-10 mt-12 lg:mt-14">
                        <div
                            ref={scrollRef}
                            className={cn(
                                "flex overflow-x-auto px-4 pb-2 sm:px-6 lg:px-8",
                                "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
                                "cursor-grab active:cursor-grabbing select-none touch-pan-y",
                            )}
                            style={{ gap: CARD_GAP }}
                            aria-label="Team members"
                            onPointerDown={handlePointerDown}
                            onPointerMove={handlePointerMove}
                            onPointerUp={endDrag}
                            onPointerCancel={endDrag}
                        >
                            {slides.map((member, index) => (
                                <div
                                    key={`${member.name}-${index}`}
                                    data-team-card
                                    className="w-[min(78vw,280px)] shrink-0 sm:w-[280px] lg:w-[calc((100%-4.5rem)/4)] lg:min-w-[220px]"
                                >
                                    <TeamMemberCard member={member} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative z-10 mt-10 flex items-center justify-center gap-2.5 lg:mt-12">
                        {team.map((member, index) => (
                            <button
                                key={member.name}
                                type="button"
                                aria-label={`Show ${member.name}`}
                                aria-current={active === index}
                                onClick={() => goTo(index)}
                                className={cn(
                                    "size-2.5 cursor-pointer rounded-full transition-all duration-300",
                                    active === index
                                        ? "scale-110 bg-white ring-2 ring-white/40 ring-offset-2 ring-offset-section"
                                        : "bg-white/35 hover:bg-white/55",
                                )}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
