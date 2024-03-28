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
import { useSelector } from "react-redux";
const orders = [1, 1, 1, 1, 1, 1, 1];
const MenuTable = () => {
    const navigate = useNavigate();
    const { menu } = useSelector((store) => store);
    return (
        <Box>
            <Card>
                <CardHeader
                    title="Menu"
                    action={
                        <IconButton
                            onClick={() =>
                                navigate("/admin/restaurant/add-menu")
                            }
                            aria-label="settings"
                        >
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
                            {menu.menuItems.map((item) => (
                                <TableRow
                                    key={item.id}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell><img style={{height: '70px', width: '70px', borderRadius: "2rem"}} src={item.images[0]}></img></TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>
                                        {"customer@gmail.com"}
                                    </TableCell>
                                    <TableCell align="right">{item.price}</TableCell>
                                    <TableCell align="center">
                                        {item.available ? "Yes" : "No"}
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
