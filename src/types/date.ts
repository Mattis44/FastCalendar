export type MonthIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export type Month = {
    label: string;
    index: MonthIndex;
};

export type CalendarEvent = {
    id: string;
    title: string;
    icon: string;
    start: Date;
    end?: Date;
    allDay?: boolean;
    description?: string;
    color: string;
};

export type NewCalendarEvent = Omit<CalendarEvent, 'id'>;

export type CalendarCell = {
    date: Date | null;
    day?: number;
    month?: string;
    isCurrentMonth: boolean;
    events?: CalendarEvent[];
};
