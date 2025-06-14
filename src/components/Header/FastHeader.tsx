import { useEffect } from "react";
import { Box } from "@mui/material";

import { MonthIndex } from "../../contants/months";
import { LeftHeader } from "./LeftHeader";
import { RightHeader } from "./RightHeader";

interface FastHeaderProps {
    selectedMonth: MonthIndex;
    setSelectedMonth: (month: MonthIndex) => void;
    selectedYear: number;
    setSelectedYear: (year: number) => void;
}

export const FastHeader = ({
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
}: FastHeaderProps) => {


    useEffect(() => {
        console.log(selectedYear);
        
    }, [selectedYear]);
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
            />
            <RightHeader
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
            />
        </Box>
    );
};
