import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";

import { MonthIndex } from "../../types/date";
import { MONTHS } from "../../contants/date";
interface LeftHeaderProps {
    selectedMonth: MonthIndex;
    setSelectedMonth: (month: MonthIndex) => void;
    setSelectedYear: (year: number) => void;
}

export const LeftHeader = ({
    selectedMonth,
    setSelectedMonth,
    setSelectedYear,
}: LeftHeaderProps) => {
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
                    {MONTHS.map((month) => (
                        <MenuItem key={month.index} value={month.index}>
                            {month.label}
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
                onClick={() =>
                    setSelectedMonth(new Date().getMonth() as MonthIndex)
                }
                sx={{
                    width: "200px",
                }}
            >
                + Add Event
            </Button>
        </Box>
    );
};
