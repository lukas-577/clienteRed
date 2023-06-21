import React from "react";
import { CircularProgress } from "@mui/material";

export const Loading = () => {
    return (
        <div>
            <p>
                Obteniendo Datos...
            </p>
            <CircularProgress color="success" />
        </div>
    )
}
