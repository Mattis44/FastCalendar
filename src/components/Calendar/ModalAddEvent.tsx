import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { NewCalendarEvent } from "../../types/date";
import { Close } from "@mui/icons-material";
import { EVENT_ICONS } from "../../constants/calendar";
import { useState } from "react";
import { LocalizedDatePicker } from "../Form/LocalizedDatePicker";
import { addDays } from "date-fns";
import { useTranslation } from "../../hooks/useTranslation";

interface ModalAddEventProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (event: NewCalendarEvent) => void | Promise<void>;
}

export const ModalAddEvent = ({
    open,
    onClose,
    onSubmit,
}: ModalAddEventProps) => {
    const [eventTitle, setEventTitle] = useState<string>("");
    const [eventDescription, setEventDescription] = useState<string>("");
    const [selectedIcon, setSelectedIcon] = useState<string>(EVENT_ICONS[0]);
    const [dateStart, setDateStart] = useState<Date | null>(new Date());
    const [dateEnd, setDateEnd] = useState<Date | null>(addDays(new Date(), 1));
    const [selectedColor, setSelectedColor] = useState<string>("#e91e63");

    const [loading, setLoading] = useState<boolean>(false);

    const t = useTranslation();

    const handleSubmit = async () => {
        if (!eventTitle || !dateStart || !dateEnd) {
            return;
        }

        setLoading(true);
        try {
            const newEvent: NewCalendarEvent = {
                title: eventTitle,
                description: eventDescription,
                icon: selectedIcon,
                color: selectedColor,
                start: dateStart,
                end: dateEnd,
            };
            await onSubmit(newEvent);
            onClose();
        } catch (error) {
            console.error("Error adding event:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>{t("addEvent.title")}</DialogTitle>
            <IconButton
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
                        gap: 2,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
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
                            <InputLabel>{t("addEvent.icon")}</InputLabel>
                            <Select
                                fullWidth
                                label={t("addEvent.icon")}
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
                        <TextField
                            label={t("addEvent.color")}
                            type="color"
                            value={selectedColor}
                            onChange={(e) => setSelectedColor(e.target.value)}
                            sx={{
                                width: "100px",
                            }}
                        />
                    </Box>
                    <TextField
                        fullWidth
                        label={t("addEvent.description")}
                        multiline
                        rows={4}
                        placeholder={t("addEvent.descriptionPlaceholder")}
                        variant="outlined"
                        onChange={(e) => setEventDescription(e.target.value)}
                        value={eventDescription}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            gap: 2,
                        }}
                    >
                        <LocalizedDatePicker
                            label={t("addEvent.startDate")}
                            value={dateStart}
                            onChange={(newValue) => setDateStart(newValue)}
                        />
                        <LocalizedDatePicker
                            label={t("addEvent.endDate")}
                            value={dateEnd}
                            onChange={(newValue) => setDateEnd(newValue)}
                        />
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "space-between" }}>
                <Button onClick={onClose} color="error">
                    {t("addEvent.cancel")}
                </Button>
                <Button
                    onClick={handleSubmit}
                    color="primary"
                    disabled={!eventTitle || !dateStart || !dateEnd}
                    loading={loading}
                    variant="contained"
                >
                    {t("addEvent.add")}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
