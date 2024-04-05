import React from "react";
import RestaurantCard from "../Restaurant/RestaurantCard";
import { useSelector } from "react-redux";

const Favorites = () => {
    const { auth } = useSelector((store) => store);

    return (
        <div className="flex items-center flex-col">
            <h1 className="text-xl text-center py-7 font-semibold">
                My Favorites
            </h1>
            {auth.favorites.length > 0 && <div className="flex flex-row flex-wrap gap-4 justify-center">
                {auth.favorites.map((item, index) => {
                    return <RestaurantCard key={index} item={item} />;
                })}
            </div>}
            {auth.favorites.length === 0 && <div>No Restaurant in Favorites</div>}
        </div>
    );
};

export default Favorites;
