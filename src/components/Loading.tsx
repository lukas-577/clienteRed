import React from "react";
import { CircularProgress } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

// creacion de thema 

const theme = createTheme({
    palette: {
      primary: {
        main: '#000000', // Color primario
      },
      secondary: {
        main: '#f50057', // Color secundario
      },
    },
  });

export const Loading = () => {
    return (
        <div>
            <ThemeProvider theme={theme}>
                <p>
                    Obteniendo Datos...
                </p>
                <CircularProgress color="primary" />
            </ThemeProvider>
        </div>
    )
}
