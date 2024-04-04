import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ShopTwoIcon from "@mui/icons-material/ShopTwo";
import CategoryIcon from "@mui/icons-material/Category";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import EventIcon from "@mui/icons-material/Event";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Divider, Drawer, useMediaQuery } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../State/Authentication/Action";
import { darkTheme } from "../../Theme/DarkTheme";
import { fireToast } from "../Notification/Notification";

const menu = [
    { title: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { title: "Orders", icon: <ShoppingBagIcon />, path: "/orders" },
    { title: "Menu", icon: <ShopTwoIcon />, path: "/menu" },
    { title: "Food Category", icon: <CategoryIcon />, path: "/category" },
    { title: "Ingredients", icon: <FastfoodIcon />, path: "/ingredients" },
    { title: "Events", icon: <EventIcon />, path: "/events" },
    { title: "Details", icon: <AdminPanelSettingsIcon />, path: "/details" },
    { title: "Logout", icon: <LogoutIcon />, path: "/logout" },
];
const AdminSidebar = ({ handleClose }) => {
    const isSmallScreen = useMediaQuery("(max-width: 1080px)");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const handleNavigate = (item) => {
        navigate(`/admin/restaurant${item.path}`);
        if (item.title === "Logout") {
            dispatch(logout());
            navigate("/");
            fireToast("You have been logged out.", "error");
        }
    };

    return (
        <div>
            <>
                <Drawer
                    variant={isSmallScreen ? "temporary" : "permanent"}
                    open={true}
                    onClose={handleClose}
                    anchor="left"
                    sx={{ position: "sticky" }}
                >
                    <div className="w-[70vw] lg:w-[20vw] h-screen flex flex-col justify-center text-xl space-y-[1.65rem] pt-16">
                        {menu.map((item, index) => {
                            return (
                                <>
                                    <div
                                        onClick={() => handleNavigate(item)}
                                        className={`px-5 flex items-center gap-5 cursor-pointer`}
                                        style={{
                                            color: `${
                                                location.pathname.substring(
                                                    17
                                                ) === item.path ||
                                                (location.pathname.substring(
                                                    17
                                                ) === "/add-menu" &&
                                                    item.path === "/menu")
                                                    ? darkTheme.palette.primary
                                                          .main
                                                    : ""
                                            }`,
                                        }}
                                    >
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </div>
                                    {index !== menu.length - 1 && <Divider />}
                                </>
                            );
                        })}
                    </div>
                </Drawer>
            </>
        </div>
    );
};

export default AdminSidebar;
