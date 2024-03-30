import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateRestaurantForm from "../Admin/CreateRestaurantForm";
import Admin from "../Admin/Admin";
import { useSelector } from "react-redux";
import NavbarAdmin from "../Navbar/NavbarAdmin";

const AdminRoute = () => {
    const { restaurant } = useSelector((store) => store);
    return (
        <div>
            <NavbarAdmin />
            <Routes>
                <Route
                    exact
                    path="/*"
                    element={!restaurant.userRestaurant ? <CreateRestaurantForm /> : <Admin />}
                ></Route>
            </Routes>
        </div>
    );
};

export default AdminRoute;
