import React, { useEffect } from "react";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders, updateWebSocketOrder } from "../State/Orders/Action";
import { useSubscription } from "react-stomp-hooks";
import { fireToast } from "../Notification/Notification";

const Orders = () => {
    const { order } = useSelector((store) => store);
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    useSubscription("/topic/reply", (message) => {
        const {id, status} = JSON.parse(message.body);
        const allOrders = order.orders;
        for (let index = 0; index < allOrders.length; index++) {
            const element = allOrders[index];
            if(element.id === id){
                element.orderStatus = status;
                dispatch(updateWebSocketOrder(element));
                fireToast("Order " + id + ": Status Updated", "info");
                break;
            }
        }
    });
    
    useEffect(() => {
        dispatch(getUserOrders(jwt));
    }, []);

    return (
        <div className="flex items-center flex-col">
            <h1 className="text-xl text-center py-7 font-semibold">
                My Orders
            </h1>
            {order.orders.length > 0 && (
                <div className="space-y-5 w-full lg:w-1/2 pb-10">
                    {order.orders
                        .sort(
                            (a, b) =>
                                new Date(b.createdAt).getTime() -
                                new Date(a.createdAt).getTime()
                        )
                        .map((order, index) => (
                            <OrderCard order={order} key={index} />
                        ))}
                </div>
            )}
            {order.orders.length === 0 && (
                <div>You have not ordered anything</div>
            )}
        </div>
    );
};

export default Orders;
