import { Alert } from "@mui/material";

interface ErrorFallbackProps {
    error: Error;
}

export const ErrorFallback = ({ error }: ErrorFallbackProps) => {
    return (
        <Alert
            severity="error"
            sx={{ width: "100%", marginTop: 2 }}
            variant="outlined"
        >
            {error.message || "An unexpected error occurred."}
        </Alert>
    );
};
