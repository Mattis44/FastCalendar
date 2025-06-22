import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";

import { MonthIndex } from "../../types/date";
import { useState } from "react";
import { ModalAddEvent } from "../Calendar/ModalAddEvent";
import { capitalize, getDateFnsLocale } from "../../utils/date";
import { format } from "date-fns";
interface LeftHeaderProps {
    selectedMonth: MonthIndex;
    setSelectedMonth: (month: MonthIndex) => void;
    setSelectedYear: (year: number) => void;
    locale?: string;
}

export const LeftHeader = ({
    selectedMonth,
    setSelectedMonth,
    setSelectedYear,
    locale,
}: LeftHeaderProps) => {
    const [modalAddEventOpen, setModalAddEventOpen] = useState(false);

    const monthLabels = Array.from({ length: 12 }, (_, i) =>
        capitalize(
            format(new Date(2025, i, 1), "LLLL", {
                locale: getDateFnsLocale(locale || "en-US"),
            })
        )
    );
    return (
        <Box
            sx={{
                display: "flex",
                gap: "10px",
            }}
        >
            <FormControl fullWidth>
                <InputLabel>Month</InputLabel>
                <Select
                    label="Month"
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
                Today
            </Button>

            <Button
                variant="contained"
                size="small"
                onClick={() => setModalAddEventOpen(true)}
                sx={{
                    width: "200px",
                }}
            >
                + Add Event
            </Button>
            <ModalAddEvent
                open={modalAddEventOpen}
                onClose={() => setModalAddEventOpen(false)}
                onSubmit={(ev) => {}}
            />
        </Box>
    );
};
