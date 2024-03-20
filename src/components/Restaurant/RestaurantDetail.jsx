import {
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MenuCard from "./MenuCard";

const categories = ["All", "Pizza", "Biryani", "Burger", "Chicken", "Rice"];
const foodTypes = [
    { label: "All", value: "all" },
    { label: "Vegetarian", value: "vegetarian" },
    { label: "Non Vegetarian", value: "nonVegetarian" },
    { label: "Seasonal", value: "seasonal" },
];
const menu = [1, 1, 1, 1, 1, 1, , 1];
const RestaurantDetail = () => {
    const [foodType, setFoodType] = useState("all");
    const [foodCategory, setFoodCategory] = useState("All");
    const handleTypeFilter = (e) => {
        setFoodType(e.target.value);
    };
    const handleCategoryFilter = (e) => {
        setFoodCategory(e.target.value);
    };
    return (
        <div className="px-5 lg:px-20">
            <section>
                <h3 className="text-gray-500 py-2 mt-10">
                    Home/India/Indian Fast Food/3
                </h3>
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <img
                                className="w-full h-[40vh] object-cover"
                                src="https://cdn.pixabay.com/photo/2020/09/17/12/41/cafe-5579069_1280.jpg"
                                alt=""
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <img
                                className="w-full h-[40vh] object-cover"
                                src="https://cdn.pixabay.com/photo/2022/11/14/10/37/chinese-lanterns-7591296_1280.jpg"
                                alt=""
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <img
                                className="w-full h-[40vh] object-cover"
                                src="https://cdn.pixabay.com/photo/2018/07/14/15/27/cafe-3537801_1280.jpg"
                                alt=""
                            />
                        </Grid>
                    </Grid>
                </div>
                <div className="pt-3 pb-5">
                    <h1 className="text-4xl font-semibold">Indian Fast Food</h1>
                    <p className="text-gray-500 mt-1">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Fugit sit inventore perspiciatis, dolor illum
                        tenetur numquam rem dicta minima, praesentium maxime
                        voluptatum porro laborum sequi aspernatur cupiditate.
                        Officia, exercitationem in.
                    </p>
                    <div className="space-y-3 mt-3">
                        <div className="text-gray-500 flex items-center gap-3">
                            <LocationOnIcon />
                            <span>Mumbai, Maharashtra</span>
                        </div>
                        <div className="text-gray-500 flex items-center gap-3">
                            <CalendarMonthIcon />
                            <span>Mon:Sum 9:00 AM to 9:00 PM (Today)</span>
                        </div>
                    </div>
                </div>
            </section>
            <Divider />
            <section className="pt-[2rem] lg:flex relative">
                <div className="space-y-10 lg:w-[20%] filter">
                    <div className="box space-y-5 lg:sticky top-28 ">
                        <div>
                            <Typography
                                variant="h5"
                                sx={{ paddingBottom: "1rem" }}
                            >
                                Food Type
                            </Typography>
                            <FormControl className="py-10 space-y-5">
                                <RadioGroup
                                    onChange={handleTypeFilter}
                                    name="food_type"
                                    value={foodType}
                                >
                                    {foodTypes.map((item, index) => {
                                        return (
                                            <FormControlLabel
                                                key={index}
                                                value={item.value}
                                                control={<Radio />}
                                                label={item.label}
                                            />
                                        );
                                    })}
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <Divider />
                        <div>
                            <Typography
                                variant="h5"
                                sx={{ paddingBottom: "1rem" }}
                            >
                                Food Category
                            </Typography>
                            <FormControl
                                className="py-10 space-y-5"
                                component={"fieldset"}
                            >
                                <RadioGroup
                                    onChange={handleCategoryFilter}
                                    name="food_type"
                                    value={foodCategory}
                                >
                                    {categories.map((item, index) => {
                                        return (
                                            <FormControlLabel
                                                key={index}
                                                value={item}
                                                control={<Radio />}
                                                label={item}
                                            />
                                        );
                                    })}
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                </div>
                <div className="space-y-5 lg:w-[80%] lg:pl-10">
                    {menu.map((item, index) => {
                        return <MenuCard key={index} />;
                    })}
                </div>
            </section>
        </div>
    );
};

export default RestaurantDetail;
