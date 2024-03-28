import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    IconButton,
} from "@mui/material";
import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useDispatch, useSelector } from "react-redux";
import { updateRestaurantStatus } from "../State/Restaurant/Action";

const RestaurantDetails = () => {
    const { restaurant } = useSelector((store) => store);
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const handleRestaurantStatus = () => {
        dispatch(
            updateRestaurantStatus({
                jwt,
                restaurantId: restaurant.userRestaurant?.id,
            })
        );
    };
    return (
        <div className="lg:px-20 px-5 pb-10">
            <div className="py-5 flex justify-center items-center gap-5">
                <h1 className="text-2xl lg:text-4xl text-center font-bold p-5">
                    {restaurant.userRestaurant?.name}
                </h1>
                <div>
                    <Button
                        color={restaurant.userRestaurant?.open ? "error" : "success"}
                        onClick={handleRestaurantStatus}
                        size="large"
                        variant="contained"
                    >
                        {restaurant.userRestaurant?.open ? "Close" : "Open"}
                    </Button>
                </div>
            </div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader
                            title={
                                <span className="text-gray-300">
                                    Restaurant
                                </span>
                            }
                        />
                        <CardContent>
                            <div className="space-y-4 text-gray-200">
                                <div className="flex">
                                    <p className="w-48">Owner</p>
                                    <span className="pr-6">-</span>
                                    <p className="text-gray-400">
                                        {
                                            restaurant.userRestaurant?.owner
                                                .fullName
                                        }
                                    </p>
                                </div>
                                <div className="flex">
                                    <p className="w-48">Restaurant Name</p>
                                    <span className="pr-6">-</span>
                                    <p className="text-gray-400">
                                        {restaurant.userRestaurant?.name}
                                    </p>
                                </div>
                                <div className="flex">
                                    <p className="w-48">Cuisine Type</p>
                                    <span className="pr-6">-</span>
                                    <p className="text-gray-400">
                                        {restaurant.userRestaurant?.cuisineType}
                                    </p>
                                </div>
                                <div className="flex">
                                    <p className="w-48">Opening Hours</p>
                                    <span className="pr-6">-</span>
                                    <p className="text-gray-400">
                                        {
                                            restaurant.userRestaurant
                                                ?.openingHours
                                        }
                                    </p>
                                </div>
                                <div className="flex">
                                    <p className="w-48">Status</p>
                                    <p className="text-gray-400">
                                        <span className="pr-6">-</span>
                                        {restaurant.userRestaurant?.open ? (
                                            <span className="px-5 py-2 rounded-full bg-green-400 text-gray-950">
                                                Opened
                                            </span>
                                        ) : (
                                            <span className="px-5 py-2 rounded-full bg-red-400 text-gray-50">
                                                Closed
                                            </span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Card>
                        <CardHeader
                            title={
                                <span className="text-gray-300">Address</span>
                            }
                        />
                        <CardContent>
                            <div className="space-y-4 text-gray-200">
                                <div className="flex">
                                    <p className="w-48">Street Address</p>
                                    <span className="pr-6">-</span>
                                    <p className="text-gray-400 w-60">
                                        {
                                            restaurant.userRestaurant?.address
                                                .streetAddress
                                        }
                                    </p>
                                </div>
                                <div className="flex">
                                    <p className="w-48">City</p>
                                    <span className="pr-6">-</span>
                                    <p className="text-gray-400">
                                        {
                                            restaurant.userRestaurant?.address
                                                .city
                                        }
                                    </p>
                                </div>
                                <div className="flex">
                                    <p className="w-48">State / Province</p>
                                    <span className="pr-6">-</span>
                                    <p className="text-gray-400">
                                        {
                                            restaurant.userRestaurant?.address
                                                .stateProvince
                                        }
                                    </p>
                                </div>
                                <div className="flex">
                                    <p className="w-48">Country</p>
                                    <span className="pr-6">-</span>
                                    <p className="text-gray-400">
                                        {
                                            restaurant.userRestaurant?.address
                                                .country
                                        }
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Card>
                        <CardHeader
                            title={
                                <span className="text-gray-300">Contact</span>
                            }
                        />
                        <CardContent>
                            <div className="space-y-4 text-gray-200">
                                <div className="flex">
                                    <p className="w-48">Email</p>
                                    <span className="pr-6">-</span>
                                    <p className="text-gray-400 w-60">
                                        {restaurant.userRestaurant?.owner.email}
                                    </p>
                                </div>
                                <div className="flex">
                                    <p className="w-48">Mobile</p>
                                    <span className="pr-6">-</span>
                                    <p className="text-gray-400">
                                        {
                                            restaurant.userRestaurant
                                                ?.contactInformation?.mobile
                                        }
                                    </p>
                                </div>
                                <Divider sx={{ width: "100%" }} />
                                <div className="flex justify-center text-gray-400 pt-2">
                                    <IconButton>
                                        <a
                                            href={
                                                restaurant.userRestaurant
                                                    ?.contactInformation
                                                    ?.instagram
                                            }
                                        >
                                            <InstagramIcon
                                                sx={{ fontSize: "3rem" }}
                                            />
                                        </a>
                                    </IconButton>
                                    <IconButton>
                                        <a
                                            href={
                                                restaurant.userRestaurant
                                                    ?.contactInformation
                                                    ?.twitter
                                            }
                                        >
                                            <TwitterIcon
                                                sx={{ fontSize: "3rem" }}
                                            />
                                        </a>
                                    </IconButton>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default RestaurantDetails;
