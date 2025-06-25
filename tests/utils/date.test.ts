import { CalendarEvent } from "../../src/types/date";
import { generateYears } from "../../src/utils/date";

describe("generateYears", () => {
    // Avant chaque test, mock la date pour qu'elle retourne 2025-06-25
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
                start: new Date(2025, 5, 10), // 10 June 2025
                color: "red",
            },
            {
                id: "2",
                title: "Event 2",
                icon: "🎉",
                start: new Date(2025, 5, 15), // 15 June 2025
                color: "blue",
            },
        ];
    });

    afterAll(() => {
        jest.useRealTimers();
    });

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
