import { Box } from "@mui/material";

import { MonthIndex, NewCalendarEvent } from "../../types/date";
import { LeftHeader } from "./LeftHeader";
import { RightHeader } from "./RightHeader";

interface FastHeaderProps {
    selectedMonth: MonthIndex;
    setSelectedMonth: (month: MonthIndex) => void;
    selectedYear: number;
    setSelectedYear: (year: number) => void;
    onAddEvent: (event: NewCalendarEvent) => void | Promise<void>;
}

export const FastHeader = ({
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
    onAddEvent
}: FastHeaderProps) => {

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
            }}
        >
            <LeftHeader
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
                setSelectedYear={setSelectedYear}
                onAddEvent={onAddEvent}
            />
            <RightHeader
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
            />
        </Box>
    );
};
