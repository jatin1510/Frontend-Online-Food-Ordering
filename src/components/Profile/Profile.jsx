import React, { useState } from "react";
import ProfileNavigation from "./ProfileNavigation";
import { Route, Routes } from "react-router-dom";
import UserProfile from "./UserProfile";
import Orders from "./Orders";
import Favorites from "./Favorites";
import Address from "./Address";
import Payments from "./Payments"
import Notifications from "./Notifications"
import Events from "./Events"

const Profile = () => {
    const [openSideBar, setOpenSideBar] = useState(true);
    return (
        <div className="lg:flex justify-between">
            <div className="sticky h-[80vh] lg:w-[20%]">
                <ProfileNavigation
                    open={openSideBar}
                    setOpenSideBar={setOpenSideBar}
                />
            </div>
            <div className="lg:w-[80%]">
                <Routes>
                    <Route exact path="" element={<UserProfile />}></Route>
                    <Route exact path="/orders" element={<Orders />}></Route>
                    <Route
                        exact
                        path="/favorites"
                        element={<Favorites />}
                    ></Route>
                    <Route exact path="/address" element={<Address />}></Route>
                    <Route
                        exact
                        path="/payments"
                        element={<Payments />}
                    ></Route>
                    <Route
                        exact
                        path="/notifications"
                        element={<Notifications />}
                    ></Route>
                    <Route exact path="/events" element={<Events />}></Route>
                </Routes>
            </div>
        </div>
    );
};

export default Profile;
