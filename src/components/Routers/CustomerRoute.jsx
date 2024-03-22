import React from "react";
import Navbar from "../Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import RestaurantDetail from "../Restaurant/RestaurantDetail";
import Cart from "../Cart/Cart";
import Profile from "../Profile/Profile";
import Auth from "../Auth/Auth";

const CustomerRoute = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />}></Route>
                <Route
                    exact
                    path="/account/register"
                    element={<Home />}
                ></Route>
                <Route
                    exact
                    path="/account/login"
                    element={<Home />}
                ></Route>
                <Route
                    exact
                    path="/restaurant/:city/:title/:id"
                    element={<RestaurantDetail />}
                ></Route>
                <Route exact path="/cart" element={<Cart />}></Route>
                <Route exact path="/profile/*" element={<Profile />}></Route>
            </Routes>
            <Auth/>
        </div>
    );
};

export default CustomerRoute;