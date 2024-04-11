import {
    Avatar,
    AvatarGroup,
    Box,
    Button,
    Card,
    CardHeader,
    Menu,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getRestaurantOrders,
    updateOrderStatus,
} from "../../State/Restaurant Order/Action";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";

const colors = {
    PENDING: "red",
    OUT_FOR_DELIVERY: "#ff9800",
    DELIVERED: "green",
    COMPLETED: "#03a9f4",
};
const orderStatus = [
    { label: "Out for Delivery", value: "OUT_FOR_DELIVERY" },
    { label: "Delivered", value: "DELIVERED" },
    { label: "Pending", value: "PENDING" },
    { label: "Completed", value: "COMPLETED" },
];

const OrderTable = ({ filterValue = "all" }) => {
    const dispatch = useDispatch();
    const { restaurant, restaurantOrder } = useSelector((store) => store);

    useEffect(() => {
        let filter = filterValue === "all" ? "" : filterValue;
        dispatch(
            getRestaurantOrders({
                jwt: localStorage.getItem("jwt"),
                restaurantId: restaurant.userRestaurant?.id,
                orderStatus: filter.toUpperCase(),
            })
        );
    }, []);

    // updates
    const [id, setId] = useState(null);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event, id) => {
        setAnchorEl(event.currentTarget);
        setId(id);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleUpdateOrderStatus = (value) => {
        console.log("Order id: ", id);
        console.log(value);
        dispatch(
            updateOrderStatus({
                jwt: localStorage.getItem("jwt"),
                orderId: id,
                orderStatus: value,
            })
        );
        handleClose();
    };

    console.log("filterValue: ", filterValue);
    return (
        <Box>
            <Card>
                <CardHeader title="Orders"></CardHeader>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell align="center">Image</TableCell>
                                <TableCell>Customer</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell>Items</TableCell>
                                <TableCell>Status</TableCell>
                                {filterValue === "all" && <TableCell>Update</TableCell>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {restaurantOrder.orders.map((item, index) => {
                                return (
                                    <TableRow
                                        key={item.id}
                                        sx={{
                                            "&:last-child td, &:last-child th":
                                                {
                                                    border: 0,
                                                },
                                        }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {item.id}
                                        </TableCell>
                                        <TableCell align="center">
                                            <AvatarGroup max={3}>
                                                {item.items.map((orderItem) => {
                                                    return (
                                                        <Avatar
                                                            src={
                                                                orderItem.food
                                                                    .images[0]
                                                            }
                                                        />
                                                    );
                                                })}
                                            </AvatarGroup>
                                        </TableCell>
                                        <TableCell>
                                            {item.customer?.email}
                                        </TableCell>
                                        <TableCell align="right">
                                            {item.totalPrice}
                                        </TableCell>
                                        <TableCell>
                                            <SimpleTreeView>
                                                {item.items.map((orderItem) => {
                                                    return (
                                                        <TreeItem
                                                            itemId={
                                                                orderItem.id
                                                            }
                                                            label={
                                                                orderItem.food
                                                                    .name
                                                            }
                                                        >
                                                            {orderItem.ingredients.map(
                                                                (
                                                                    ingredient
                                                                ) => {
                                                                    return (
                                                                        <TreeItem
                                                                            sx={{
                                                                                "&:hover":
                                                                                    {
                                                                                        background:
                                                                                            "none",
                                                                                    },
                                                                            }}
                                                                            itemId={
                                                                                ingredient
                                                                            }
                                                                            label={
                                                                                "- " +
                                                                                ingredient
                                                                            }
                                                                        />
                                                                    );
                                                                }
                                                            )}
                                                        </TreeItem>
                                                    );
                                                })}
                                            </SimpleTreeView>
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                color: colors[item.orderStatus],
                                            }}
                                        >
                                            {item.orderStatus}
                                        </TableCell>
                                        {filterValue === "all" && <TableCell>
                                            <Button
                                                id="basic-button"
                                                aria-controls={
                                                    open
                                                        ? "basic-menu"
                                                        : undefined
                                                }
                                                aria-haspopup="true"
                                                aria-expanded={
                                                    open ? "true" : undefined
                                                }
                                                onClick={(e) =>
                                                    handleClick(e, item.id)
                                                }
                                                color="primary"
                                            >
                                                Update
                                            </Button>
                                            <Menu
                                                id="basic-menu"
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                                MenuListProps={{
                                                    "aria-labelledby":
                                                        "basic-button",
                                                }}
                                            >
                                                {orderStatus.map((status) => {
                                                    return (
                                                        <MenuItem
                                                            onClick={() =>
                                                                handleUpdateOrderStatus(
                                                                    status.value
                                                                )
                                                            }
                                                        >
                                                            {status.label}
                                                        </MenuItem>
                                                    );
                                                })}
                                            </Menu>
                                        </TableCell>}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Box>
    );
};

export default OrderTable;
