import React from "react";
import RestaurantCard from "../Restaurant/RestaurantCard";
import { useSelector } from "react-redux";

const Favorites = () => {
    const { auth } = useSelector((store) => store);

    return (
        <div>
            <h1 className="text-xl text-center py-7 font-semibold">
                My Favorites
            </h1>
            <div className="flex flex-wrap gap-3 justify-center">
                {auth.favorites.map((item, index) => {
                    return <RestaurantCard key={index} item={item} />;
                })}
            </div>
        </div>
    );
};

export default Favorites;
