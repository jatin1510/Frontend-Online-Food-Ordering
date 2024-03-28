import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

const CreateFoodCategory = () => {
    const [FormData, setFormData] = useState({
        categoryName: "",
        restaurantId: "",
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...FormData,
            [name]: value,
        });
    };
    const handleSubmit = () => {
        console.log(FormData);
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
