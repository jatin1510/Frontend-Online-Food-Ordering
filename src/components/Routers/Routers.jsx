import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminRoute from "./AdminRoute";
import CustomerRoute from "./CustomerRoute";

const Routers = () => {
    return (
        <Routes>
            <Route exact path="/admin/restaurant/*" element={<AdminRoute/>}></Route>
            <Route exact path="/*" element={<CustomerRoute/>}></Route>
        </Routes>
    );
};

export default Routers;