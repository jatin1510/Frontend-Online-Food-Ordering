import {
    Avatar,
    Box,
    Button,
    Card,
    CardHeader,
    Chip,
    IconButton,
    Paper,
    Popover,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import React from "react";
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteMenuItem,
    updateMenuItemAvailability,
} from "../../State/Menu/Action";
import { red } from "@mui/material/colors";
const MenuTable = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const openPop = Boolean(anchorEl);

    const dispatch = useDispatch();
    const { menu } = useSelector((store) => store);
    const navigate = useNavigate();

    const handleUpdateMenuItemStock = (id) => {
        dispatch(
            updateMenuItemAvailability({
                menuItemId: id,
                jwt: localStorage.getItem("jwt"),
            })
        );
    };
    const handleDeleteMenuItem = (id) => {
        dispatch(
            deleteMenuItem({
                menuItemId: id,
                jwt: localStorage.getItem("jwt"),
            })
        );
    };
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
                                    <TableCell>
                                        <Avatar src={item.images[0]}/>
                                    </TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>
                                        <div className="space-x-2 flex flex-wrap">
                                            {item.ingredients.map(
                                                (ingredient) => (
                                                    <Chip
                                                        // color={
                                                        //     ingredient
                                                        //         .inStock
                                                        //         ? "success"
                                                        //         : "error"
                                                        // }
                                                        color="info"
                                                        variant="filled"
                                                        label={ingredient.name}
                                                    />
                                                )
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell align="right">
                                        ₹&nbsp;{item.price}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            sx={{ width: "70%" }}
                                            onClick={() => {
                                                handleUpdateMenuItemStock(
                                                    item.id
                                                );
                                            }}
                                            aria-owns={
                                                openPop
                                                    ? "mouse-over-popover"
                                                    : undefined
                                            }
                                            aria-haspopup="true"
                                            onMouseEnter={handlePopoverOpen}
                                            onMouseLeave={handlePopoverClose}
                                            color={
                                                item.available
                                                    ? "success"
                                                    : "error"
                                            }
                                        >
                                            {item.available
                                                ? "In Stock"
                                                : "Out of Stock"}
                                        </Button>
                                        <Popover
                                            id="mouse-over-popover"
                                            sx={{
                                                pointerEvents: "none",
                                            }}
                                            open={openPop}
                                            anchorEl={anchorEl}
                                            anchorOrigin={{
                                                vertical: "top",
                                                horizontal: "left",
                                            }}
                                            transformOrigin={{
                                                vertical: "bottom",
                                                horizontal: "left",
                                            }}
                                            onClose={handlePopoverClose}
                                            disableRestoreFocus
                                        >
                                            <Typography sx={{ p: 1 }}>
                                                {"Change Availability"}
                                            </Typography>
                                        </Popover>
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            color="primary"
                                            onClick={() => {
                                                handleDeleteMenuItem(item.id);
                                            }}
                                        >
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
