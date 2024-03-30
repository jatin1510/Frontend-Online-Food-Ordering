import {
    Box,
    Button,
    Card,
    CardHeader,
    IconButton,
    Modal,
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
import React, { useEffect, useState } from "react";
import CreateIngredientItemForm from "./CreateIngredientItemForm";
import { useDispatch, useSelector } from "react-redux";
import {
    getIngredients,
    updateStockOfIngredient,
} from "../../State/Ingredients/Action";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

const IngredientTable = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const openPop = Boolean(anchorEl);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { ingredients, restaurant } = useSelector((store) => store);
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    useEffect(() => {
        dispatch(getIngredients({ id: restaurant.userRestaurant?.id, jwt }));
    }, []);

    const handleUpdateStock = (id) => {
        dispatch(updateStockOfIngredient({ id, jwt }));
    };
    return (
        <Box>
            <Card>
                <CardHeader
                    title="Ingredient Item"
                    action={
                        <IconButton onClick={handleOpen} aria-label="settings">
                            <CreateIcon />
                        </IconButton>
                    }
                />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell align="right">
                                    Item Stock Availability
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ingredients.ingredients.map((item) => (
                                <TableRow
                                    key={item.id}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell sx={{ width: "30%" }}>{item.category.name}</TableCell>
                                    <TableCell align="right">
                                        <Button
                                            sx={{ width: "60%" }}
                                            onClick={() => {
                                                handleUpdateStock(item.id);
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
                                                item.inStock
                                                    ? "success"
                                                    : "error"
                                            }
                                        >
                                            {item.inStock
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
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CreateIngredientItemForm handleClose={handleClose} />
                </Box>
            </Modal>
        </Box>
    );
};

export default IngredientTable;
