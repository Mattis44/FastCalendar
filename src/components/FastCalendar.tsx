import { useEffect, useState } from "react";

import { FastContainer } from "./FastContainer";
import { FastHeader } from "./Header/FastHeader";
import { FastGrid } from "./Calendar/FastGrid";
import { CalendarEvent, MonthIndex, NewCalendarEvent } from "../types/date";
import { Components, DataState } from "../types/calendar";
import { ErrorFallback } from "./Fallbacks/ErrorFallback";
import { renderOptionalComponent } from "../utils/render";
import { LocaleContext } from "../context/LocalContext";

interface FastCalendarProps {
    events?: CalendarEvent[];
    dataState?: DataState;
    components?: Components;
    locale?: string;
    onAddEvent?: (event: NewCalendarEvent) => void | Promise<void>;
}

/**
 * @param {CalendarEvent[]} events - Array of calendar events for the month
 */
export const FastCalendar = ({
    events,
    dataState,
    components,
    locale = "en-US",
    onAddEvent,
}: FastCalendarProps) => {
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
        <LocaleContext.Provider value={locale}>
            <FastContainer>
                {dataState?.error instanceof Error &&
                    renderOptionalComponent(components?.error, ErrorFallback, {
                        error: dataState.error,
                    })}
                <FastHeader
                    selectedMonth={selectedMonth}
                    setSelectedMonth={setSelectedMonth}
                    selectedYear={selectedYear}
                    setSelectedYear={setSelectedYear}
                    onAddEvent={async (event) => {
                        if (onAddEvent) {
                            await Promise.resolve(onAddEvent(event));
                        } else {
                            setCalendarEvents((prev) => [
                                ...prev,
                                {
                                    ...event,
                                    id: crypto.randomUUID(),
                                    icon: event.icon ?? "",
                                    color: event.color ?? "",
                                },
                            ]);
                        }
                    }}
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
        </LocaleContext.Provider>
    );
};
