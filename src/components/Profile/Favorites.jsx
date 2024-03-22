import React from "react";
import RestaurantCard from "../Restaurant/RestaurantCard";

const Favorites = () => {
    return (
        <div>
            <h1 className="text-xl text-center py-7 font-semibold">
                My Favorites
            </h1>
            <div className="flex flex-wrap gap-3 justify-center">
                {[1, 1, 1, 1, 1].map((item, index) => {
                    return <RestaurantCard key={index} />;
                })}
            </div>
        </div>
    );
};

export default Favorites;
