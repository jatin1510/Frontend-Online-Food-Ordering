import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import React, { useState } from "react";

const CreateIngredientItem = () => {
    const [FormData, setFormData] = useState({
        name: "",
        ingredientCategoryId: "",
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...FormData,
            [name]: value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(FormData);
    };

    return (
        <div>
            <div className="p-5">
                <h1 className="text-gray-200 text-center text-xl pb-10">
                    Create Ingredient Item
                </h1>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Item name"
                        variant="outlined"
                        onChange={handleInputChange}
                        value={FormData.name}
                    ></TextField>
                    <FormControl fullWidth>
                        <InputLabel
                            id="demo-simple-select-label"
                            // error={
                            //     formik.touched.category &&
                            //     Boolean(formik.errors.category)
                            // }
                        >
                            Category
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={FormData.ingredientCategoryId}
                            label="Category"
                            onChange={handleInputChange}
                            name="ingredientCategoryId"
                            // error={
                            //     formik.touched.category &&
                            //     Boolean(formik.errors.category)
                            // }
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        {/* {formik.touched.category && formik.errors.category && (
                            <FormHelperText sx={{ color: red[500] }}>
                                {formik.errors.category}
                            </FormHelperText>
                        )} */}
                    </FormControl>
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

export default CreateIngredientItem;
