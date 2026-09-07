"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "@/app/lib/i18n";
import {
    getTodayHours,
    type DayHours,
    type Weekday,
} from "@/app/lib/operating-hours";

function formatDayHours(
    hours: DayHours,
    t: (key: string, values?: Record<string, string | number>) => string,
    dayLabel: string,
) {
    if (hours.closed) {
        return t("todayClosed", { day: dayLabel });
    }

    return t("todayOpen", {
        day: dayLabel,
        morning: hours.morning ?? "",
        evening: hours.evening ?? "",
    });
}

export function useTodayOperatingHoursLabel() {
    const { t, locale } = useTranslations("operatingHours");
    const [label, setLabel] = useState(() => {
        const hours = getTodayHours();
        const dayLabel = t(`daysShort.${hours.day}` as `daysShort.${Weekday}`);
        return formatDayHours(hours, t, dayLabel);
    });

    useEffect(() => {
        function sync() {
            const hours = getTodayHours();
            const dayLabel = t(`daysShort.${hours.day}` as `daysShort.${Weekday}`);
            setLabel(formatDayHours(hours, t, dayLabel));
        }

        sync();

        const id = window.setInterval(sync, 60_000);
        return () => window.clearInterval(id);
    }, [t, locale]);

    return label;
}

export function useTodayHours(): DayHours {
    const [hours, setHours] = useState(() => getTodayHours());

    useEffect(() => {
        function sync() {
            setHours(getTodayHours());
        }

        sync();
        const id = window.setInterval(sync, 60_000);
        return () => window.clearInterval(id);
    }, []);

    return hours;
}
