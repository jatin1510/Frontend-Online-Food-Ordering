import {
    Box,
    Card,
    CardHeader,
    IconButton,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import React, { useEffect, useState } from "react";
import CreateIngredientCategoryForm from "./CreateIngredientCategoryForm";
import { useDispatch, useSelector } from "react-redux";
import { getIngredientCategories } from "../../State/Ingredients/Action";

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

const IngredientCategoryTable = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { ingredients, restaurant } = useSelector((store) => store);
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    useEffect(() => {
        dispatch(
            getIngredientCategories({
                id: restaurant.userRestaurant?.id,
                jwt,
            })
        );
    }, []);
    return (
        <Box>
            <Card>
                <CardHeader
                    title="Ingredient Category"
                    action={
                        <IconButton onClick={handleOpen} aria-label="settings">
                            <CreateIcon />
                        </IconButton>
                    }
                />
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell align="right">Name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ingredients.categories.map((item) => (
                                <TableRow
                                    key={item.id}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell align="right">
                                        {item.name}
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
                    <CreateIngredientCategoryForm handleClose={handleClose} />
                </Box>
            </Modal>
        </Box>
    );
};

export default IngredientCategoryTable;
