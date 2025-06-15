import { Box, CircularProgress, Divider, Typography } from "@mui/material";

import { getCalendarGrid } from "../../utils/date";
import { CalendarEvent } from "../../types/date";
import { WEEK_DAYS } from "../../contants/date";
import { FastCell } from "./FastCell";
import { LoadingFallback } from "../Fallbacks/LoadingFallback";

interface FastGridProps {
    year: number;
    month: number;
    events?: CalendarEvent[];
    loading?: boolean;
    components?: {
        loading?: React.ComponentType;
    };
}

export const FastGrid = ({
    year,
    month,
    events,
    loading,
    components,
}: FastGridProps) => {
    const days = getCalendarGrid(year, month, events);
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
                    backdropFilter: loading ? "blur(5px)" : "none",
                    pointerEvents: loading ? "none" : "auto",
                    opacity: loading ? 0.3 : 1,
                    transition: "all 0.3s ease",
                }}
            >
                {days.map((cell, index) => (
                    <FastCell key={index} cell={cell} index={index} />
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
                        {components?.loading ? (
                            <components.loading />
                        ) : (
                            <LoadingFallback />
                        )}
                    </Box>
                </Box>
            )}
        </Box>
    );
};
