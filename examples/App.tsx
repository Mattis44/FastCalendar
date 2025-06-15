import { FastCalendar } from "../src/components/FastCalendar";
import { useEvents } from "../src/hooks/useEvents";
import { CalendarEvent } from "../src/types/date";
import { mockEvents } from "./mockEvents";

const fetchEvents = async (): Promise<CalendarEvent[]> => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
    return mockEvents;
};

export const App = () => {
    const { events, loading, error, refresh } = useEvents({ fetchEvents });
    return (
        <div>
            <h1>Fast Calendar Example</h1>
            <button onClick={refresh} disabled={loading}>
                {loading ? "Loading..." : "Refresh Events"}
            </button>
            <FastCalendar events={events} dataState={{ loading, error }} />
        </div>
    );
};
