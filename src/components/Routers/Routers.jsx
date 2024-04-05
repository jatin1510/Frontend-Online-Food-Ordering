import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import AdminRoute from "./AdminRoute";
import CustomerRoute from "./CustomerRoute";
import Notification from "../Notification/Notification";
import { useTheme } from "@emotion/react";
import { Box, IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorModeContext } from "../../App";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

const Routers = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    return (
        <>
            <Box
                sx={{
                    zIndex: 1000,
                    position: "fixed",
                    bottom: 50,
                    right: 30,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "text.primary",
                    borderRadius: 1,
                }}
            >
                <IconButton
                    aria-owns={open ? "mouse-over-popover" : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                    sx={{ ml: 1 }}
                    onClick={colorMode.toggleColorMode}
                    color="inherit"
                >
                    {theme.palette.mode === "dark" ? (
                        <Brightness7Icon fontSize="large" />
                    ) : (
                        <Brightness4Icon fontSize="large" />
                    )}
                </IconButton>
                <Popover
                    id="mouse-over-popover"
                    sx={{
                        pointerEvents: "none",
                    }}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                    transformOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                >
                    <Typography sx={{ p: 1 }}>
                        {theme.palette.mode === "dark"
                            ? "Enable Light Mode"
                            : "Enable Dark Mode"}
                    </Typography>
                </Popover>
            </Box>
            <Notification />
            <Routes>
                <Route
                    exact
                    path="/admin/restaurant/*"
                    element={<AdminRoute />}
                ></Route>
                <Route exact path="/*" element={<CustomerRoute />}></Route>
            </Routes>
        </>
    );
};

export default Routers;
