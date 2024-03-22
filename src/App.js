import { ThemeProvider } from "@emotion/react";
import "./App.css";
import { darkTheme } from "./Theme/DarkTheme";
import { CssBaseline } from "@mui/material";
import CustomerRoute from "./components/Routers/CustomerRoute";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./components/State/Authentication/Action";

function App() {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { auth } = useSelector((store) => store);

    useEffect(() => {
        dispatch(getUser(auth.jwt || jwt));
    }, [auth.jwt]);

    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <CustomerRoute />
            </ThemeProvider>
        </div>
    );
}

export default App;
