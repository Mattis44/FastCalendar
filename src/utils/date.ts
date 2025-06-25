import { addDays, format } from "date-fns";
import { CalendarCell, CalendarEvent } from "../types/date";
import { expandEvents, getDateFnsLocale } from "./dateHelpers";

export const generateYears = (
    start: number = 1900,
    end: number = new Date().getFullYear() + 50,
): number[] => {
    const years: number[] = [];
    if (start > end) {
        throw new Error("Start year cannot be greater than end year.");
    }
    for (let year = start; year <= end; year++) {
        years.push(year);
    }
    return years;
};

export const getCalendarGrid = (
    year: number,
    month: number,
    daysEvents: CalendarEvent[] = [],
    locale: string = "en-US",
): CalendarCell[] => {
    const result: CalendarCell[] = [];

    const firstOfMonth = new Date(year, month, 1);
    const startDay = firstOfMonth.getDay();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const totalDays = startDay + daysInMonth;
    const cellCount = totalDays <= 35 ? 35 : 42;

    const gridStart = new Date(year, month, 1 - startDay);
    const expandedMap = expandEvents(daysEvents);

    const dateFnsLocale = getDateFnsLocale(locale);

    for (let i = 0; i < cellCount; i++) {
        const date = addDays(gridStart, i);
        const key = format(date, "yyyy-MM-dd");
        const dayEvents = expandedMap[key] ?? [];

        result.push({
            date,
            day: date.getDate(),
            month: format(date, "LLLL", { locale: dateFnsLocale }),
            isCurrentMonth: date.getMonth() === month,
            events: dayEvents,
        });
    }

    return result;
};

export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
