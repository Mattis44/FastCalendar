import { Box, Typography } from "@mui/material";
import { CalendarCell } from "../../types/date";
import { CellEvent } from "./CellEvent";

interface FastCellProps {
    cell: CalendarCell;
    index: number;
}

export const FastCell = ({ cell, index }: FastCellProps) => {
    const isCurrentDay = cell.date
        ? cell.date.toDateString() === new Date().toDateString()
        : false;

    return (
        <Box
            key={index}
            sx={{
                width: "100%",
                aspectRatio: "1",
                position: "relative",
                borderRadius: 2,
                border: (theme) =>
                    cell.isCurrentMonth
                        ? `1px solid ${theme.palette.text.disabled}`
                        : `1px solid ${theme.palette.divider}`,
                fontWeight: 500,
                overflow: "hidden",
            }}
        >
            <Typography
                variant="body1"
                color={
                    isCurrentDay
                        ? "common.white"
                        : cell.isCurrentMonth
                        ? "text.primary"
                        : "text.secondary"
                }
                sx={{
                    position: "absolute",
                    top: 4,
                    left: 6,
                    fontWeight: 600,
                    backgroundColor: isCurrentDay
                        ? (theme) => theme.palette.primary.main
                        : "transparent",
                    borderRadius: "50%",
                    padding: "3px 6px",
                    pointerEvents: "none",
                }}
            >
                {cell.day}
            </Typography>

            {cell.events && cell.events.length > 0 && (
                <Box
                    sx={{
                        position: "absolute",
                        top: 50,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        overflowY: "auto",
                        padding: "0 6px",
                    }}
                >
                    {cell.events.map((event, eventIndex) => (
                        <CellEvent
                            key={eventIndex}
                            event={event}
                            showTitle={true}
                        />
                    ))}
                </Box>
            )}

            {cell.day === 1 && (
                <Typography
                    variant="h5"
                    sx={{
                        position: "absolute",
                        bottom: 4,
                        left: 6,
                        color: "text.secondary",
                    }}
                >
                    {cell.date?.toLocaleString("en-US", { month: "short" })}
                </Typography>
            )}
        </Box>
    );
};
