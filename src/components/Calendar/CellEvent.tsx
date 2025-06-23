import { alpha, Box, Tooltip, Typography } from "@mui/material";
import { CalendarEvent } from "../../types/date";

interface CellEventProps {
    event: CalendarEvent;
    showTitle?: boolean;
}

export const CellEvent = ({
    event,
    showTitle = true,
}: CellEventProps) => {
    return (
        <Box
            draggable
            onDragStart={(e) => {
                e.stopPropagation();
                console.log("Dragging event:", event);
                
                e.dataTransfer.setData(
                    "application/json",
                    JSON.stringify(event)
                );
            }}
            sx={{
                display: "flex",
                gap: "4px",
                padding: "4px",
                backgroundColor: alpha(event.color, 0.2),
                border: `1px solid ${event.color}`,
                borderRadius: "10px",
                cursor: "pointer",
                transition:
                    "background-color 0.2s, box-shadow 0.2s ease-in-out",
                "&:hover": {
                    backgroundColor: alpha(event.color, 0.3),
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                },
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
                            cursor: "pointer",
                        }}
                    >
                        {event.title}
                    </Typography>
                </Tooltip>
            )}
        </Box>
    );
};
