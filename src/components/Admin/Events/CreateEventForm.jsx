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
import { uploadToCloudinary } from "../Utils/UploadToCloudinary";
import * as Yup from "yup";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { fireToast } from "../../Notification/Notification";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
    images: Yup.array().min(1, "Please upload at least one image").required(),
    location: Yup.string().required("Location is required"),
    eventName: Yup.string().required("Event Name is required"),
});

const CreateEventForm = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            images: [],
            location: "",
            eventName: "",
            startDate: new dayjs(),
            endDate: new dayjs(),
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const newStartDate = values.startDate.format("DD-MM-YYYY HH:mm:ss");
            const newEndDate = values.endDate.format("DD-MM-YYYY HH:mm:ss");
            console.log("Form Values: ", values);
            console.log("Start Date: ", newStartDate);
            console.log("End Date: ", newEndDate);
            navigate("/admin/restaurant/events");
            fireToast("Event Created", "success");
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
        <div className="py-10 px-5 lg:flex items-center justify-center">
            <div className="lg:max-w-4xl">
                <h1 className="font-bold text-2xl text-center pb-5">
                    Create Event
                </h1>
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
                                <span className="w-16 h-16 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-600">
                                    <AddPhotoAlternateIcon />
                                </span>
                                {uploadingImage && (
                                    <div className="absolute left-0 right-0 top-0 bottom-0 w-16 h-16 flex justify-center items-center">
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
                                                className="w-16 h-16 object-cover"
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
                                id="location"
                                name="location"
                                label="Location"
                                variant="outlined"
                                onChange={formik.handleChange}
                                value={formik.values.location}
                                error={
                                    formik.touched.location &&
                                    Boolean(formik.errors.location)
                                }
                                helperText={
                                    formik.touched.location &&
                                    formik.errors.location
                                }
                            ></TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="eventName"
                                name="eventName"
                                label="Event Name"
                                variant="outlined"
                                onChange={formik.handleChange}
                                value={formik.values.eventName}
                                error={
                                    formik.touched.eventName &&
                                    Boolean(formik.errors.eventName)
                                }
                                helperText={
                                    formik.touched.eventName &&
                                    formik.errors.eventName
                                }
                            ></TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    renderInput={(props) => (
                                        <TextField {...props} />
                                    )}
                                    label="Start Date and Time"
                                    value={formik.values.startDate}
                                    onChange={(value) => {
                                        formik.setFieldValue(
                                            "startDate",
                                            value
                                        );
                                    }}
                                    className="w-full"
                                    disablePast
                                ></DateTimePicker>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    renderInput={(props) => (
                                        <TextField {...props} />
                                    )}
                                    label="Start Date and Time"
                                    value={formik.values.startDate}
                                    onChange={(value) => {
                                        formik.setFieldValue("endDate", value);
                                    }}
                                    className="w-full"
                                    minDateTime={formik.values.startDate}
                                ></DateTimePicker>
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        sx={{ padding: "10px", fontSize: "1rem" }}
                    >
                        Create
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default CreateEventForm;
