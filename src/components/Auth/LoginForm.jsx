import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Typography, Button, Grid, TextField, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { googleLoginUser, loginUser } from "../State/Authentication/Action";
import CloseIcon from "@mui/icons-material/Close";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

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
            {/* {auth.loginError && (
                <div>
                    <Typography className="p-2 text-center text-red-600">
                        {auth.loginError.response?.data.message}
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
            <Typography variant="body2" sx={{ mt: 1 }}>
                <Button
                    variant="text"
                    size="small"
                    onClick={() => {
                        navigate("/account/login/forgotPassword");
                    }}
                    sx={{ "&:hover": { background: "none" } }}
                >
                    Forgot Password?
                </Button>
            </Typography>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
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
            <div className="flex flex-row items-center justify-center pt-2">
                <GoogleLogin
                    onSuccess={async (credentialResponse) => {
                        console.log(credentialResponse);
                        const data = jwtDecode(credentialResponse.credential);
                        if (
                            data.azp === process.env.REACT_APP_GOOGLE_CLIENT_ID
                        ) {
                            console.log("Valid Token");
                        } else {
                            console.log("Invalid Token");
                            return;
                        }

                        const userData = {
                            email: data.email,
                            fullName: data.name,
                            password: data.sub,
                        };

                        dispatch(googleLoginUser({ userData, navigate }));
                    }}
                    onError={() => {
                        console.log("Login Failed");
                    }}
                />
                {/* <Button onClick={() => googleLogin()}>Login with Google</Button> */}
            </div>
        </div>
    );
};

export default LoginForm;
