import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function Loader({ isLoading }) {
    return (
        <Box sx={{ width: "100%" }}>
            <LinearProgress
                variant="indeterminate"
                color="secondary"
                hidden={!isLoading}
            />
        </Box>
    );
}
