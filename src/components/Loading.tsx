import React from "react";
import { CircularProgress } from "@mui/material";

export const Loading = () => {
    return (
        <div style={{
            width: '100%',
            height: '100vh',
            background: 'grey',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <p style={{
                fontSize: 28,
                color: 'white',
                fontWeight: 700,
                opacity: 0.8,
            }}>
                Obteniendo Datos...
            </p>
            <CircularProgress color="secondary" />
        </div>
    )
}
