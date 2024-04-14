import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import {
    Button,
    CircularProgress,
    Grid,
    IconButton,
    TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { uploadToCloudinary } from "./Utils/UploadToCloudinary";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { createRestaurant } from "../State/Restaurant/Action";
import { fireToast } from "../Notification/Notification";

const validationSchema = Yup.object({
    name: Yup.string().required("Restaurant name is required"),
    description: Yup.string().required("Description is required"),
    cuisineType: Yup.string().required("Cuisine type is required"),
    openingHours: Yup.string().required("Opening hours is required"),
    streetAddress: Yup.string().required("Street address is required"),
    city: Yup.string().required("City is required"),
    stateProvince: Yup.string().required("State is required"),
    postalCode: Yup.string().required("Postal code is required"),
    country: Yup.string().required("Country is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    mobile: Yup.string()
        .length(10, "Mobile number length should be 10")
        .required("Mobile number is required"),
    twitter: Yup.string()
        .url("Invalid Url")
        .required("Twitter link is required"),
    instagram: Yup.string()
        .url("Invalid Url")
        .required("Instagram link is required"),
    images: Yup.array()
        .min(1, "At least one image is required")
        .max(3, "Maximum 3 images are allowed"),
});

const CreateRestaurantForm = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            cuisineType: "",
            openingHours: "Mon to Sun - 9:00 AM to 9:00 PM",
            // address: {
            streetAddress: "",
            city: "",
            stateProvince: "",
            postalCode: "",
            country: "",
            // },
            // contactInformation: {
            email: "",
            mobile: "",
            twitter: "",
            instagram: "",
            // },
            images: [],
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const data = {
                name: values.name,
                description: values.description,
                cuisineType: values.cuisineType,
                openingHours: values.openingHours,
                address: {
                    streetAddress: values.streetAddress,
                    city: values.city,
                    stateProvince: values.stateProvince,
                    postalCode: values.postalCode,
                    country: values.country,
                },
                contactInformation: {
                    email: values.email,
                    mobile: values.mobile,
                    twitter: values.twitter,
                    instagram: values.instagram,
                },
                images: values.images,
            };
            dispatch(createRestaurant({ jwt, data }));
        },
    });

    // eslint-disable-next-line
    const [uploadingImage, setUploadingImage] = useState(false);
    const handleImageChange = async (event) => {
        if(event.target.files.length + formik.values.images.length > 3) {
            fireToast("Maximum 3 images are allowed", "error");
            return;
        }
        for (let index = 0; index < event.target.files.length; index++) {
            const file = event.target.files[index];
            setUploadingImage(true);
            const image = await uploadToCloudinary(file);
            formik.values.images.push(image);
            setUploadingImage(false);
        }
    };

    const handleRemoveImage = (index) => {
        const images = formik.values.images;
        images.splice(index, 1);
        formik.setFieldValue("images", images);
    };

    return (
        <div className="py-10 px-5 lg:flex items-center justify-center min-h-screen">
            <div className="lg:max-w-4xl">
                <h1 className="font-bold text-2xl text-center pb-5">
                    Add Your Restaurant
                </h1>
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <Grid container spacing={2}>
                        <Grid item xs={12} className="flex flex-wrap gap-5">
                            <input
                                multiple
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
                                    <AddPhotoAlternateIcon />
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
                                label="Restaurant Name"
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
                                id="cuisineType"
                                name="cuisineType"
                                label="Cuisine Type"
                                variant="outlined"
                                onChange={formik.handleChange}
                                value={formik.values.cuisineType}
                                error={
                                    formik.touched.cuisineType &&
                                    Boolean(formik.errors.cuisineType)
                                }
                                helperText={
                                    formik.touched.cuisineType &&
                                    formik.errors.cuisineType
                                }
                            ></TextField>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <TextField
                                fullWidth
                                id="openingHours"
                                name="openingHours"
                                label="Opening Hours"
                                variant="outlined"
                                onChange={formik.handleChange}
                                value={formik.values.openingHours}
                                error={
                                    formik.touched.openingHours &&
                                    Boolean(formik.errors.openingHours)
                                }
                                helperText={
                                    formik.touched.openingHours &&
                                    formik.errors.openingHours
                                }
                            ></TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="streetAddress"
                                name="streetAddress"
                                label="Street Address"
                                variant="outlined"
                                onChange={formik.handleChange}
                                value={formik.values.streetAddress}
                                error={
                                    formik.touched.streetAddress &&
                                    Boolean(formik.errors.streetAddress)
                                }
                                helperText={
                                    formik.touched.streetAddress &&
                                    formik.errors.streetAddress
                                }
                            ></TextField>
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <TextField
                                fullWidth
                                id="city"
                                name="city"
                                label="City"
                                variant="outlined"
                                onChange={formik.handleChange}
                                value={formik.values.city}
                                error={
                                    formik.touched.city &&
                                    Boolean(formik.errors.city)
                                }
                                helperText={
                                    formik.touched.city && formik.errors.city
                                }
                            ></TextField>
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <TextField
                                fullWidth
                                id="stateProvince"
                                name="stateProvince"
                                label="State"
                                variant="outlined"
                                onChange={formik.handleChange}
                                value={formik.values.stateProvince}
                                error={
                                    formik.touched.stateProvince &&
                                    Boolean(formik.errors.stateProvince)
                                }
                                helperText={
                                    formik.touched.stateProvince &&
                                    formik.errors.stateProvince
                                }
                            ></TextField>
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <TextField
                                fullWidth
                                id="country"
                                name="country"
                                label="Country"
                                variant="outlined"
                                onChange={formik.handleChange}
                                value={formik.values.country}
                                error={
                                    formik.touched.country &&
                                    Boolean(formik.errors.country)
                                }
                                helperText={
                                    formik.touched.country &&
                                    formik.errors.country
                                }
                            ></TextField>
                        </Grid>
                        <Grid item xs={12} lg={3}>
                            <TextField
                                fullWidth
                                id="postalCode"
                                name="postalCode"
                                label="Postal Code"
                                variant="outlined"
                                onChange={formik.handleChange}
                                value={formik.values.postalCode}
                                error={
                                    formik.touched.postalCode &&
                                    Boolean(formik.errors.postalCode)
                                }
                                helperText={
                                    formik.touched.postalCode &&
                                    formik.errors.postalCode
                                }
                            ></TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type="url"
                                id="twitter"
                                name="twitter"
                                label="Twitter Link"
                                variant="outlined"
                                onChange={formik.handleChange}
                                value={formik.values.twitter}
                                error={
                                    formik.touched.twitter &&
                                    Boolean(formik.errors.twitter)
                                }
                                helperText={
                                    formik.touched.twitter &&
                                    formik.errors.twitter
                                }
                            ></TextField>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <TextField
                                fullWidth
                                id="mobile"
                                name="mobile"
                                label="Mobile Number"
                                variant="outlined"
                                onChange={formik.handleChange}
                                value={formik.values.mobile}
                                error={
                                    formik.touched.mobile &&
                                    Boolean(formik.errors.mobile)
                                }
                                helperText={
                                    formik.touched.mobile &&
                                    formik.errors.mobile
                                }
                            ></TextField>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <TextField
                                fullWidth
                                id="email"
                                name="email"
                                label="Restaurant Email"
                                variant="outlined"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                error={
                                    formik.touched.email &&
                                    Boolean(formik.errors.email)
                                }
                                helperText={
                                    formik.touched.email && formik.errors.email
                                }
                            ></TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type="url"
                                id="instagram"
                                name="instagram"
                                label="Instagram Link"
                                variant="outlined"
                                onChange={formik.handleChange}
                                value={formik.values.instagram}
                                error={
                                    formik.touched.instagram &&
                                    Boolean(formik.errors.instagram)
                                }
                                helperText={
                                    formik.touched.instagram &&
                                    formik.errors.instagram
                                }
                            ></TextField>
                        </Grid>
                    </Grid>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        sx={{ padding: "10px", fontSize: "1rem" }}
                    >
                        Add Restaurant
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default CreateRestaurantForm;
