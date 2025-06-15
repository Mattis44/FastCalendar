import { useEffect, useState } from "react";

import { FastContainer } from "./FastContainer";
import { FastHeader } from "./Header/FastHeader";
import { FastGrid } from "./Calendar/FastGrid";
import { CalendarEvent, MonthIndex } from "../types/date";
import { Components, DataState } from "../types/calendar";
import { ErrorFallback } from "./Fallbacks/ErrorFallback";

interface FastCalendarProps {
    events?: CalendarEvent[];
    dataState?: DataState;
    components?: Components;
}

/**
 * @param {CalendarEvent[]} events - Array of calendar events for the month
 */
export const FastCalendar = ({ events, dataState, components }: FastCalendarProps) => {
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

    return (
        <FastContainer>
            {dataState?.error && (
                components?.error ? (
                    <components.error error={dataState.error} />
                ) : (
                    <ErrorFallback error={dataState.error} />
                )
            )}
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
                components={{
                    loading: components?.loading,
                }}
            />
        </FastContainer>
    );
};
