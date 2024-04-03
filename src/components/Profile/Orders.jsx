import React, { useEffect } from "react";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../State/Orders/Action";

const Orders = () => {
    const { order } = useSelector((store) => store);
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    useEffect(() => {
        dispatch(getUserOrders(jwt));
    }, []);

    return (
        <div className="flex items-center flex-col">
            <h1 className="text-xl text-center py-7 font-semibold">
                My Orders
            </h1>
            <div className="space-y-5 w-full lg:w-1/2">
                {order.orders.map((order, index) => (
                    <OrderCard order={order} key={index}/>
                ))}
            </div>
        </div>
    );
};

export default Orders;
