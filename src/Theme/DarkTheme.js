import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
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
            main: "#000000",
            default: "#0d0d0d",
            paper: "#0d0d0d",
        },
        textColor: {
            main: "#111111",
        },
    },
});
