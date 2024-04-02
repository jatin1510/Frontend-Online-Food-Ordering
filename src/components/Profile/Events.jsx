import React, { useEffect } from "react";
import EventCard from "./EventCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../State/Restaurant/Action";

const Events = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllEvents({ jwt: localStorage.getItem("jwt") }));
    }, []);
    const { restaurant } = useSelector((store) => store);
    console.log(restaurant.events);
    return (
        <div className="flex items-center flex-col">
            <h1 className="text-xl text-center py-7 font-semibold">Events</h1>
            <div className="px-5 flex flex-wrap gap-5 m-auto justify-center">
                {restaurant.events.map((item, index) => {
                    return <EventCard key={index} item={item} />;
                })}
            </div>
        </div>
    );
};

export default Events;
