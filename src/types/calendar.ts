import { MutableRefObject } from "react";
import { CalendarEvent, MonthIndex, NewCalendarEvent } from "./date";
import { Translations } from "./translations";

export interface FastCalendarProps {
    /**
     * Reference to the calendar API instance
     */
    apiRef?: MutableRefObject<CalendarApiRef | null>;

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
     * Should follow [BCP 47 language tags](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument),
     * like `"fr"`, `"en-GB"`, `"de"`, etc.
     */
    locale?: string;

    /**
     * Translations for the calendar UI.
     * Should be an object with keys matching the default strings used in the calendar.
     * Example: `{ addEvent: "Add Event", today: "Today" }`
     */
    translations?: Partial<Translations>;

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
