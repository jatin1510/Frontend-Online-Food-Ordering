import { ThemeProvider } from "@emotion/react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { darkTheme } from "./Theme/DarkTheme";
import { CssBaseline } from "@mui/material";
import Home from "./components/Home/Home";
import RestaurantDetail from "./components/Restaurant/RestaurantDetail";
import Cart from "./components/Cart/Cart";

function App() {
    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <Navbar />
                {/* <Home /> */}
                {/* <RestaurantDetail/> */}
                <Cart />
            </ThemeProvider>
        </div>
    );
}

export default App;
