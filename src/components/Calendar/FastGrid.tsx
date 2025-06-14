import { Box } from "@mui/material";

import { getCalendarGrid } from "../../utils/date";

interface FastGridProps {
    year: number;
    month: number;
}

export const FastGrid = ({ year, month }: FastGridProps) => {
    const days = getCalendarGrid(year, month);

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: "10px",
                width: "100%",
            }}
        >
            {days.map((cell, index) => (
                <Box
                    key={index}
                    sx={{
                        width: "100%",
                        aspectRatio: "1",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 1,
                        bgcolor: cell.isCurrentMonth
                            ? "primary.main"
                            : "grey.300",
                        color: cell.isCurrentMonth ? "white" : "grey.600",
                        fontWeight: 500,
                    }}
                >
                    {cell.day ?? ""}
                </Box>
            ))}
        </Box>
    );
};
