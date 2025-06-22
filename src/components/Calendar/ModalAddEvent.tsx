import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { CalendarEvent } from "../../types/date";
import { Close } from "@mui/icons-material";
import { EVENT_ICONS } from "../../contants/calendar";
import { useState } from "react";

interface ModalAddEventProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (event: CalendarEvent) => void;
}

export const ModalAddEvent = ({
    open,
    onClose,
    onSubmit,
}: ModalAddEventProps) => {
    const [eventTitle, setEventTitle] = useState<string>("");
    const [eventDescription, setEventDescription] = useState<string>("");
    const [selectedIcon, setSelectedIcon] = useState<string>(EVENT_ICONS[0]);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Add Event</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={(theme) => ({
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                })}
            >
                <Close />
            </IconButton>
            <DialogContent dividers>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            mb: 2,
                        }}
                    >
                        <TextField
                            fullWidth
                            label="Event Title"
                            value={eventTitle}
                            onChange={(e) => setEventTitle(e.target.value)}
                            sx={{
                                width: "100%",
                            }}
                        />
                        <FormControl
                            fullWidth
                            sx={{
                                maxWidth: "100px",
                            }}
                        >
                            <InputLabel>Event Icon</InputLabel>
                            <Select
                                fullWidth
                                label="Event Icon"
                                value={selectedIcon}
                                onChange={(e) =>
                                    setSelectedIcon(e.target.value as string)
                                }
                            >
                                {EVENT_ICONS.map((icon) => (
                                    <MenuItem key={icon} value={icon}>
                                        {icon}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <TextField
                        fullWidth
                        label="Event Description"
                        multiline
                        rows={4}
                        placeholder="Add a description for the event"
                        variant="outlined"
                        onChange={(e) => setEventDescription(e.target.value)}
                        value={eventDescription}
                    />
                </Box>
            </DialogContent>
        </Dialog>
    );
};
