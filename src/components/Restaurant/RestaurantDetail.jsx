import {
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MenuCard from "./MenuCard";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    getRestaurantById,
    getRestaurantCategories,
} from "../State/Restaurant/Action";
import { getMenuItemsByRestaurantId } from "../State/Menu/Action";

const foodTypes = [
    { label: "All", value: "all" },
    { label: "Vegetarian", value: "vegetarian" },
    { label: "Non Vegetarian", value: "nonVegetarian" },
    { label: "Seasonal", value: "seasonal" },
];
const RestaurantDetail = () => {
    const [foodType, setFoodType] = useState("all");
    const [foodCategory, setFoodCategory] = useState("All");
    const handleTypeFilter = (e) => {
        setFoodType(e.target.value);
        console.log(e.target.value);
    };
    const handleCategoryFilter = (e) => {
        setFoodCategory(e.target.value);
    };
    const dispatch = useDispatch();
    const { restaurant, menu } = useSelector((store) => store);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getRestaurantById({ id }));
        dispatch(getRestaurantCategories({ restaurantId: id }));
    }, []);
    
    useEffect(() => {
        const isVegetarian =
            foodType === "All" ? false : foodType === "vegetarian";
        const isNonVegetarian =
            foodType === "All" ? false : foodType === "nonVegetarian";
        const isSeasonal = foodType === "All" ? false : foodType === "seasonal";
        const category = foodCategory === "All" ? "" : foodCategory;
        dispatch(
            getMenuItemsByRestaurantId({
                restaurantId: id,
                vegetarian: isVegetarian,
                nonVegetarian: isNonVegetarian,
                seasonal: isSeasonal,
                foodCategory: category,
            })
        );
    }, [foodType, foodCategory]);

    const currentRestaurant = restaurant.restaurant;
    console.log("restaurant store: ", restaurant);
    return (
        <div className="px-5 lg:px-20">
            <section>
                <h3 className="py-2 mt-10">
                    Home / {currentRestaurant?.address.country} /{" "}
                    {currentRestaurant?.name} / {currentRestaurant?.address.id}
                </h3>
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <img
                                className="w-full h-[40vh] object-cover"
                                src={currentRestaurant?.images[0]}
                                alt=""
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <img
                                className="w-full h-[40vh] object-cover"
                                src={currentRestaurant?.images[1]}
                                alt=""
                            />
                        </Grid>
                        {currentRestaurant?.images.length > 2 && (
                            <Grid item xs={12} lg={6}>
                                <img
                                    className="w-full h-[40vh] object-cover"
                                    src={
                                        currentRestaurant?.images.length > 2
                                            ? currentRestaurant?.images[2]
                                            : ""
                                    }
                                    alt=""
                                />
                            </Grid>
                        )}
                    </Grid>
                </div>
                <div className="pt-3 pb-5">
                    <h1 className="text-4xl font-semibold">
                        {currentRestaurant?.name}
                    </h1>
                    <p className=" mt-1">
                        {currentRestaurant?.description}
                    </p>
                    <div className="space-y-3 mt-3">
                        <div className=" flex items-center gap-3">
                            <LocationOnIcon />
                            <span>
                                {currentRestaurant?.address.city},{" "}
                                {currentRestaurant?.address.stateProvince}
                            </span>
                        </div>
                        <div className=" flex items-center gap-3">
                            <CalendarMonthIcon />
                            <span>{currentRestaurant?.openingHours}</span>
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
                                    <FormControlLabel
                                        value={"All"}
                                        control={<Radio />}
                                        label={"All"}
                                    />
                                    {restaurant.categories.map(
                                        (item, index) => {
                                            return (
                                                <FormControlLabel
                                                    key={index}
                                                    value={item.name}
                                                    control={<Radio />}
                                                    label={item.name}
                                                />
                                            );
                                        }
                                    )}
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                </div>
                <div className="space-y-5 lg:w-[80%] lg:pl-10 lg:pb-10">
                    {menu.menuItems.map((item, index) => {
                        return <MenuCard key={index} item={item} />;
                    })}
                </div>
            </section>
        </div>
    );
};

export default RestaurantDetail;
