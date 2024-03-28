import React from "react";
import AddressCard from "../Cart/AddressCard";
import { useSelector } from "react-redux";

const Address = () => {
    const { auth } = useSelector((store) => store);

    return (
        <div>
            <h1 className="text-xl text-center py-7 font-semibold">
                My Address
            </h1>
            <div className="flex flex-wrap gap-3 justify-center">
                {auth.user?.addresses.map((item, index) => {
                    return (
                        <AddressCard
                            showButton={false}
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
