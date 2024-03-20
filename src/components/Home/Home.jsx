import React from "react";
import "./Home.css";
import MultiItemCarousel from "./MultiItemCarousel";
import RestaurantCard from "../Restaurant/RestaurantCard";

const restaurants = [1, 1, 1, 1, 1];
const Home = () => {
    return (
        <div>
            <section className="banner -z-50 relative flex flex-col justify-center items-center">
                <div className="w-[50vw] z-10 text-center">
                    <p className="text-2xl lg:text-6xl font-bold z-10 py-5">
                        Hungrio Food
                    </p>
                    <p className="z-10 text-gray-300 text-xl lg:text-4xl">
                        Discover, Delight, Dine: Your Culinary Adventure Begins
                        Here.
                    </p>
                </div>
                <div className="cover absolute top-0 left-0 right-0"></div>
                <div className="fadeout"></div>
            </section>
            <section className="p-10 lg:py-10 lg:px-20">
                <h1 className="text-2xl font-semibold text-center text-gray-400 py-3 pb-10">
                    Top Meals
                </h1>
                <MultiItemCarousel />
            </section>
            <section className="px-5 lg:px-20 lg:pb-20 pt-5">
                <h1 className="text-2xl font-semibold text-center text-gray-400 pb-10">
                    Order From Our Handpicked Favorites
                </h1>
                <div className="flex flex-wrap items-center justify-center gap-5">
                    {restaurants.map((restaurant, index) => {
                        return <RestaurantCard key={index} />;
                    })}
                </div>
            </section>
        </div>
    );
};

export default Home;
