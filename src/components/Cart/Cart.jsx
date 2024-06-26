import {
    Box,
    Button,
    Card,
    Divider,
    Grid,
    Modal,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import AddressCard from "./AddressCard";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../State/Orders/Action";
import {
    clearCart,
    createAddress,
    findCart,
    getAllAddress,
} from "../State/Cart/Action";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { fireToast } from "../Notification/Notification";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import LoadingButton from "@mui/lab/LoadingButton";

export const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    outline: "none",
    boxShadow: 24,
    p: 4,
};

const validationSchema = new Yup.ObjectSchema({
    streetAddress: Yup.string().required("Street address is required"),
    state: Yup.string().required("State is required"),
    pincode: Yup.string()
        .length(6, "Required length 6")
        .matches(/^[0-9]{6}/, "Pincode must be number")
        .required("Pincode is required"),
    city: Yup.string().required("City is required"),
    country: Yup.string().required("Country is required"),
});

const Cart = () => {
    const [initialValues, setInitialValues] = useState({
        streetAddress: "",
        state: "",
        pincode: "",
        city: "",
        country: "",
    });
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);

    const dispatch = useDispatch();
    const { cart } = useSelector((store) => store);
    const [hasChosen, setHasChosen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    useEffect(() => {
        dispatch(getAllAddress(localStorage.getItem("jwt")));
        dispatch(findCart(localStorage.getItem("jwt")));
    }, []);
    const chooseAddress = (item) => {
        if (hasChosen) {
            if (item.id === selectedAddress.id) {
                setSelectedAddress(null);
                setHasChosen(false);
            } else {
                setSelectedAddress(item);
            }
        } else {
            setSelectedAddress(item);
            setHasChosen(true);
        }
    };

    // Modal handlers
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const handleAddressOpenModal = () => setOpen(true);
    const createOrderRequest = () => {
        if (selectedAddress === null) {
            fireToast("Please choose an address");
            return;
        }
        const req = {
            jwt: localStorage.getItem("jwt"),
            data: {
                restaurantId: cart.cartItems[0].food?.restaurant.id,
                deliveryAddress: selectedAddress,
            },
        };
        dispatch(createOrder(req));
    };

    const handleAddressSubmit = (values) => {
        console.log(values);
        const req = {
            jwt: localStorage.getItem("jwt"),
            data: {
                streetAddress: values.streetAddress,
                city: values.city,
                stateProvince: values.state,
                postalCode: values.pincode,
                country: values.country,
            },
        };
        dispatch(createAddress(req));
        fireToast("Address added successfully");
        handleClose();
        setInitialValues({
            streetAddress: "",
            state: "",
            pincode: "",
            city: "",
            country: "",
        });
    };

    const handleClearCart = () => {
        dispatch(clearCart());
        fireToast("Cart Cleared");
    };

    const getAddress = () => {
        setIsLoadingLocation(true);
        navigator.geolocation.getCurrentPosition((pos) => {
            const { latitude, longitude } = pos.coords;
            console.log(latitude, longitude);
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
            fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    const currentAddress = data.address;
                    const city = currentAddress.state_district;
                    const state = currentAddress.state;
                    const country = currentAddress.country;
                    const pincode = currentAddress.postcode;
                    setInitialValues({
                        ...initialValues,
                        city,
                        state,
                        country,
                        pincode,
                    });
                    setIsLoadingLocation(false);
                    fireToast("🚀 Please Fill Precise Street Address", "info");
                });
        });
    };

    return (
        <div>
            {cart.cartItems.length === 0 && (
                <div className="min-h-[91vh] flex flex-col justify-center items-center text-center">
                    <div className="flex flex-col items-center justify-center">
                        <RemoveShoppingCartIcon sx={{ fontSize: "9rem" }} />
                        <h1 className="py-5 text-2xl font-semibold">
                            Cart Empty
                        </h1>
                    </div>
                </div>
            )}
            {cart.cartItems.length !== 0 && (
                <main className="lg:flex justify-between ">
                    <section className="lg:w-[30%] space-y-6 h-[92vh] pt-4 overflow-y-scroll pb-10">
                        {cart.cartItems.length !== 0 && (
                            <div className="relative mx-5">
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={handleClearCart}
                                >
                                    Clear Cart
                                </Button>
                            </div>
                        )}
                        {cart.cartItems.length > 0 ? (
                            cart.cartItems.map((item, index) => {
                                return <CartItem key={index} item={item} />;
                            })
                        ) : (
                            <div className="text-center">Cart Empty</div>
                        )}
                        <Divider />
                        <div className="billDetails px-5 text-sm">
                            <p className="font-extralight py-5">Bill Details</p>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <p>Item total</p>
                                    <p>₹{cart.cart?.total}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Delivery charge</p>
                                    <p>₹40</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>GST and Platform charge</p>
                                    <p>₹30</p>
                                </div>
                                <Divider />
                            </div>
                            <div className="flex justify-between my-2">
                                <p>Total Pay</p>
                                <p>₹{cart.cart?.total + 70}</p>
                            </div>
                        </div>
                    </section>
                    <Divider orientation="vertical" flexItem />
                    <section className="lg:w-[70%] h-[90vh] flex flex-col justify-between px-5 pb-10 lg:pb-0">
                        {cart.cartItems.length > 0 && (
                            <div>
                                <h1 className="text-center font-semibold text-2xl py-10">
                                    Choose delivery address
                                </h1>
                                <div className="flex gap-5 flex-wrap justify-center">
                                    {cart?.addresses.map((item, index) => {
                                        return (
                                            <AddressCard
                                                chosen={
                                                    selectedAddress?.id ===
                                                    item.id
                                                }
                                                key={index}
                                                chooseAddress={chooseAddress}
                                                item={item}
                                                showButton={true}
                                            />
                                        );
                                    })}

                                    <Card className="flex flex-col justify-between h-[auto]">
                                        <div className="flex flex-col items-center gap-5 w-64 p-5">
                                            <AddLocationAltIcon />
                                            <div className="space-y-3">
                                                <h1 className="font-semibold text-lg">
                                                    Add New Address
                                                </h1>
                                            </div>
                                        </div>
                                        <div className="flex gap-5 w-64 p-2">
                                            <Button
                                                variant="outlined"
                                                fullWidth
                                                onClick={handleAddressOpenModal}
                                            >
                                                Add
                                            </Button>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        )}
                        {cart.cartItems.length > 0 && (
                            <div>
                                <Tooltip
                                    title={
                                        !hasChosen
                                            ? "Please Choose an Address"
                                            : "Proceed to pay"
                                    }
                                    arrow
                                    placement="top"
                                >
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        style={{
                                            cursor: !hasChosen
                                                ? "not-allowed"
                                                : "pointer",
                                        }}
                                        onClick={createOrderRequest}
                                    >
                                        Proceed to pay ₹{cart.cart?.total + 70}
                                    </Button>
                                </Tooltip>
                            </div>
                        )}
                    </section>
                </main>
            )}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="pb-4">
                    <Typography variant="h5" className="text-center align-middle">
                        Add New Address
                    </Typography>
                    </div>
                    <Formik
                        enableReinitialize={true}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleAddressSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Field
                                            as={TextField}
                                            name="streetAddress"
                                            label="Street Address"
                                            fullWidth
                                            variant="outlined"
                                            error={
                                                !ErrorMessage("streetAddress")
                                            }
                                            helperText={
                                                <ErrorMessage name="streetAddress">
                                                    {(msg) => (
                                                        <span className="text-red-600">
                                                            {msg}
                                                        </span>
                                                    )}
                                                </ErrorMessage>
                                            }
                                        ></Field>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Field
                                            as={TextField}
                                            name="city"
                                            label="City"
                                            fullWidth
                                            variant="outlined"
                                            error={!ErrorMessage("city")}
                                            helperText={
                                                <ErrorMessage name="city">
                                                    {(msg) => (
                                                        <span className="text-red-600">
                                                            {msg}
                                                        </span>
                                                    )}
                                                </ErrorMessage>
                                            }
                                        ></Field>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Field
                                            as={TextField}
                                            name="state"
                                            label="State"
                                            fullWidth
                                            variant="outlined"
                                            error={!ErrorMessage("state")}
                                            helperText={
                                                <ErrorMessage name="state">
                                                    {(msg) => (
                                                        <span className="text-red-600">
                                                            {msg}
                                                        </span>
                                                    )}
                                                </ErrorMessage>
                                            }
                                        ></Field>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Field
                                            as={TextField}
                                            name="country"
                                            label="Country"
                                            fullWidth
                                            variant="outlined"
                                            error={!ErrorMessage("country")}
                                            helperText={
                                                <ErrorMessage name="country">
                                                    {(msg) => (
                                                        <span className="text-red-600">
                                                            {msg}
                                                        </span>
                                                    )}
                                                </ErrorMessage>
                                            }
                                        ></Field>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Field
                                            as={TextField}
                                            name="pincode"
                                            label="Pincode"
                                            fullWidth
                                            variant="outlined"
                                            error={!ErrorMessage("pincode")}
                                            helperText={
                                                <ErrorMessage name="pincode">
                                                    {(msg) => (
                                                        <span className="text-red-600">
                                                            {msg}
                                                        </span>
                                                    )}
                                                </ErrorMessage>
                                            }
                                        ></Field>
                                    </Grid>
                                    <Grid item xs={12} lg={12}>
                                        <LoadingButton
                                            loading={isLoadingLocation}
                                            loadingPosition="start"
                                            startIcon={<MyLocationIcon />}
                                            fullWidth
                                            onClick={getAddress}
                                            variant="outlined"
                                        >
                                            Use My Current Address
                                        </LoadingButton>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            variant="contained"
                                            type="submit"
                                            color="primary"
                                            fullWidth
                                        >
                                            Save
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Modal>
        </div>
    );
};

export default Cart;
