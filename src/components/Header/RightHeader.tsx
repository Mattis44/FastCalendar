import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

import { ArrowButtonDate } from "./ArrowButtonDate";

interface RightHeaderProps {
    selectedYear: number;
    setSelectedYear: (year: number) => void;
}

export const RightHeader = ({
    selectedYear,
    setSelectedYear,
}: RightHeaderProps) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
            }}
        >
            <ArrowButtonDate
                setSelectedYear={() => setSelectedYear(selectedYear - 1)}
                icon={<ArrowLeft />}
            />
            <Typography variant="body1" sx={{ minWidth: "60px" }}>
                {selectedYear}
            </Typography>
            <ArrowButtonDate
                setSelectedYear={() => setSelectedYear(selectedYear + 1)}
                icon={<ArrowRight />}
            />
        </Box>
    );
};
