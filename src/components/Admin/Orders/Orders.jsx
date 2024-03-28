import {
    Card,
    Typography,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@mui/material";
import React, { useState } from "react";
import OrderTable from "./OrderTable";
const orderStatus = [
    { label: "All", value: "all" },
    { label: "Completed", value: "completed" },
    { label: "Pending", value: "pending" },
];

const Orders = () => {
    const [filterValue, setFilterValue] = useState();
    const handleChangeFilter = (e, value) => {
        setFilterValue(value);
        console.log(filterValue);
    };

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
                                    sx={{ color: "gray" }}
                                />
                            );
                        })}
                    </RadioGroup>
                </FormControl>
            </Card>
            <OrderTable/>
        </div>
    );
};

export default Orders;
