# Props
Here is a list of all the props that can be used in the `FastCalendar` component

## List of Props
`*: Required`

`?: Optional`

| Prop Name | Type | Default | Description |
|-----------|------|---------|-------------|
| `events*` | `CalendarEvent[]` | `[]` | An array of [events](./events.md) to display in the calendar. Each event should conform to the `CalendarEvent` type. |
| `locale?` | `string` | `"en-US"` | The locale to use for formatting dates and times. Defaults to `"en-US"`. |
| `components?` | `CalendarComponents` | `{}` | An object containing custom components to override the default ones. See [Customize](./components.md) for more details. |
| `apiRef?` | `React.MutableRefObject<CalendarApi>` | `null` | A ref to access the calendar [API](./api.md) methods. Useful for imperative actions like navigating to a specific date or refreshing events. |
| `onAddEvent?` | `(event: CalendarEvent) => void` | `undefined` | A callback function that is called when a new event is added. Useful for handling event creation in your application. |
| `onDeleteEvent?` | `(event: CalendarEvent) => void` | `undefined` | A callback function that is called when an event is deleted. Useful for handling event removal in your application. |
| `onUpdateEvent?` | `(event: CalendarEvent) => void` | `undefined` | A callback function that is called when an event is updated. Useful for handling event modifications in your application. |
| `dataState?` | `DataState` | `{ loading: false, error: null }` | An object representing the current state of the data. It can include properties like `loading`, `error`, and `refresh`. This is useful for managing the state of your events data in cases where you want to handle loading states or errors. |
| `translations?` | `Partial<Translations>` | `{}` | An object containing translations for various calendar strings. This allows you to customize the text displayed in the calendar. See [Translations](./translations.md) for more details. |

::: warning 
use `apiRef` prop only if you need to access the calendar API methods imperatively. Most use cases can be handled declaratively through props and callbacks.
:::

##  Usage Example
```javascript
import { FastCalendar } from "fast-react-calendar";
import { useEvents, type CalendarEvent } from "fast-react-calendar";

const fetchEvents = async (): Promise<CalendarEvent[]> => {
    // Fetch events from an API or database
    return events;
};
const { events, loading, error, refresh } = useEvents({ fetchEvents });
const apiRef = useApiRef();

return (
    <FastCalendar
        apiRef={apiRef}
        events={events}
        locale="fr-FR"
        onAddEvent={(event) => console.log("Event added:", event)}
        onDeleteEvent={(event) => console.log("Event deleted:", event)}
        onUpdateEvent={(event) => console.log("Event updated:", event)}
        dataState={{ loading, error, refresh }}
    />
);
```