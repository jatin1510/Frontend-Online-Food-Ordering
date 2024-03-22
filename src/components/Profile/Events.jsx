import React from "react";
import EventCard from "./EventCard";

const Events = () => {
    return (
        <div className="flex items-center flex-col">
            <h1 className="text-xl text-center py-7 font-semibold">
                Events
            </h1>
            <div className="px-5 flex flex-wrap gap-5 m-auto justify-center">
                {[1, 1, 1].map((item, index) => {
                    return <EventCard key={index} />;
                })}
            </div>
        </div>
    );
};

export default Events;
