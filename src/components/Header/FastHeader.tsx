import { Box } from "@mui/material";

import { MonthIndex } from "../../types/date";
import { LeftHeader } from "./LeftHeader";
import { RightHeader } from "./RightHeader";

interface FastHeaderProps {
    selectedMonth: MonthIndex;
    setSelectedMonth: (month: MonthIndex) => void;
    selectedYear: number;
    setSelectedYear: (year: number) => void;
    locale?: string;
}

export const FastHeader = ({
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
    locale,
}: FastHeaderProps) => {

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
            }}
        >
            <LeftHeader
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
                setSelectedYear={setSelectedYear}
                locale={locale}
            />
            <RightHeader
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
            />
        </Box>
    );
};
