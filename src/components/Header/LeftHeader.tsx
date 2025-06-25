import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";

import { MonthIndex, NewCalendarEvent } from "../../types/date";
import { useState } from "react";
import { ModalAddEvent } from "../Calendar/ModalAddEvent";
import { capitalize } from "../../utils/date";
import { format } from "date-fns";
import { useLocale } from "../../context/LocalContext";
import { useTranslation } from "../../hooks/useTranslation";
import { getDateFnsLocale } from "../../utils/dateHelpers";
interface LeftHeaderProps {
    selectedMonth: MonthIndex;
    setSelectedMonth: (month: MonthIndex) => void;
    setSelectedYear: (year: number) => void;
    onAddEvent: (event: NewCalendarEvent) => void | Promise<void>;
}

export const LeftHeader = ({
    selectedMonth,
    setSelectedMonth,
    setSelectedYear,
    onAddEvent,
}: LeftHeaderProps) => {
    const [modalAddEventOpen, setModalAddEventOpen] = useState(false);

    const locale = useLocale();
    const t = useTranslation();

    const monthLabels = Array.from({ length: 12 }, (_, i) =>
        capitalize(
            format(new Date(2025, i, 1), "LLLL", {
                locale: getDateFnsLocale(locale),
            }),
        ),
    );
    return (
        <Box
            sx={{
                display: "flex",
                gap: "10px",
            }}
        >
            <FormControl fullWidth>
                <InputLabel>{t("header.month")}</InputLabel>
                <Select
                    label={t("header.month")}
                    value={selectedMonth}
                    onChange={(e) =>
                        setSelectedMonth(e.target.value as MonthIndex)
                    }
                    size="small"
                >
                    {monthLabels.map((month, index) => (
                        <MenuItem key={index} value={index}>
                            {month}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button
                variant="outlined"
                size="small"
                onClick={() => {
                    setSelectedMonth(new Date().getMonth() as MonthIndex);
                    setSelectedYear(new Date().getFullYear());
                }}
            >
                {t("header.today")}
            </Button>

            <Button
                variant="contained"
                size="small"
                onClick={() => setModalAddEventOpen(true)}
                sx={{
                    width: "200px",
                }}
            >
                + {t("header.addEvent")}
            </Button>
            <ModalAddEvent
                open={modalAddEventOpen}
                onClose={() => setModalAddEventOpen(false)}
                onSubmit={async (ev) => {
                    await Promise.resolve(onAddEvent(ev));
                    setModalAddEventOpen(false);
                }}
            />
        </Box>
    );
};
