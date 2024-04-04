import { Grid, IconButton, Typography } from "@mui/material";
import { Field, Formik, Form } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Button, TextField } from "@mui/material";
import { ErrorMessage } from "formik";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../State/Authentication/Action";
import { fireToast } from "../Notification/Notification";

const initialValues = {
    email: "",
};

const validationSchema = new Yup.ObjectSchema({
    email: Yup.string()
        .email()
        .matches(
            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
            "email must be a valid email"
        )
        .required(),
});

const ForgotPasswordForm = () => {
    const dispatch = useDispatch();
    const { auth } = useSelector((store) => store);
    const navigate = useNavigate();

    const handleSubmit = (req) => {
        dispatch(forgotPassword(req));
        setTimeout(() => {
            console.log(auth);
            if (auth.forgotPassword.success !== null) {
                fireToast(auth.forgotPassword.success.message, "success");
            } else {
                fireToast(
                    auth.forgotPassword?.error?.response?.data?.message ||
                        auth.forgotPassword?.error?.message,
                    "error"
                );
            }
            navigate("/");
        }, 1000);
    };
    return (
        <div>
            <div className="flex flex-row justify-between">
                <Typography variant="h5" className="text-center">
                    Forgot Password
                </Typography>
                <IconButton
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    <CloseIcon color="primary" />
                </IconButton>
            </div>
            <Typography variant="body2" align="left" sx={{ mt: 3 }}>
                Enter your email address below and we'll send you a link to
                reset your password.
            </Typography>
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
                                    <Button
                                        sx={{ mt: 1, padding: "15px" }}
                                        variant="outlined"
                                        type="submit"
                                        color="primary"
                                        fullWidth
                                    >
                                        Request Reset Link
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </div>
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                <Button
                    variant="text"
                    size="small"
                    onClick={() => {
                        navigate("/account/login");
                    }}
                    sx={{ "&:hover": { background: "none" } }}
                >
                    Back to Login
                </Button>
            </Typography>
        </div>
    );
};

export default ForgotPasswordForm;
