import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../../State/Restaurant/Action";

const CreateFoodCategory = ({handleClose}) => {
    const { restaurant } = useSelector((store) => store);
    const dispatch = useDispatch();

    const [FormData, setFormData] = useState({
        categoryName: "",
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
        dispatch(
            createCategory({
                jwt,
                reqData: {
                    name: FormData.categoryName,
                },
            })
        );
        handleClose();
    };
    return (
        <div>
            <div className="p-5">
                <h1 className="text-gray-200 text-center text-xl pb-10">
                    Create Category
                </h1>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        id="categoryName"
                        name="categoryName"
                        label="Category Name"
                        variant="outlined"
                        onChange={handleInputChange}
                        value={FormData.categoryName}
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

export default CreateFoodCategory;
