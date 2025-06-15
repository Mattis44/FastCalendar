import { alpha, Box, Tooltip, Typography } from "@mui/material";
import { CalendarEvent } from "../../types/date";

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
            <Typography
                sx={{
                    pointerEvents: "none",
                }}
            >
                {event.icon}
            </Typography>
            {showTitle && (
                <Tooltip title={event.title}>
                    <Typography
                        sx={{
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            color: event.color,
                            fontWeight: 500,
                            cursor: "pointer"
                        }}
                    >
                        {event.title}
                    </Typography>
                </Tooltip>
            )}
        </Box>
    );
};
