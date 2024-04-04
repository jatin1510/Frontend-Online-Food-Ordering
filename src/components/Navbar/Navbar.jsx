import { Avatar, Badge, IconButton } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { pink } from "@mui/material/colors";
import "./Navbar.css";
import { Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
    const { auth, cart } = useSelector((store) => store);
    const navigate = useNavigate();
    const handleAvatarClick = () => {
        if (auth.user?.role === "ROLE_CUSTOMER") {
            navigate("/profile");
        } else {
            navigate("/admin/restaurant/");
        }
    };

    return (
        <div className="px-5 sticky top-0 z-50 py-[.8rem] bg-[#e91e63] lg:px-20 flex justify-between">
            <div className="lg:mr-10 cursor-pointer flex items-center space-x-4">
                <li
                    onClick={() => {
                        navigate("/");
                    }}
                    className="logo font-semibold text-white text-2xl"
                >
                    Hungrio
                </li>
            </div>
            <div className="flex items-center space-x-2 lg:space-x-10">
                <div className="">
                    <IconButton>
                        <SearchIcon
                            className="text-white"
                            sx={{ fontSize: "1.5rem" }}
                        />
                    </IconButton>
                </div>
                <div className="">
                    {auth.user ? (
                        <Avatar
                            onClick={handleAvatarClick}
                            sx={{
                                bgcolor: "white",
                                color: pink.A400,
                                cursor: "pointer",
                            }}
                        >
                            {auth.user?.fullName[0].toUpperCase()}
                        </Avatar>
                    ) : (
                        <IconButton
                            onClick={() => {
                                navigate("/account/login");
                            }}
                        >
                            <Person className="text-white" />
                        </IconButton>
                    )}
                </div>
                <div className="">
                    <IconButton
                        onClick={() => {
                            auth.user
                                ? navigate("/cart")
                                : navigate("/account/login");
                        }}
                    >
                        <Badge
                            sx={{
                                "& .MuiBadge-badge": {
                                    color: "white",
                                    backgroundColor: "black",
                                },
                            }}
                            badgeContent={cart?.cartItems.length}
                        >
                            <ShoppingCartIcon
                                className="text-white"
                                sx={{ fontSize: "1.5rem" }}
                            />
                        </Badge>
                    </IconButton>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
