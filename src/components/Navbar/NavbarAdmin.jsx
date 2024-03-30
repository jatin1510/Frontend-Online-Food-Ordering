import { Avatar, Badge, IconButton } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { pink } from "@mui/material/colors";
import "./Navbar.css";
import { Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const NavbarAdmin = () => {
    const { auth, restaurant } = useSelector((store) => store);
    const navigate = useNavigate();
    const handleAvatarClick = () => {
        if (auth.user?.role === "ROLE_CUSTOMER") {
            navigate("/profile");
        } else {
            navigate("/admin/restaurant");
        }
    };

    return (
        <div className="px-5 sticky top-0 z-50 py-[.8rem] bg-[#e91e63] lg:px-20 flex justify-between">
            <div className="flex items-center space-x-4"></div>
            <div className="flex items-center space-x-4">
                <li className="logo font-semibold text-white text-2xl">
                    Admin Panel
                </li>
            </div>

            <div className="flex items-center space-x-2 lg:space-x-10"></div>
        </div>
    );
};

export default NavbarAdmin;
