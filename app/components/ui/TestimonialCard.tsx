import { cn } from "@/app/lib/utils";

export type Testimonial = {
    quote: string;
    name: string;
    role: string;
    initials: string;
};

type TestimonialCardProps = {
    testimonial: Testimonial;
    className?: string;
};

function StarRating() {
    return (
        <div className="flex gap-0.5" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }).map((_, index) => (
                <span key={index} className="text-[#C4A862]">
                    ★
                </span>
            ))}
        </div>
    );
}

export default function TestimonialCard({
    testimonial,
    className,
}: TestimonialCardProps) {
    return (
        <article
            data-slide
            className={cn(
                "flex h-full min-h-[16rem] w-full shrink-0 flex-col rounded-2xl border border-primary/10 bg-cream/50 px-6 py-7 shadow-[0_8px_30px_rgba(10,37,14,0.06)] sm:min-h-[17rem] sm:px-7 sm:py-8",
                className,
            )}
        >
            <StarRating />

            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-primary/75 sm:text-[15px]">
                &ldquo;{testimonial.quote}&rdquo;
            </blockquote>

            <div className="mt-6 flex items-center gap-3 border-t border-dotted border-primary/15 pt-5">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-sm font-semibold text-primary">
                    {testimonial.initials}
                </div>
                <div>
                    <p className="text-sm font-semibold text-primary">
                        {testimonial.name}
                    </p>
                    <p className="text-xs text-primary/60 sm:text-sm">
                        {testimonial.role}
                    </p>
                </div>
            </div>
        </article>
    );
}
