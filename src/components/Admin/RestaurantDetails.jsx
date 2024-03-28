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

const RestaurantDetails = () => {
    const handleRestaurantStatus = () => {};
    return (
        <div className="lg:px-20 px-5 pb-10">
            <div className="py-5 flex justify-center items-center gap-5">
                <h1 className="text-2xl lg:text-4xl text-center font-bold p-5">
                    Indian Fast Food
                </h1>
                <div>
                    <Button
                        color={true ? "primary" : "error"}
                        onClick={handleRestaurantStatus}
                        size="large"
                        variant="contained"
                    >
                        {true ? "Close" : "Open"}
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
                                        Jatin Ranpariya
                                    </p>
                                </div>
                                <div className="flex">
                                    <p className="w-48">Restaurant Name</p>
                                    <span className="pr-6">-</span>
                                    <p className="text-gray-400">
                                        Indian Fast Food
                                    </p>
                                </div>
                                <div className="flex">
                                    <p className="w-48">Cuisine Type</p>
                                    <span className="pr-6">-</span>
                                    <p className="text-gray-400">Indian</p>
                                </div>
                                <div className="flex">
                                    <p className="w-48">Opening Hours</p>
                                    <span className="pr-6">-</span>
                                    <p className="text-gray-400">
                                        Monday to Sunday - 9:00 AM to 9:00 PM
                                    </p>
                                </div>
                                <div className="flex">
                                    <p className="w-48">Status</p>
                                    <p className="text-gray-400">
                                        <span className="pr-6">-</span>
                                        {true ? (
                                            <span className="px-5 py-2 rounded-full bg-green-400 text-gray-950">
                                                Open
                                            </span>
                                        ) : (
                                            <span className="px-5 py-2 rounded-full bg-red-400 text-gray-50">
                                                Close
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
                                        Deepkamal Shopping Mall Deepkamal
                                        Shopping Mall
                                    </p>
                                </div>
                                <div className="flex">
                                    <p className="w-48">City</p>
                                    <span className="pr-6">-</span>
                                    <p className="text-gray-400">Surat</p>
                                </div>
                                <div className="flex">
                                    <p className="w-48">State / Province</p>
                                    <span className="pr-6">-</span>
                                    <p className="text-gray-400">Gujarat</p>
                                </div>
                                <div className="flex">
                                    <p className="w-48">Country</p>
                                    <span className="pr-6">-</span>
                                    <p className="text-gray-400">India</p>
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
                                        jatinranpariya1510@gmail.com
                                    </p>
                                </div>
                                <div className="flex">
                                    <p className="w-48">Mobile</p>
                                    <span className="pr-6">-</span>
                                    <p className="text-gray-400">7817831640</p>
                                </div>
                                <Divider sx={{width:'100%'}}/>
                                <div className="flex justify-center text-gray-400 pt-2">
                                    <IconButton>
                                        <a href="/">
                                            <InstagramIcon
                                                sx={{ fontSize: "3rem" }}
                                            />
                                        </a>
                                    </IconButton>
                                    <IconButton>
                                        <a href="/">
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
