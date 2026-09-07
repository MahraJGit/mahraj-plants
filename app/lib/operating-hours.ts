export const OPERATING_HOURS_TIMEZONE = "Asia/Riyadh";

export const WEEKDAYS = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
] as const;

export type Weekday = (typeof WEEKDAYS)[number];

export type DayHours = {
    day: Weekday;
    morning: string | null;
    evening: string | null;
    closed: boolean;
};

/** Canonical weekly schedule (Riyadh local time). */
export const OPERATING_HOURS: DayHours[] = [
    {
        day: "monday",
        morning: "8:00 AM – 12:00 PM",
        evening: "1:00 PM – 6:00 PM",
        closed: false,
    },
    {
        day: "tuesday",
        morning: "8:00 AM – 12:00 PM",
        evening: "1:00 PM – 6:00 PM",
        closed: false,
    },
    {
        day: "wednesday",
        morning: "8:00 AM – 12:00 PM",
        evening: "1:00 PM – 6:00 PM",
        closed: false,
    },
    {
        day: "thursday",
        morning: "8:00 AM – 12:00 PM",
        evening: "1:00 PM – 6:00 PM",
        closed: false,
    },
    {
        day: "friday",
        morning: null,
        evening: null,
        closed: true,
    },
    {
        day: "saturday",
        morning: "8:00 AM – 12:00 PM",
        evening: "1:00 PM – 6:00 PM",
        closed: false,
    },
    {
        day: "sunday",
        morning: "8:00 AM – 12:00 PM",
        evening: "1:00 PM – 6:00 PM",
        closed: false,
    },
];

export function getWeekdayInTimezone(
    date: Date = new Date(),
    timeZone: string = OPERATING_HOURS_TIMEZONE,
): Weekday {
    const label = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        timeZone,
    })
        .format(date)
        .toLowerCase();

    if ((WEEKDAYS as readonly string[]).includes(label)) {
        return label as Weekday;
    }

    return "monday";
}

export function getHoursForDay(day: Weekday): DayHours {
    return (
        OPERATING_HOURS.find((item) => item.day === day) ?? OPERATING_HOURS[0]
    );
}

export function getTodayHours(
    date: Date = new Date(),
    timeZone: string = OPERATING_HOURS_TIMEZONE,
): DayHours {
    return getHoursForDay(getWeekdayInTimezone(date, timeZone));
}

/** Table order: Monday → Sunday */
export function getOperatingHoursTableRows(): DayHours[] {
    const order: Weekday[] = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
    ];

    return order.map((day) => getHoursForDay(day));
}
