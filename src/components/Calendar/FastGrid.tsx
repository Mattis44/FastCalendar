import { Box, Divider, Typography } from "@mui/material";

import {
    capitalize,
    getCalendarGrid,
    getDateFnsLocale,
} from "../../utils/date";
import { CalendarEvent } from "../../types/date";
import { FastCell } from "./FastCell";
import { LoadingFallback } from "../Fallbacks/LoadingFallback";
import { renderOptionalComponent } from "../../utils/render";
import { addDays, format, startOfWeek } from "date-fns";
import { useLocale } from "../../context/LocalContext";

interface FastGridProps {
    year: number;
    month: number;
    events?: CalendarEvent[];
    loading?: boolean;
    components?: {
        loading?: React.ComponentType;
    };
    onEventChange?: (event: CalendarEvent) => void;
}

export const FastGrid = ({
    year,
    month,
    events,
    loading,
    components,
    onEventChange,
}: FastGridProps) => {
    const locale = useLocale();

    const days = getCalendarGrid(year, month, events, locale);
    const start = startOfWeek(new Date(), { weekStartsOn: 0 });
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(start, i));
    return (
        <Box
            sx={{
                width: "100%",
                position: "relative",
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
                {weekDays.map((date, index) => (
                    <Typography
                        key={index}
                        align="center"
                        variant="body2"
                        fontWeight={600}
                        color="text.secondary"
                    >
                        {capitalize(
                            format(date, "EEEEEE", {
                                locale: getDateFnsLocale(locale || "en-US"),
                            }),
                        )}
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
                    backdropFilter: loading ? "blur(5px)" : "none",
                    pointerEvents: loading ? "none" : "auto",
                    opacity: loading ? 0.3 : 1,
                    transition: "all 0.3s ease",
                }}
            >
                {days.map((cell, index) => (
                    <FastCell
                        key={index}
                        cell={cell}
                        index={index}
                        onEventDrop={(event) => {
                            const newDate = cell.date;
                            const eventStartDate = new Date(event.start);
                            const eventEndDate = new Date(
                                event.end || event.start,
                            );

                            if (newDate && onEventChange) {
                                const newStart = new Date(
                                    newDate.getFullYear(),
                                    newDate.getMonth(),
                                    newDate.getDate(),
                                    eventStartDate.getHours(),
                                    eventStartDate.getMinutes(),
                                );

                                const durationMs =
                                    eventEndDate.getTime() -
                                    eventStartDate.getTime();

                                const newEnd = event.end
                                    ? new Date(newStart.getTime() + durationMs)
                                    : undefined;

                                onEventChange({
                                    ...event,
                                    start: newStart,
                                    end: newEnd,
                                });
                            }
                        }}
                    />
                ))}
            </Box>
            {loading && (
                <Box
                    sx={{
                        gridColumn: "span 7",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100px",
                    }}
                >
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            zIndex: 10,
                        }}
                    >
                        {loading &&
                            renderOptionalComponent(
                                components?.loading,
                                LoadingFallback,
                                {},
                            )}
                    </Box>
                </Box>
            )}
        </Box>
    );
};
