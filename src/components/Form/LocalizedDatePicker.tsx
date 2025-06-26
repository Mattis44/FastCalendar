import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { getDateFnsLocale } from "../../utils/dateHelpers";
import { useLocale } from "../../context/LocalContext";

interface LocalizedDatePickerProps {
    label: string;
    value?: Date | null;
    onChange?: (date: Date | null) => void;
}

export const LocalizedDatePicker = ({
    label,
    value,
    onChange,
}: LocalizedDatePickerProps) => {
    const locale = useLocale();

    return (
        <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={getDateFnsLocale(locale)}
        >
            <DatePicker
                label={label}
                value={value}
                onChange={onChange}
                sx={{
                    width: "100%",
                }}
            />
        </LocalizationProvider>
    );
};
