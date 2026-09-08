"use client";

import Image from "next/image";
import { useTranslations } from "@/app/lib/i18n";
import {
    getOperatingHoursTableRows,
    getWeekdayInTimezone,
    type Weekday,
} from "@/app/lib/operating-hours";
import { cn } from "@/app/lib/utils";

export default function ContactOperatingHours() {
    const { t } = useTranslations("operatingHours");
    const rows = getOperatingHoursTableRows();
    const today = getWeekdayInTimezone();

    return (
        <section
            id="operating-hours"
            aria-labelledby="operating-hours-heading"
            className="bg-cream/40"
        >
            <div className="section-container">
                <header className="mx-auto max-w-3xl text-center">
                    <p className="flex items-center justify-center gap-2">
                        <Image
                            src="/icons/singleLeaf.svg"
                            alt=""
                            width={14}
                            height={21}
                            unoptimized
                            style={{ width: "auto", height: "auto" }}
                            className="h-5 w-auto shrink-0"
                            aria-hidden
                        />
                        <span className="font-script text-[28px] leading-none text-secondary sm:text-[32px]">
                            {t("today")}
                        </span>
                    </p>
                    <h2
                        id="operating-hours-heading"
                        className="mt-4 text-[28px] leading-[1.15] font-bold tracking-[-2%] text-primary sm:text-4xl"
                    >
                        {t("title")}
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-primary/65 sm:text-base">
                        {t("description")}
                    </p>
                </header>

                <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-[1.5rem] border border-primary/10 bg-white shadow-[0_12px_40px_rgba(10,37,14,0.08)] sm:mt-12">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm sm:text-[15px]">
                            <caption className="sr-only">{t("title")}</caption>
                            <thead>
                                <tr className="bg-section text-white">
                                    <th
                                        scope="col"
                                        className="px-4 py-3.5 text-start font-semibold sm:px-6"
                                    >
                                        {t("day")}
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-4 py-3.5 text-start font-semibold sm:px-6"
                                    >
                                        {t("morning")}
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-4 py-3.5 text-start font-semibold sm:px-6"
                                    >
                                        {t("evening")}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row) => {
                                    const isToday = row.day === today;
                                    const dayLabel = t(
                                        `days.${row.day}` as `days.${Weekday}`,
                                    );

                                    return (
                                        <tr
                                            key={row.day}
                                            className={cn(
                                                "border-t border-primary/8",
                                                isToday
                                                    ? "bg-secondary/15"
                                                    : "bg-white even:bg-cream/30",
                                            )}
                                        >
                                            <th
                                                scope="row"
                                                className={cn(
                                                    "px-4 py-3.5 text-start font-semibold text-primary sm:px-6",
                                                    isToday && "text-section",
                                                )}
                                            >
                                                <span className="inline-flex flex-wrap items-center gap-2">
                                                    {dayLabel}
                                                    {isToday && (
                                                        <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase">
                                                            {t("today")}
                                                        </span>
                                                    )}
                                                </span>
                                            </th>
                                            <td
                                                className="px-4 py-3.5 text-primary/75 sm:px-6"
                                                dir="ltr"
                                            >
                                                {row.closed
                                                    ? t("closed")
                                                    : row.morning}
                                            </td>
                                            <td
                                                className="px-4 py-3.5 text-primary/75 sm:px-6"
                                                dir="ltr"
                                            >
                                                {row.closed
                                                    ? t("closed")
                                                    : row.evening}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}
