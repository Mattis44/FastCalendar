import { Box, Divider, Typography } from "@mui/material";

import { getCalendarGrid } from "../../utils/date";
import { CalendarEvent, WEEK_DAYS } from "../../contants/date";
import { FastCell } from "./FastCell";

interface FastGridProps {
    year: number;
    month: number;
    daysEvents?: CalendarEvent[];
}

export const FastGrid = ({ year, month, daysEvents }: FastGridProps) => {
    const days = getCalendarGrid(year, month, daysEvents);


    return (
        <Box
            sx={{
                width: "100%",
            }}
        >
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    gap: "5px",
                    mb: 1,
                }}
            >
                {WEEK_DAYS.map((day) => (
                    <Typography
                        key={day}
                        align="center"
                        variant="body2"
                        fontWeight={600}
                        color="text.secondary"
                    >
                        {day}
                    </Typography>
                ))}
            </Box>
            <Divider sx={{ mb: 1 }} />
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    gap: "5px",
                    width: "100%",
                }}
            >
                {days.map((cell, index) => (
                    <FastCell
                        key={index}
                        cell={cell}
                        index={index}
                    />
                ))}
            </Box>
        </Box>
    );
};
