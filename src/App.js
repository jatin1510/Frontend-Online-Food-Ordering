import { ThemeProvider } from "@emotion/react";
import "./App.css";
import { CssBaseline, createTheme } from "@mui/material";
import { createContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./components/State/Authentication/Action";
import { findCart } from "./components/State/Cart/Action";
import Routers from "./components/Routers/Routers";
import { getRestaurantByUserId } from "./components/State/Restaurant/Action";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { auth } = useSelector((store) => store);

    useEffect(() => {
        dispatch(getUser(auth.jwt || jwt));

        // if (auth.user?.role === "ROLE_CUSTOMER") {
        dispatch(findCart({ jwt: auth.jwt || jwt }));
        // }
    }, [auth.jwt]);

    useEffect(() => {
        // if (auth.user?.role === "ROLE_RESTAURANT_OWNER") {
        dispatch(getRestaurantByUserId(auth.jwt || jwt));
        // }
    }, [auth.user]);

    const [mode, setMode] = useState("light");
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                console.log("called toggleColorMode");
                setMode((prevMode) =>
                    prevMode === "light" ? "dark" : "light"
                );
            },
        }),
        []
    );

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    primary: {
                        main: "#e91e63",
                    },
                    secondary: {
                        main: "#5a20cb",
                    },
                    textColor: {
                        main: mode === "light" ? "#111111" : "#ffffff",
                    },
                },
            }),
        [mode]
    );

    return (
        <div>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Routers />
                </ThemeProvider>
            </ColorModeContext.Provider>
        </div>
    );
}

export default App;
