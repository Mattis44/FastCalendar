import { IconButton } from "@mui/material";

interface ArrowButtonDateProps {
    setSelectedYear: () => void;
    icon?: React.ReactNode;
}

export const ArrowButtonDate = ({
    setSelectedYear,
    icon,
}: ArrowButtonDateProps) => {
    return (
        <IconButton
            size="small"
            sx={{
                border: (theme) => `1px solid ${theme.palette.divider}`,
            }}
            onClick={() => {
                setSelectedYear();
            }}
        >
            {icon}
        </IconButton>
    );
};
