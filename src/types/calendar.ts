import { RefObject } from "react";
import { CalendarEvent, MonthIndex, NewCalendarEvent } from "./date";

export interface FastCalendarProps {
    /**
     * Reference to the calendar API instance
     */
    apiRef?: RefObject<CalendarApiRef | null>;

    /**
     * Array of calendar events for the month
     */
    events?: CalendarEvent[];

    /**
     * State of the calendar data (loading, error)
     */
    dataState?: DataState;

    /**
     * Optional components to override default rendering
     */
    components?: Components;

    /**
     * Locale used for calendar formatting (e.g. day names, month labels).
     * Defaults to `"en-US"`.
     * Should follow [IETF BCP 47 language tags](https://www.rfc-editor.org/rfc/bcp/bcp47.txt),
     * like `"fr"`, `"en-GB"`, `"de"`, etc.
     */
    locale?: string;

    /**
     * Callback triggered when a new event is added
     */
    onAddEvent?: (event: NewCalendarEvent) => void | Promise<void>;

    /**
     * Callback triggered when an existing event is changed
     */
    onEventChange?: (event: CalendarEvent) => void | Promise<void>;
}

export interface CalendarApiRef {
    /**
     * Method to navigate to today's date
     */
    goToToday: () => void;

    /**
     * Method to set the current month (0-11) 0 = January, 11 = December
     */
    setMonth: (month: MonthIndex) => void;

    /**
     * Method to set the current year
     */
    setYear: (year: number) => void;
    
    /**
     * Method to set the current date
     */
    setDate: (date: Date) => void;
}
export interface DataState {
    loading?: boolean;
    error?: Error | null;
}

export interface Components {
    loading?: React.ComponentType;
    error?: React.ComponentType<{ error: Error }>;
}
