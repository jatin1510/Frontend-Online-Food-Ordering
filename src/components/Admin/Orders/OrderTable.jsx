import {
    Box,
    Card,
    CardHeader,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import React from "react";
const orders = [1, 1, 1, 1, 1, 1, 1];
const OrderTable = () => {
    return (
        <Box className="py-2">
            <Card>
                <CardHeader title="Orders"></CardHeader>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Image</TableCell>
                                <TableCell>Customer</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Ingredients</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {1}
                                    </TableCell>
                                    <TableCell>Image</TableCell>
                                    <TableCell>
                                        {"customer@gmail.com"}
                                    </TableCell>
                                    <TableCell align="right">{500}</TableCell>
                                    <TableCell>{"Pizza"}</TableCell>
                                    <TableCell>{"Ingredients"}</TableCell>
                                    <TableCell>{"Completed"}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Box>
    );
};

export default OrderTable;
