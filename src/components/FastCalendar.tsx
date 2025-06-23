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
    onEventChange?: (event: CalendarEvent) => void | Promise<void>;
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
    onEventChange,
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
                        let newEvent: CalendarEvent = {
                            ...event,
                            id: crypto.randomUUID(),
                            icon: event.icon ?? "",
                            color: event.color ?? "",
                        };
                        try {
                            if (onAddEvent) {
                                await Promise.resolve(onAddEvent(event));
                            } else {
                                setCalendarEvents((prev) => [
                                    ...prev,
                                    newEvent,
                                ]);
                            }
                        } catch (error) {
                            console.error("Error adding event:", error);
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
                    onEventChange={async (changedEvent) => {
                        if (typeof changedEvent.id === "undefined") {
                            return;
                        }
                        try {
                            if (onEventChange) {
                                await Promise.resolve(
                                    onEventChange(changedEvent)
                                );
                            } else {
                                setCalendarEvents((prev) =>
                                    prev.map((ev) =>
                                        ev.id === changedEvent.id
                                            ? { ...ev, ...changedEvent }
                                            : ev
                                    )
                                );
                            }
                        } catch (error) {
                            console.error("Error updating event:", error);
                        }
                    }}
                />
            </FastContainer>
        </LocaleContext.Provider>
    );
};
