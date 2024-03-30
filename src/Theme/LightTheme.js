import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#e91e63",
        },
        secondary: {
            main: "#5a20cb",
        },
        black: {
            main: "#0d0d0d",
        },
        background: {
            main: "#ffffff",
            default: "#ffffff",
            paper: "#ffffff",
        },
        textColor: {
            main: "#111111",
        },
    },
});
