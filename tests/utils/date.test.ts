import { format } from "date-fns";
import { CalendarEvent } from "../../src/types/date";
import { generateYears } from "../../src/utils/date";
import { getCalendarGrid } from "../../src/utils/date";

const mockedYear = 2025;
let testEvents: CalendarEvent[];

beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(`${mockedYear}-06-25T00:00:00Z`));

    testEvents = [
        {
            id: "1",
            title: "Event 1",
            icon: "📅",
            start: new Date(2025, 5, 10),
            color: "red",
        },
        {
            id: "2",
            title: "Event 2",
            icon: "🎉",
            start: new Date(2025, 5, 15),
            color: "blue",
        },
    ];
});

afterAll(() => {
    jest.useRealTimers();
});

describe("generateYears", () => {
    it("should generate years from 1900 to currentYear + 50 by default", () => {
        const expectedEndYear = mockedYear + 50;
        const years = generateYears();
        expect(years[0]).toBe(1900);
        expect(years[years.length - 1]).toBe(expectedEndYear);
        expect(years.length).toBe(expectedEndYear - 1900 + 1);
    });

    it("should generate years from custom start to custom end", () => {
        const years = generateYears(2000, 2005);
        expect(years).toEqual([2000, 2001, 2002, 2003, 2004, 2005]);
    });

    it("should throw if start > end", () => {
        expect(() => generateYears(2025, 2020)).toThrow(
            "Start year cannot be greater than end year.",
        );
    });

    it("should work if start == end", () => {
        const years = generateYears(2022, 2022);
        expect(years).toEqual([2022]);
    });

    it("should handle negative years (e.g. BCE)", () => {
        const years = generateYears(-500, -495);
        expect(years).toEqual([-500, -499, -498, -497, -496, -495]);
    });
});

describe("getCalendarGrid", () => {
    it("should generate a 5-week grid for June 2025", () => {
        const result = getCalendarGrid(2025, 5, testEvents);
        expect(result.length).toBe(35);
    });

    it("should generate a 6-week grid for Mars 2025", () => {
        const result = getCalendarGrid(2025, 2);
        expect(result.length).toBe(42);
    });

    it("should generate a grid with events", () => {
        const result = getCalendarGrid(2025, 5, testEvents);

        // Vérifie que chaque cellule a bien une date
        for (const cell of result) {
            expect(cell.date).toBeInstanceOf(Date);
            expect(typeof cell.day).toBe("number");
        }

        // Vérifie les événements sur les bons jours
        const event10 = result.find(
            (cell) => format(cell.date, "yyyy-MM-dd") === "2025-06-10",
        );
        expect(event10?.events).toHaveLength(1);
        expect(event10?.events[0].title).toBe("Event 1");

        const event15 = result.find(
            (cell) => format(cell.date, "yyyy-MM-dd") === "2025-06-15",
        );
        expect(event15?.events).toHaveLength(1);
        expect(event15?.events[0].title).toBe("Event 2");
    });

    it("should correctly flag isCurrentMonth", () => {
        const grid = getCalendarGrid(2025, 5, testEvents);
        for (const cell of grid) {
            expect(typeof cell.isCurrentMonth).toBe("boolean");
            if (cell.date.getMonth() === 5) {
                expect(cell.isCurrentMonth).toBe(true);
            } else {
                expect(cell.isCurrentMonth).toBe(false);
            }
        }
    });

    it("should handle empty events array", () => {
        const result = getCalendarGrid(2025, 5, []);
        expect(result.length).toBe(35);
        for (const cell of result) {
            expect(cell.events).toEqual([]);
        }
    });
});
