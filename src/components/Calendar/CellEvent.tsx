import { alpha, Box, Typography } from "@mui/material";
import { CalendarEvent } from "../../contants/date";

interface CellEventProps {
    event: CalendarEvent;
    showTitle?: boolean;
}

export const CellEvent = ({ event, showTitle = true }: CellEventProps) => {
    return (
        <Box
            sx={{
                display: "flex",
                gap: "4px",
                padding: "4px",
                backgroundColor: alpha(event.color, 0.2),
                border: `1px solid ${event.color}`,
                borderRadius: "10px",
            }}
        >
            <Typography>{event.icon}</Typography>
            {showTitle && (
                <Typography
                    sx={{
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        color: event.color,
                        fontWeight: 500,
                    }}
                >
                    {event.title}
                </Typography>
            )}
        </Box>
    );
};
