import React from "react";
import Navbar from "../Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import RestaurantDetail from "../Restaurant/RestaurantDetail";
import Cart from "../Cart/Cart";
import Profile from "../Profile/Profile";
import Auth from "../Auth/Auth";
import PaymentSuccess from "../Payment/PaymentSuccess";
import PaymentFailure from "../Payment/PaymentFailure";
import ResetPassword from "../Auth/ResetPassword";
import Search from "../Search/Search";

const CustomerRoute = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />}></Route>
                <Route exact path="/search" element={<Search />}></Route>
                <Route
                    exact
                    path="/account/register"
                    element={<Home />}
                ></Route>
                <Route exact path="/account/login" element={<Home />}></Route>
                <Route
                    exact
                    path="/account/login/forgotPassword"
                    element={<Home />}
                ></Route>
                <Route
                    exact
                    path="/reset-password"
                    element={<ResetPassword />}
                />
                <Route
                    exact
                    path="/restaurant/:city/:title/:id"
                    element={<RestaurantDetail />}
                ></Route>
                <Route exact path="/cart" element={<Cart />}></Route>
                <Route exact path="/profile/*" element={<Profile />}></Route>
                <Route
                    exact
                    path="/payment/success/:id"
                    element={<PaymentSuccess />}
                ></Route>
                <Route
                    exact
                    path="/payment/failure"
                    element={<PaymentFailure />}
                ></Route>
            </Routes>
            <Auth />
        </div>
    );
};

export default CustomerRoute;
