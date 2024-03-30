import {
    Card,
    Typography,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import OrderTable from "./OrderTable";
import { getRestaurantOrders } from "../../State/Restaurant Order/Action";
import { useDispatch, useSelector } from "react-redux";
const orderStatus = [
    { label: "All", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Completed", value: "completed" },
    { label: "Out for Delivery", value: "outForDelivery" },
    { label: "Delivered", value: "delivered" },
];
// TODO: If i have all the orders, why should i request backend for each filter?

const Orders = () => {
    var [filterValue, setFilterValue] = useState("");
    const handleChangeFilter = (e, value) => {
        setFilterValue(value);
        console.log(filterValue);
    };

    const dispatch = useDispatch();
    const { restaurant, restaurantOrder } = useSelector((store) => store);
    useEffect(() => {
        filterValue = filterValue === "all" ? "" : filterValue;
        dispatch(
            getRestaurantOrders({
                jwt: localStorage.getItem("jwt"),
                restaurantId: restaurant.userRestaurant?.id,
                orderStatus: filterValue.toUpperCase(),
            })
        );
    }, [filterValue]);

    return (
        <div className="px-2 py-2 -z-10">
            <Card className="p-5">
                <Typography sx={{ paddingBottom: "1rem" }} variant="h5">
                    Order Status
                </Typography>
                <FormControl>
                    <RadioGroup
                        row
                        name="category"
                        value={filterValue || "all"}
                        onChange={handleChangeFilter}
                    >
                        {orderStatus.map((item, index) => {
                            return (
                                <FormControlLabel
                                    key={index}
                                    value={item.value}
                                    control={<Radio />}
                                    label={item.label}
                                />
                            );
                        })}
                    </RadioGroup>
                </FormControl>
            </Card>
            <div className="py-2">
                <OrderTable />
            </div>
        </div>
    );
};

export default Orders;
