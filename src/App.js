import { ThemeProvider } from "@emotion/react";
import "./App.css";
import { darkTheme } from "./Theme/DarkTheme";
import { CssBaseline } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./components/State/Authentication/Action";
import { findCart } from "./components/State/Cart/Action";
import Routers from "./components/Routers/Routers";
import { getRestaurantByUserId } from "./components/State/Restaurant/Action";

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

    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <Routers />
            </ThemeProvider>
        </div>
    );
}

export default App;
