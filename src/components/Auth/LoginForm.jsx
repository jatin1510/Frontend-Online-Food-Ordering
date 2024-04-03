import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Typography, Button, Grid, TextField, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../State/Authentication/Action";
import CloseIcon from "@mui/icons-material/Close";

const initialValues = {
    email: "",
    password: "",
};

const validationSchema = new Yup.ObjectSchema({
    email: Yup.string()
        .email()
        .matches(
            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
            "email must be a valid email"
        )
        .required(),
    password: Yup.string().required(),
});

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (values) => {
        dispatch(loginUser({ userData: values, navigate }));
    };
    const { auth } = useSelector((store) => store);

    return (
        <div>
            <div className="flex flex-row justify-between">
                <Typography variant="h5" className="text-center">
                    Login
                </Typography>
                <IconButton
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    <CloseIcon color="primary" />
                </IconButton>
            </div>
            {auth.loginError && (
                <div>
                    <Typography className="p-2 text-center text-red-600">
                        {auth.loginError.response?.data.message}
                    </Typography>
                </div>
            )}
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
                                        name="email"
                                        label="Email Address"
                                        fullWidth
                                        variant="outlined"
                                        error={Boolean(
                                            errors.email && touched.email
                                        )}
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
                                    <Button
                                        sx={{ mt: 1, padding: "15px" }}
                                        variant="outlined"
                                        type="submit"
                                        color="primary"
                                        fullWidth
                                    >
                                        Login
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </div>
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Don't have an account?&nbsp;
                <Button
                    variant="text"
                    size="small"
                    onClick={() => {
                        navigate("/account/register");
                    }}
                    sx={{ "&:hover": { background: "none" } }}
                >
                    Register
                </Button>
            </Typography>
        </div>
    );
};

export default LoginForm;
