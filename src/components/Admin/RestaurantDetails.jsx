import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    IconButton,
    Switch,
    styled,
} from "@mui/material";
import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useDispatch, useSelector } from "react-redux";
import { updateRestaurantStatus } from "../State/Restaurant/Action";

const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    "& .MuiSwitch-track": {
        borderRadius: 22 / 2,
        "&::before, &::after": {
            content: '""',
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            width: 16,
            height: 16,
        },
        "&::before": {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main)
            )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 12,
        },
        "&::after": {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main)
            )}" d="M19,13H5V11H19V13Z" /></svg>')`,
            right: 12,
        },
    },
    "& .MuiSwitch-thumb": {
        boxShadow: "none",
        width: 16,
        height: 16,
        margin: 2,
    },
}));

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
                {/* <div>
                    <Button
                        color={
                            restaurant.userRestaurant?.open
                                ? "error"
                                : "success"
                        }
                        onClick={handleRestaurantStatus}
                        size="large"
                        variant="contained"
                    >
                        {restaurant.userRestaurant?.open ? "Close" : "Open"}
                    </Button>
                </div> */}
            </div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader
                            title={
                                <div className="flex justify-between">
                                    <span>Restaurant</span>
                                    <span>
                                        <Android12Switch
                                            checked={
                                                restaurant.userRestaurant?.open
                                            }
                                            onClick={handleRestaurantStatus}
                                        />
                                    </span>
                                </div>
                            }
                        />
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex">
                                    <p className="w-48">Owner</p>
                                    <span className="pr-6">-</span>
                                    <p>
                                        {
                                            restaurant.userRestaurant?.owner
                                                .fullName
                                        }
                                    </p>
                                </div>
                                <div className="flex">
                                    <p className="w-48">Restaurant Name</p>
                                    <span className="pr-6">-</span>
                                    <p>{restaurant.userRestaurant?.name}</p>
                                </div>
                                <div className="flex">
                                    <p className="w-48">Cuisine Type</p>
                                    <span className="pr-6">-</span>
                                    <p>
                                        {restaurant.userRestaurant?.cuisineType}
                                    </p>
                                </div>
                                <div className="flex">
                                    <p className="w-48">Opening Hours</p>
                                    <span className="pr-6">-</span>
                                    <p>
                                        {
                                            restaurant.userRestaurant
                                                ?.openingHours
                                        }
                                    </p>
                                </div>
                                <div className="flex">
                                    <p className="w-48">Status</p>
                                    <p>
                                        <span className="pr-6">-</span>
                                        <span
                                            className={
                                                restaurant.userRestaurant?.open
                                                    ? "text-green-500"
                                                    : "text-red-500"
                                            }
                                        >
                                            {restaurant.userRestaurant?.open
                                                ? "Opened"
                                                : "Closed"}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Card>
                        <CardHeader title={<span>Address</span>} />
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex">
                                    <p className="w-48">Street Address</p>
                                    <span className="pr-6">-</span>
                                    <p className=" w-60">
                                        {
                                            restaurant.userRestaurant?.address
                                                .streetAddress
                                        }
                                    </p>
                                </div>
                                <div className="flex">
                                    <p className="w-48">City</p>
                                    <span className="pr-6">-</span>
                                    <p>
                                        {
                                            restaurant.userRestaurant?.address
                                                .city
                                        }
                                    </p>
                                </div>
                                <div className="flex">
                                    <p className="w-48">State / Province</p>
                                    <span className="pr-6">-</span>
                                    <p>
                                        {
                                            restaurant.userRestaurant?.address
                                                .stateProvince
                                        }
                                    </p>
                                </div>
                                <div className="flex">
                                    <p className="w-48">Country</p>
                                    <span className="pr-6">-</span>
                                    <p>
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
                        <CardHeader title={<span>Contact</span>} />
                        <CardContent>
                            <div className="space-y-4 ">
                                <div className="flex">
                                    <p className="w-48">Email</p>
                                    <span className="pr-6">-</span>
                                    <p className="w-60">
                                        {restaurant.userRestaurant?.owner.email}
                                    </p>
                                </div>
                                <div className="flex">
                                    <p className="w-48">Mobile</p>
                                    <span className="pr-6">-</span>
                                    <p>
                                        {
                                            restaurant.userRestaurant
                                                ?.contactInformation?.mobile
                                        }
                                    </p>
                                </div>
                                {/* <Divider sx={{ width: "100%" }} /> */}
                                <div className="flex justify-center">
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
