import { eachDayOfInterval, format, Locale } from "date-fns";
import { CalendarEvent } from "../types/date";
import { enUS, fr, de, es, it, ja, zhCN } from "date-fns/locale";

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
