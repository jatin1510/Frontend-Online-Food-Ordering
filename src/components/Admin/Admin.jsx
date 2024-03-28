import React, { useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Orders from "./Orders/Orders";
import Menu from "./Menu/Menu";
import FoodCategory from "./Food Category/FoodCategory";
import Ingredients from "./Ingredients/Ingredients";
import Events from "./Events/Events";
import RestaurantDetails from "./RestaurantDetails";
import CreateMenuForm from "./Menu/CreateMenuForm";
import { useDispatch, useSelector } from "react-redux";
import {
    getRestaurantById,
    getRestaurantCategories,
} from "../State/Restaurant/Action";
import { getMenuItemsByRestaurantId } from "../State/Menu/Action";
import { getRestaurantOrders } from "../State/Restaurant Order/Action";
// import CreateFoodCategory from "./Food Category/CreateFoodCategory";

const Admin = () => {
    const dispatch = useDispatch();
    const { restaurant } = useSelector((store) => store);
    const jwt = localStorage.getItem("jwt");
    useEffect(() => {
        dispatch(
            getRestaurantCategories({
                jwt,
                restaurantId: restaurant.userRestaurant?.id,
            })
        );
        dispatch(
            getMenuItemsByRestaurantId({
                restaurantId: restaurant.userRestaurant?.id,
                vegetarian: false,
                nonVegetarian: false,
                seasonal: false,
                foodCategory: "",
                jwt,
            })
        );
        dispatch(
            getRestaurantOrders({
                jwt,
                restaurantId: restaurant.userRestaurant?.id,
                // orderStatus: "COMPLETED",
            })
        );
    }, []);

    const handleClose = () => {};
    return (
        <div>
            <div className="lg:flex justify-between">
                <div>
                    <AdminSidebar handleClose={handleClose} />
                </div>
                <div className="lg:w-[80%]">
                    <Routes>
                        <Route exact path="/" element={<Dashboard />}></Route>
                        <Route
                            exact
                            path="/orders"
                            element={<Orders />}
                        ></Route>
                        <Route exact path="/menu" element={<Menu />}></Route>
                        <Route
                            exact
                            path="/category"
                            element={<FoodCategory />}
                        ></Route>
                        <Route
                            exact
                            path="/ingredients"
                            element={<Ingredients />}
                        ></Route>
                        <Route
                            exact
                            path="/events"
                            element={<Events />}
                        ></Route>
                        <Route
                            exact
                            path="/details"
                            element={<RestaurantDetails />}
                        ></Route>
                        <Route
                            exact
                            path="/add-menu"
                            element={<CreateMenuForm />}
                        ></Route>
                        {/* <Route exact path="/add-food-category" element={<CreateFoodCategory />}></Route> */}
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Admin;
