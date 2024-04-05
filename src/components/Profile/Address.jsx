import React from "react";
import AddressCard from "../Cart/AddressCard";
import { useSelector } from "react-redux";

const Address = () => {
    const { auth } = useSelector((store) => store);

    return (
        <div className="flex items-center flex-col">
            <h1 className="text-xl text-center py-7 font-semibold">
                My Address
            </h1>
            {auth.user?.addresses.length > 0 && (
                <div className="flex flex-row flex-wrap gap-3 justify-center">
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
            )}
            {auth.user?.addresses.length === 0 && <div>You have not added any address</div>}
        </div>
    );
};

export default Address;
