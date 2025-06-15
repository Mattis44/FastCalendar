import { CalendarEvent } from "../src/types/date";

export const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    icon: "🚀",
    title: "Business Meeting",
    start: new Date(new Date().setHours(10, 0, 0)),
    end: new Date(new Date().setHours(11, 0, 0)),
    allDay: false,
    color: "#1976d2"
  },
  {
    id: "2",
    title:  "Lunch with Team",
    icon: "🍽️",
    start: new Date(new Date().setHours(12, 0, 0)),
    end: new Date(new Date().setHours(13, 0, 0)),
    allDay: false,
    color: "#f50057"
  },
  {
    id: "3",
    title: "Sprint Review",
    icon: "🔍",
    start: new Date(new Date().setHours(15, 0, 0)),
    end: new Date(new Date().setHours(16, 30, 0)),
    allDay: false,
    color: "#4caf50"
  }
];
