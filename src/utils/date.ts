import {
    addDays,
    eachDayOfInterval,
    format,
    Locale,
} from "date-fns";
import { CalendarCell, CalendarEvent } from "../types/date";
import { enUS, fr, de, es, it, ja, zhCN } from "date-fns/locale";

export const generateYears = (
    start: number = 1900,
    end: number = new Date().getFullYear() + 50
): number[] => {
    const years: number[] = [];
    for (let year = start; year <= end; year++) {
        years.push(year);
    }
    return years;
};

export const getCalendarGrid = (
    year: number,
    month: number,
    daysEvents: CalendarEvent[] = [],
    locale: string = "en-US"
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

export function expandEvents(events: CalendarEvent[]) {
    const map: Record<string, CalendarEvent[]> = {};

    for (const event of events) {
        const days = eachDayOfInterval({
            start: new Date(event.start),
            end: new Date(event.end || event.start),
        });

        for (const day of days) {
            const key = format(day, "yyyy-MM-dd");
            if (!map[key]) {
                map[key] = [];
            }
            map[key].push(event);
        }
    }

    return map;
}

const localeMap: Record<string, Locale> = {
    en: enUS,
    "en-US": enUS,
    fr: fr,
    "fr-FR": fr,
    de: de,
    "de-DE": de,
    es: es,
    "es-ES": es,
    it: it,
    "it-IT": it,
    ja: ja,
    "ja-JP": ja,
    zh: zhCN,
    "zh-CN": zhCN,
};

export function getDateFnsLocale(tag: string): Locale {
    return localeMap[tag] ?? enUS;
}

export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
