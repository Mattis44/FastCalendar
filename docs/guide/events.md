# Events
Events are a crucial part of the Fast React Calendar component, allowing you to display and interact with scheduled items. Each event is represented as an object with specific properties.

## Event Structure
Events are objects with the following structure:

```typescript
type CalendarEvent = {
    id: string; // Unique identifier for the event
    title: string; // Title of the event
    icon: string; // Icon to display with the event (e.g., "🚀")
    start: Date; // Start date and time of the event
    end?: Date;  // Optional, end date and time of the event
    description?: string; // Optional, description of the event
    allDay?: boolean; // Optional, true if the event lasts all day
    color?: string; // Optional, custom color for the event
}
```

You can import the `CalendarEvent` type from the library:

```typescript
import { type CalendarEvent } from "fast-react-calendar";
```

## Using Events
To start using events, you can utilize the `useEvents` hook, which provides a way to manage events in your calendar easily. This hook returns an object with the following properties:

```typescript
events: CalendarEvent[]; // Array of current events
loading: boolean; // Indicates if events are currently being loaded
error: Error | null | undefined;  // Error object if there was an issue loading events
refresh: () => Promise<void>;  // Function to refresh the events
```
The `useEvents` hook takes a function as an argument that returns a promise resolving to an array of `CalendarEvent` objects. This function is called whenever the calendar needs to load events.

```javascript
import { useEvents, type CalendarEvent } from "fast-react-calendar";
const fetchEvents = async (): Promise<CalendarEvent[]> => {
    const response = await fetch("https://example.com/api");
    if (!response.ok) {
        throw new Error("Failed to fetch events");
    }
    const data = await response.json();
    return data as CalendarEvent[];
};
const { events, loading, error, refresh } = useEvents({ fetchEvents });
return (
    <FastCalendar
        events={events}
    />
);
```
You can also pass the `events` prop directly to the `FastCalendar` component if you have a static list of events:

```javascript
import { FastCalendar, type CalendarEvent } from "fast-react-calendar";
const events: CalendarEvent[] = [
    {
        id: "1",
        title: "Meeting with Team",
        icon: "👥",
        start: new Date("2023-10-01T10:00:00"),
        end: new Date("2023-10-01T11:00:00"),
        description: "Discuss project updates and next steps.",
        allDay: false,
        color: "#ff5733"
    },
    {
        id: "2",
        title: "Conference",
        icon: "🎤",
        start: new Date("2023-10-02T09:00:00"),
        end: new Date("2023-10-02T17:00:00"),
        description: "Annual tech conference.",
        allDay: true,
        color: "#33c1ff"
    }
];
return (
    <FastCalendar
        events={events}
    />
);
```