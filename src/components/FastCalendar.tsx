import { useEffect, useRef, useState } from "react";

import { FastContainer } from "./FastContainer";
import { FastHeader } from "./Header/FastHeader";
import { FastGrid } from "./Calendar/FastGrid";
import { CalendarEvent, MonthIndex, NewCalendarEvent } from "../types/date";
import { CalendarApiRef, FastCalendarProps } from "../types/calendar";
import { ErrorFallback } from "./Fallbacks/ErrorFallback";
import { renderOptionalComponent } from "../utils/render";
import { LocaleContext } from "../context/LocalContext";
import { TranslationContext } from "../context/TranslationContext";

export const FastCalendar = ({
    apiRef,
    events,
    dataState,
    components,
    locale = "en-US",
    translations = {},
    onAddEvent,
    onEventChange,
}: FastCalendarProps) => {
    const [selectedMonth, setSelectedMonth] = useState<MonthIndex>(
        new Date().getMonth() as MonthIndex,
    );
    const [selectedYear, setSelectedYear] = useState<number>(
        new Date().getFullYear(),
    );
    const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);

    const internalRef = useRef<CalendarApiRef>({
        goToToday: () => {
            const today = new Date();
            setSelectedMonth(today.getMonth() as MonthIndex);
            setSelectedYear(today.getFullYear());
        },
        setMonth: (month: MonthIndex) => {
            setSelectedMonth(month);
        },
        setYear: (year: number) => {
            setSelectedYear(year);
        },
        setDate: (date: Date) => {
            setSelectedMonth(date.getMonth() as MonthIndex);
            setSelectedYear(date.getFullYear());
        },
    });

    useEffect(() => {
        if (events) {
            setCalendarEvents(events);
        }
    }, [events]);

    useEffect(() => {
        if (apiRef) {
            apiRef.current = internalRef.current;
        }
    }, [apiRef]);

    const onAddEventHandler = async (event: NewCalendarEvent) => {
        const newEvent: CalendarEvent = {
            ...event,
            id: crypto.randomUUID(),
            icon: event.icon ?? "",
            color: event.color ?? "",
        };
        try {
            if (onAddEvent) {
                await Promise.resolve(onAddEvent(newEvent));
            } else {
                setCalendarEvents((prev) => [...prev, newEvent]);
            }
        } catch (error) {
            console.error("Error adding event:", error);
        }
    };
    const onEventChangeHandler = async (changedEvent: CalendarEvent) => {
        if (typeof changedEvent.id === "undefined") {
            return;
        }

        try {
            if (onEventChange) {
                await Promise.resolve(onEventChange(changedEvent));
            } else {
                setCalendarEvents((prev) =>
                    prev.map((ev) =>
                        ev.id === changedEvent.id
                            ? { ...ev, ...changedEvent }
                            : ev,
                    ),
                );
            }
        } catch (error) {
            console.error("Error updating event:", error);
        }
    };

    return (
        <TranslationContext.Provider value={translations}>
            <LocaleContext.Provider value={locale}>
                <FastContainer>
                    {dataState?.error instanceof Error &&
                        renderOptionalComponent(
                            components?.error,
                            ErrorFallback,
                            {
                                error: dataState.error,
                            },
                        )}
                    <FastHeader
                        selectedMonth={selectedMonth}
                        setSelectedMonth={setSelectedMonth}
                        selectedYear={selectedYear}
                        setSelectedYear={setSelectedYear}
                        onAddEvent={onAddEventHandler}
                    />
                    <FastGrid
                        year={selectedYear}
                        month={selectedMonth}
                        events={calendarEvents}
                        loading={dataState?.loading}
                        components={{
                            loading: components?.loading,
                        }}
                        onEventChange={onEventChangeHandler}
                    />
                </FastContainer>
            </LocaleContext.Provider>
        </TranslationContext.Provider>
    );
};
