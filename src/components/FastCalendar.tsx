import { useEffect, useState } from "react";

import { FastContainer } from "./FastContainer";
import { FastHeader } from "./Header/FastHeader";
import { FastGrid } from "./Calendar/FastGrid";
import { CalendarEvent, MonthIndex } from "../contants/date";

interface FastCalendarProps {
    daysEvents?: CalendarEvent[];
}

const fakeEvents: CalendarEvent[] = [
    {
        id: "1",
        title: "Meeting with team",
        icon: "🏤",
        start: new Date(2025, 6, 5, 10, 0),
        end: new Date(2025, 6, 5, 11, 0),
        allDay: false,
        color: "#ff5722",
        description: "Discuss project updates and next steps.",
    },
    {
        id: "2",
        title: "Project deadline",
        icon: "🚀",
        start: new Date(2025, 5, 10),
        allDay: true,
        color: "#4caf50",
    },
];

export const FastCalendar = ({ daysEvents }: FastCalendarProps) => {
    const [selectedMonth, setSelectedMonth] = useState<MonthIndex>(
        new Date().getMonth() as MonthIndex
    );
    const [selectedYear, setSelectedYear] = useState<number>(
        new Date().getFullYear()
    );
    const [events, setEvents] = useState<CalendarEvent[]>([]);

    useEffect(() => {
        setTimeout(() => {
            setEvents(fakeEvents);
        }, 1000);
    }, []);

    return (
        <FastContainer>
            <FastHeader
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
            />
            <FastGrid
                year={selectedYear}
                month={selectedMonth}
                daysEvents={daysEvents || events}
            />
        </FastContainer>
    );
};
