import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
    Typography,
    Button,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../State/Authentication/Action";
import CloseIcon from "@mui/icons-material/Close";

const initialValues = {
    fullName: "",
    email: "",
    password: "",
    role: "ROLE_CUSTOMER",
};

const validationSchema = new Yup.ObjectSchema({
    email: Yup.string()
        .email()
        .matches(
            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
            "email must be a valid email"
        )
        .required("Email Address is a required field"),
    password: Yup.string().required("Password is a required field"),
    fullName: Yup.string().required("Full Name is a required field"),
});

const RegisterForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (values) => {
        dispatch(registerUser({ userData: values, navigate }));
    };
    return (
        <div>
            <div className="flex flex-row justify-between">
                <Typography variant="h5" className="text-center">
                    Register
                </Typography>
                <IconButton
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    <CloseIcon color="primary" />
                </IconButton>
            </div>
            {/* {auth.registrationError && (
                <div>
                    <Typography className="p-2 text-center text-red-600">
                        {auth.registrationError.response?.data.message}
                    </Typography>
                </div>
            )} */}
            <div className="mt-5">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="fullName"
                                        label="Full Name"
                                        fullWidth
                                        variant="outlined"
                                        error={Boolean(
                                            errors.fullName && touched.fullName
                                        )}
                                        helperText={
                                            <ErrorMessage name="fullName">
                                                {(msg) => (
                                                    <span className="text-red-600">
                                                        {msg}
                                                    </span>
                                                )}
                                            </ErrorMessage>
                                        }
                                    ></Field>
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="email"
                                        label="Email Address"
                                        fullWidth
                                        variant="outlined"
                                        error={Boolean(errors.email && touched.email)}
                                        helperText={
                                            <ErrorMessage name="email">
                                                {(msg) => (
                                                    <span className="text-red-600">
                                                        {msg}
                                                    </span>
                                                )}
                                            </ErrorMessage>
                                        }
                                    ></Field>
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        type="password"
                                        as={TextField}
                                        name="password"
                                        label="Password"
                                        fullWidth
                                        variant="outlined"
                                        error={Boolean(
                                            errors.password && touched.password
                                        )}
                                        helperText={
                                            <ErrorMessage name="password">
                                                {(msg) => (
                                                    <span className="text-red-600">
                                                        {msg}
                                                    </span>
                                                )}
                                            </ErrorMessage>
                                        }
                                    ></Field>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">
                                            Role
                                        </InputLabel>
                                        <Field
                                            as={Select}
                                            name="role"
                                            label="Role"
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            error={Boolean(
                                                errors.role && touched.role
                                            )}
                                        >
                                            <MenuItem value="ROLE_CUSTOMER">
                                                Customer
                                            </MenuItem>
                                            <MenuItem value="ROLE_RESTAURANT_OWNER">
                                                Restaurant Owner
                                            </MenuItem>
                                        </Field>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        sx={{ mt: 1, padding: "15px" }}
                                        variant="outlined"
                                        type="submit"
                                        color="primary"
                                        fullWidth
                                    >
                                        Register
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </div>
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                By signing up, you agree to our Terms, Data Policy and Cookies
                Policy.
            </Typography>
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Already have an account? &nbsp;
                <Button
                    variant="text"
                    size="small"
                    onClick={() => {
                        navigate("/account/login");
                    }}
                    sx={{ "&:hover": { background: "none" } }}
                >
                    Login
                </Button>
            </Typography>
        </div>
    );
};

export default RegisterForm;
