import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createIngredientCategory } from "../../State/Ingredients/Action";
import { fireToast } from "../../Notification/Notification";

const CreateIngredientCategory = ({ handleClose }) => {
    const dispatch = useDispatch();
    const { restaurant } = useSelector((store) => store);
    const [FormData, setFormData] = useState({
        name: "",
        restaurantId: "",
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...FormData,
            [name]: value,
        });
    };
    const jwt = localStorage.getItem("jwt");
    const handleSubmit = (e) => {
        e.preventDefault();
        FormData.restaurantId = restaurant.userRestaurant?.id;
        console.log(FormData);
        dispatch(createIngredientCategory({ jwt, data: FormData }));
        handleClose();
        fireToast("Ingredient Category Created", "success");
    };
    return (
        <div>
            <div className="p-5">
                <h1 className="text-center text-xl pb-10">
                    Create Ingredient Category
                </h1>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <TextField
                        required
                        fullWidth
                        id="name"
                        name="name"
                        label="Ingredient Category Name"
                        variant="outlined"
                        onChange={handleInputChange}
                        value={FormData.name}
                    ></TextField>
                    <Button
                        sx={{ p: 1.5 }}
                        type="submit"
                        variant="contained"
                        fullWidth
                    >
                        Create
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default CreateIngredientCategory;
