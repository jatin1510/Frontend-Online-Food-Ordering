import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import {
    Box,
    Button,
    Chip,
    CircularProgress,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { uploadToCloudinary } from "../Utils/UploadToCloudinary";
import * as Yup from "yup";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../State/Ingredients/Action";
import { createMenuItem } from "../../State/Menu/Action";
import { fireToast } from "../../Notification/Notification";

const validationSchema = Yup.object({
    name: Yup.string().required("Menu name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number("Price Must be Number").required("Price is required"),
    // foodCategory: {
    category: Yup.number().required("Category is required"),
    // },
    images: Yup.array().min(1, "At least one image is required"),
    isVegetarian: Yup.boolean().required("Vegetarian is required"),
    isSeasonal: Yup.boolean().required("Seasonal is required"),
    ingredients: Yup.array(),
});

const CreateMenuForm = () => {
    const { ingredients, restaurant } = useSelector((store) => store);
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    useEffect(() => {
        dispatch(getIngredients({ id: restaurant.userRestaurant?.id, jwt }));
    }, []);

    const getCategoryById = (id) => {
        const category = restaurant.categories.find(
            (category) => category.id === id
        );
        return { ...category, restaurantId: restaurant.userRestaurant?.id };
    };
    const getIngredientsObjects = (ingredientArray) => {
        const answer = [];
        for (let i of ingredients.ingredients) {
            let flag = false;
            for (let j of ingredientArray) {
                if (i.name === j) {
                    flag = true;
                    break;
                }
            }
            if (flag === true) {
                answer.push(i);
            }
        }
        return answer;
    };
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            price: "",
            // foodCategory: {
            category: "",
            // },
            images: [],
            isVegetarian: "",
            isSeasonal: "",
            ingredients: [],
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const menu = {
                name: values.name,
                description: values.description,
                price: values.price,
                foodCategory: getCategoryById(values.category),
                images: values.images,
                restaurantId: restaurant.userRestaurant?.id,
                vegetarian: values.isVegetarian,
                seasonal: values.isSeasonal,
                ingredients: getIngredientsObjects(values.ingredients),
            };
            // console.log("Values: ", values);
            // console.log("Created data: ", menu);
            dispatch(createMenuItem({ menu, jwt }));
            navigate("/admin/restaurant/menu");
            fireToast("Menu Item Created Successfully", "success");
        },
    });

    // eslint-disable-next-line
    const [uploadingImage, setUploadingImage] = useState(false);
    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        setUploadingImage(true);
        const image = await uploadToCloudinary(file);
        formik.setFieldValue("images", [...formik.values.images, image]);
        setUploadingImage(false);
    };

    const handleRemoveImage = (index) => {
        const images = formik.values.images;
        images.splice(index, 1);
        formik.setFieldValue("images", images);
    };

    return (
        <div className="py-16 px-5 lg:flex items-center justify-center">
            <div className="lg:max-w-4xl">
                <div className="flex flex-row justify-between items-center pb-10">
                    <IconButton sx={{ visibility: "hidden" }}>
                        <CloseIcon />
                    </IconButton>
                    <h1 className="font-bold text-2xl text-center">
                        Add Menu Item
                    </h1>
                    <IconButton
                        onClick={() => navigate("/admin/restaurant/menu")}
                    >
                        <CloseIcon sx={{ fontSize: "1.5rem" }} />
                    </IconButton>
                </div>
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <Grid container spacing={2}>
                        <Grid item xs={12} className="flex flex-wrap gap-5">
                            <input
                                type="file"
                                accept="image/*"
                                id="fileInput"
                                style={{ display: "none" }}
                                onChange={handleImageChange}
                                error={Boolean(formik.errors.images)}
                                helperText={formik.errors.images}
                            />
                            <label htmlFor="fileInput" className="relative">
                                <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-600">
                                    <AddPhotoAlternateIcon  />
                                </span>
                                {uploadingImage && (
                                    <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center">
                                        <CircularProgress />
                                    </div>
                                )}
                            </label>
                            {formik.touched.images && formik.errors.images && (
                                <p className="text-red-500 text-sm">
                                    {formik.errors.images}
                                </p>
                            )}
                            <div className="flex flex-wrap gap-2">
                                {formik.values.images.map((image, index) => {
                                    return (
                                        <div key={index} className="relative">
                                            <img
                                                className="w-24 h-24 object-cover"
                                                src={image}
                                                alt=""
                                            />
                                            <IconButton
                                                size="small"
                                                sx={{
                                                    position: "absolute",
                                                    top: 0,
                                                    right: 0,
                                                    outline: "none",
                                                }}
                                                onClick={() => {
                                                    handleRemoveImage(index);
                                                }}
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                        </div>
                                    );
                                })}
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="name"
                                name="name"
                                label="Item Name"
                                variant="outlined"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                error={
                                    formik.touched.name &&
                                    Boolean(formik.errors.name)
                                }
                                helperText={
                                    formik.touched.name && formik.errors.name
                                }
                            ></TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="description"
                                name="description"
                                label="Description"
                                variant="outlined"
                                onChange={formik.handleChange}
                                value={formik.values.description}
                                error={
                                    formik.touched.description &&
                                    Boolean(formik.errors.description)
                                }
                                helperText={
                                    formik.touched.description &&
                                    formik.errors.description
                                }
                            ></TextField>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <TextField
                                fullWidth
                                id="price"
                                name="price"
                                label="Price"
                                variant="outlined"
                                onChange={formik.handleChange}
                                value={formik.values.price}
                                error={
                                    formik.touched.price &&
                                    Boolean(formik.errors.price)
                                }
                                helperText={
                                    formik.touched.price && formik.errors.price
                                }
                            ></TextField>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <FormControl fullWidth>
                                <InputLabel
                                    id="demo-simple-select-label"
                                    error={
                                        formik.touched.category &&
                                        Boolean(formik.errors.category)
                                    }
                                >
                                    Category
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={formik.values.category}
                                    label="Category"
                                    onChange={formik.handleChange}
                                    name="category"
                                    error={
                                        formik.touched.category &&
                                        Boolean(formik.errors.category)
                                    }
                                >
                                    {restaurant.categories.map((category) => {
                                        return (
                                            <MenuItem
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                                {formik.touched.category &&
                                    formik.errors.category && (
                                        <FormHelperText
                                            sx={{ color: red[500] }}
                                        >
                                            {formik.errors.category}
                                        </FormHelperText>
                                    )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel
                                    id="demo-multiple-chip-label"
                                    error={
                                        formik.touched.ingredients &&
                                        Boolean(formik.errors.ingredients)
                                    }
                                >
                                    Ingredients
                                </InputLabel>
                                <Select
                                    name="ingredients"
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    value={formik.values.ingredients}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.ingredients &&
                                        Boolean(formik.errors.ingredients)
                                    }
                                    input={
                                        <OutlinedInput
                                            id="select-multiple-chip"
                                            label="ingredients"
                                        />
                                    }
                                    renderValue={(selected) => (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexWrap: "wrap",
                                                gap: 0.5,
                                            }}
                                        >
                                            {selected.map((value) => (
                                                <Chip
                                                    key={value}
                                                    label={value}
                                                />
                                            ))}
                                        </Box>
                                    )}
                                >
                                    {ingredients.ingredients.map(
                                        (ingredient) => {
                                            return (
                                                <MenuItem
                                                    key={ingredient.id}
                                                    value={ingredient.name}
                                                >
                                                    {ingredient.name}
                                                </MenuItem>
                                            );
                                        }
                                    )}
                                </Select>
                                {formik.touched.ingredients &&
                                    formik.errors.ingredients && (
                                        <FormHelperText
                                            sx={{ color: red[500] }}
                                        >
                                            {formik.errors.ingredients}
                                        </FormHelperText>
                                    )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <FormControl fullWidth>
                                <InputLabel
                                    id="demo-simple-select-label"
                                    error={
                                        formik.touched.isSeasonal &&
                                        Boolean(formik.errors.isSeasonal)
                                    }
                                >
                                    Seasonal
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={formik.values.isSeasonal}
                                    label="Seasonal"
                                    onChange={formik.handleChange}
                                    name="isSeasonal"
                                    error={
                                        formik.touched.isSeasonal &&
                                        Boolean(formik.errors.isSeasonal)
                                    }
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                                {formik.touched.isSeasonal &&
                                    formik.errors.isSeasonal && (
                                        <FormHelperText
                                            sx={{ color: red[500] }}
                                        >
                                            {formik.errors.isSeasonal}
                                        </FormHelperText>
                                    )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <FormControl fullWidth>
                                <InputLabel
                                    id="demo-simple-select-label"
                                    error={
                                        formik.touched.isVegetarian &&
                                        Boolean(formik.errors.isVegetarian)
                                    }
                                >
                                    Vegetarian
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={formik.values.isVegetarian}
                                    label="Vegetarian"
                                    onChange={formik.handleChange}
                                    name="isVegetarian"
                                    error={
                                        formik.touched.isVegetarian &&
                                        Boolean(formik.errors.isVegetarian)
                                    }
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                                {formik.touched.isVegetarian &&
                                    formik.errors.isVegetarian && (
                                        <FormHelperText
                                            sx={{ color: red[500] }}
                                        >
                                            {formik.errors.isVegetarian}
                                        </FormHelperText>
                                    )}
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        sx={{ padding: "10px", fontSize: "1rem" }}
                    >
                        Add Menu Item
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default CreateMenuForm;
