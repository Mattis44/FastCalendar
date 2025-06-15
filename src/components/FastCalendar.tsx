import { useEffect, useState } from "react";

import { FastContainer } from "./FastContainer";
import { FastHeader } from "./Header/FastHeader";
import { FastGrid } from "./Calendar/FastGrid";
import { CalendarEvent, MonthIndex } from "../types/date";
import { DataState } from "../types/calendar";
import { LoadingFallback } from "./Fallbacks/LoadingFallback";
import { ErrorFallback } from "./Fallbacks/ErrorFallback";

interface FastCalendarProps {
    events?: CalendarEvent[];
    dataState?: DataState;
}

/**
 * @param {CalendarEvent[]} events - Array of calendar events for the month
 */
export const FastCalendar = ({ events, dataState }: FastCalendarProps) => {
    const [selectedMonth, setSelectedMonth] = useState<MonthIndex>(
        new Date().getMonth() as MonthIndex
    );
    const [selectedYear, setSelectedYear] = useState<number>(
        new Date().getFullYear()
    );
    const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);

    useEffect(() => {
        if (events) {
            setCalendarEvents(events);
        }
    }, [events]);
    console.log("[FastCalendar] Rendered with events:", calendarEvents);
    
    if (dataState?.error) {
        return <ErrorFallback error={dataState.error} />;
    }
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
                events={calendarEvents}
                loading={dataState?.loading}
            />
        </FastContainer>
    );
};
