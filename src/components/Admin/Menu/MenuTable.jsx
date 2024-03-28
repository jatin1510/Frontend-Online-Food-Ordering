import {
    Box,
    Card,
    CardHeader,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import React from "react";
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const orders = [1, 1, 1, 1, 1, 1, 1];
const MenuTable = () => {
    const navigate = useNavigate();
    return (
        <Box>
            <Card>
                <CardHeader
                    title="Menu"
                    action={
                        <IconButton onClick={()=>navigate('/admin/restaurant/add-menu')} aria-label="settings">
                            <CreateIcon />
                        </IconButton>
                    }
                />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Ingredients</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="center">
                                    Availability
                                </TableCell>
                                <TableCell align="center">Delete</TableCell>
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
                                    <TableCell>{1}</TableCell>
                                    <TableCell>Image</TableCell>
                                    <TableCell>
                                        {"customer@gmail.com"}
                                    </TableCell>
                                    <TableCell align="right">{500}</TableCell>
                                    <TableCell align="center">
                                        {"Pizza"}
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton>
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Box>
    );
};

export default MenuTable;
