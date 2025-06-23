import { Box, Typography } from "@mui/material";
import { CalendarCell, CalendarEvent } from "../../types/date";
import { CellEvent } from "./CellEvent";
import { format } from "date-fns";
import { capitalize, getDateFnsLocale } from "../../utils/date";
import { useLocale } from "../../context/LocalContext";
import { useState } from "react";

interface FastCellProps {
    cell: CalendarCell;
    index: number;
    onEventDragStart: (event: CalendarEvent, e: React.DragEvent) => void;
    onEventDragEnd: (event: CalendarEvent, e: React.DragEvent) => void;
    onEventDrop: (event: CalendarEvent, e: React.DragEvent) => void;
}

export const FastCell = ({
    cell,
    index,
    onEventDragStart,
    onEventDragEnd,
    onEventDrop,
}: FastCellProps) => {
    const [dragCounter, setDragCounter] = useState(0);
    const isDragOver = dragCounter > 0;

    const locale = useLocale();
    const isCurrentDay = cell.date
        ? cell.date.toDateString() === new Date().toDateString()
        : false;

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        setDragCounter((prev) => prev + 1);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setDragCounter((prev) => Math.max(prev - 1, 0));
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragCounter(0);
        const data = e.dataTransfer.getData("application/json");
        if (data) {
            const event: CalendarEvent = JSON.parse(data);
            onEventDrop(event, e);
        }
    };

    return (
        <Box
            key={index}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            sx={{
                width: "100%",
                aspectRatio: "1",
                position: "relative",
                borderRadius: 2,
                border: (theme) =>
                    isDragOver
                        ? `2px solid ${theme.palette.primary.main}`
                        : cell.isCurrentMonth
                        ? `1px solid ${theme.palette.text.disabled}`
                        : `1px solid ${theme.palette.divider}`,
                fontWeight: 500,
                overflow: "hidden",
                transition: "border-color 0.2s ease-in-out",
                boxSizing: "border-box",
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
                            onDragStart={onEventDragStart}
                            onDragEnd={onEventDragEnd}
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
                    {cell.date &&
                        capitalize(
                            format(cell.date, "MMMM", {
                                locale: getDateFnsLocale(locale || "en-US"),
                            })
                        )}
                </Typography>
            )}
        </Box>
    );
};
