import { useRef } from "react";
import { CalendarApiRef } from "../types/calendar";

export const useApiRef = () => {
    return useRef<CalendarApiRef>(null);
};
