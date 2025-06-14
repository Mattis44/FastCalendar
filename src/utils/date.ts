import { CalendarCell, CalendarEvent, MONTHS } from "../contants/date";

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
    daysEvents?: CalendarEvent[]
): CalendarCell[] => {
    const result: CalendarCell[] = [];

    const firstOfMonth = new Date(year, month, 1);
    const startDay = firstOfMonth.getDay();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const totalDays = startDay + daysInMonth;

    const cellCount = totalDays <= 35 ? 35 : 42;

    const gridStart = new Date(year, month, 1 - startDay);

    for (let i = 0; i < cellCount; i++) {
        const date = new Date(gridStart);
        date.setDate(gridStart.getDate() + i);
        const dayEvents = daysEvents?.filter(
            (event) =>
                event.start.getFullYear() === date.getFullYear() &&
                event.start.getMonth() === date.getMonth() &&
                event.start.getDate() === date.getDate()
        );
        

        result.push({
            date,
            day: date.getDate(),
            month: MONTHS[date.getMonth()].label,
            isCurrentMonth: date.getMonth() === month,
            events: dayEvents ?  dayEvents : [],
        });
    }

    return result;
};
