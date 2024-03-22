import React from "react";
import AddressCard from "../Cart/AddressCard";

const Address = () => {
    return (
        <div>
            <h1 className="text-xl text-center py-7 font-semibold">
                My Address
            </h1>
            <div className="flex flex-wrap gap-3 justify-center">
                {[1, 1, 1, 1, 1].map((item, index) => {
                    return (
                        <AddressCard
                            showButton={true}
                            item={item}
                            key={index}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Address;
