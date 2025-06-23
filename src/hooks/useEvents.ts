import { useCallback, useEffect, useRef, useState } from "react";
import { CalendarEvent } from "../types/date";

interface UseEventsOptions {
    fetchEvents: () => CalendarEvent[] | Promise<CalendarEvent[]>;
}

export const useEvents = ({ fetchEvents }: UseEventsOptions) => {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null | undefined>(null);

    const fetchRef = useRef(fetchEvents);

    useEffect(() => {
        fetchRef.current = fetchEvents;
    }, [fetchEvents]);

    const loadEvents = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await Promise.resolve(fetchRef.current());
            setEvents(data);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err
                    : new Error("An unknown error occurred"),
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadEvents();
    }, [loadEvents]);

    return {
        events,
        loading,
        error,
        refresh: loadEvents,
    };
};
