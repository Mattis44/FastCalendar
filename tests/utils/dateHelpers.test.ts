import { enUS, fr, de, es, ja, zhCN, it as itLocale } from "date-fns/locale";
import { expandEvents, getDateFnsLocale } from "../../src/utils/dateHelpers";
import { format } from "date-fns";
import { CalendarEvent } from "../../src/types/date";

describe("expandEvents", () => {
    it("should return an empty map for empty events", () => {
        const result = expandEvents([]);
        expect(result).toEqual({});
    });

    it("should correctly expand a single-day event", () => {
        const events = [
            {
                id: "1",
                title: "Meeting",
                icon: "📅",
                start: new Date("2025-06-24T10:00:00"),
                color: "#000000",
            },
        ];

        const result = expandEvents(events);
        const key = format(new Date("2025-06-24"), "yyyy-MM-dd");

        expect(result[key]).toHaveLength(1);
        expect(result[key][0].id).toBe("1");
    });

    it("should expand a multi-day event to each covered day", () => {
        const events = [
            {
                id: "2",
                title: "Conference",
                icon: "🎤",
                start: new Date("2025-06-24T09:00:00"),
                end: new Date("2025-06-26T17:00:00"),
                color: "#FF0000",
            },
        ];

        const result = expandEvents(events);
        const keys = [
            format(new Date("2025-06-24"), "yyyy-MM-dd"),
            format(new Date("2025-06-25"), "yyyy-MM-dd"),
            format(new Date("2025-06-26"), "yyyy-MM-dd"),
        ];

        keys.forEach((key) => {
            expect(result[key]).toBeDefined();
            expect(result[key][0].id).toBe("2");
        });
    });

    it("should add multiple events to the same day", () => {
        const events = [
            {
                id: "3",
                title: "Event A",
                icon: "A",
                start: new Date("2025-06-24T08:00:00"),
                end: new Date("2025-06-24T10:00:00"),
                color: "#111111",
            },
            {
                id: "4",
                title: "Event B",
                icon: "B",
                start: new Date("2025-06-24T12:00:00"),
                end: new Date("2025-06-24T14:00:00"),
                color: "#222222",
            },
        ];

        const result = expandEvents(events);
        const key = format(new Date("2025-06-24"), "yyyy-MM-dd");

        expect(result[key]).toHaveLength(2);
        expect(result[key].map((ev: CalendarEvent) => ev.id)).toContain("3");
        expect(result[key].map((ev: CalendarEvent) => ev.id)).toContain("4");
    });
});

describe("getDateFnsLocale", () => {
    it("should return correct locale for known tags", () => {
        expect(getDateFnsLocale("en")).toBe(enUS);
        expect(getDateFnsLocale("en-US")).toBe(enUS);
        expect(getDateFnsLocale("fr")).toBe(fr);
        expect(getDateFnsLocale("fr-FR")).toBe(fr);
        expect(getDateFnsLocale("de")).toBe(de);
        expect(getDateFnsLocale("de-DE")).toBe(de);
        expect(getDateFnsLocale("es")).toBe(es);
        expect(getDateFnsLocale("es-ES")).toBe(es);
        expect(getDateFnsLocale("it")).toBe(itLocale);
        expect(getDateFnsLocale("it-IT")).toBe(itLocale);
        expect(getDateFnsLocale("ja")).toBe(ja);
        expect(getDateFnsLocale("ja-JP")).toBe(ja);
        expect(getDateFnsLocale("zh")).toBe(zhCN);
        expect(getDateFnsLocale("zh-CN")).toBe(zhCN);
    });

    it("should return enUS for unknown tags", () => {
        expect(getDateFnsLocale("unknown")).toBe(enUS);
        expect(getDateFnsLocale("pt-BR")).toBe(enUS);
        expect(getDateFnsLocale("")).toBe(enUS);
    });
});
