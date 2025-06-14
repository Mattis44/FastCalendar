import { useState } from "react";
import { Divider } from "@mui/material";

import { FastContainer } from "./FastContainer";
import { FastHeader } from "./Header/FastHeader";
import { FastGrid } from "./Calendar/FastGrid";
import { MonthIndex } from "../contants/months";

export const FastCalendar = () => {
    const [selectedMonth, setSelectedMonth] = useState<MonthIndex>(
        new Date().getMonth() as MonthIndex
    );
    const [selectedYear, setSelectedYear] = useState<number>(
        new Date().getFullYear()
    );

    return (
        <FastContainer>
            <FastHeader
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
            />
            <Divider sx={{ width: "100%", margin: "10px 0" }} />
            <FastGrid year={selectedYear} month={selectedMonth} />
        </FastContainer>
    );
};
