import { Card } from "@mui/material";

interface FastContainerProps {
    children: React.ReactNode;
}

export const FastContainer = ({ children }: FastContainerProps) => {
    return (
        <Card
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                padding: "20px",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "4px",
                flexDirection: "column",
                gap: "20px",
            }}
        >
            {children}
        </Card>
    );
};
