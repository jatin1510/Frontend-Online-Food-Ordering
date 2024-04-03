import { Card, Chip, Divider, Paper } from "@mui/material";
import React from "react";

const colorObject = {
    PENDING: "error",
    OUT_FOR_DELIVERY: "warning",
    DELIVERED: "success",
    COMPLETED: "success",
};

const OrderCard = ({ item, order }) => {
    return (
        <Card className="p-5">
            <div className="flex flex-row justify-between pb-3">
                <div className="flex flex-row space-x-2">
                    <img
                        src={order.items[0].food.restaurant.images[0]}
                        alt=""
                        className="h-12 w-12 rounded-lg"
                    />
                    <div className="flex flex-col">
                        <span className="font-bold">
                            {order.items[0].food.restaurant.name}
                        </span>
                        <span className="text-sm">
                            {
                                order.items[0].food.restaurant.address
                                    .streetAddress
                            }
                            ,&nbsp;{order.items[0].food.restaurant.address.city}
                        </span>
                    </div>
                </div>
                <div className="flex flex-row justify-center items-center">
                    <Chip
                        label={order.orderStatus}
                        variant="filled"
                        color={colorObject[order.orderStatus]}
                    ></Chip>
                </div>
            </div>
            <Divider />
            <div className="py-3">
                <div>
                    <span className="font-sans font-semibold">
                        Order Id:&nbsp;
                    </span>
                    <span>{order.id}</span>
                </div>
                <div>
                    <span className="font-sans font-semibold">
                        Ordered On:&nbsp;
                    </span>
                    <span>{new Date(order.createdAt).toDateString()}</span>
                </div>
                <div>
                    <span className="font-sans font-semibold">
                        Total amount:&nbsp;
                    </span>
                    <span>{order.totalPrice}</span>
                </div>
                <div>
                    <span className="font-sans font-semibold">
                        Deliver To:&nbsp;
                    </span>
                    <span>
                        {order.deliveryAddress.streetAddress},&nbsp;
                        {order.deliveryAddress.city},&nbsp;
                        {order.deliveryAddress.stateProvince}
                    </span>
                </div>
            </div>
            <Divider />
            <div className="py-2">
                <div className="flex items-center justify-center font-sans font-semibold pb-2">
                    Items
                </div>
                <div className="flex flex-col gap-2">
                    {order.items.map((item, index) => (
                        <Paper elevation={2} className="p-3">
                            <div className="flex flex-row justify-between">
                                <div className="pl-2">
                                    <div>
                                        <span className="font-sans font-semibold">
                                            Name:&nbsp;
                                        </span>
                                        <span>{item.food.name}</span>
                                    </div>
                                    <div>
                                        <span className="font-sans font-semibold">
                                            Quantity:&nbsp;
                                        </span>
                                        <span>{item.quantity}</span>
                                    </div>
                                    <div>
                                        <span className="font-sans font-semibold">
                                            Price:&nbsp;
                                        </span>
                                        <span>{item.totalPrice}</span>
                                    </div>
                                    <div className="space-x-1 py-1">
                                        {item.ingredients.map((ingredient) => {
                                            return (
                                                <Chip
                                                    size="small"
                                                    variant="outlined"
                                                    label={ingredient}
                                                ></Chip>
                                            );
                                        })}
                                    </div>
                                </div>
                                <img
                                    src={item.food.images[0]}
                                    alt=""
                                    className="h-20 w-20 rounded-xl"
                                />
                            </div>
                        </Paper>
                    ))}
                </div>
            </div>
        </Card>
    );
};

export default OrderCard;
