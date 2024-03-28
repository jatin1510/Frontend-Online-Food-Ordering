import React from "react";
import { Button, Card } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const AddressCard = ({ item, showButton, handleSelectAddress }) => {
    return (
        <Card>
            <div className="flex gap-5 w-64 p-5">
                <HomeIcon />
                <div className="space-y-3 text-gray-500">
                    <h1 className="font-semibold text-lg text-white">Home</h1>
                    <p className="text-gray-400">{item.streetAddress}</p>
                    <p className="text-gray-400">
                        {item.city}, {item.stateProvince}
                    </p>
                    <p className="text-gray-400">{item.country}</p>
                </div>
            </div>
            <div className="flex gap-5 w-64 p-2">
                {showButton && (
                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => handleSelectAddress()}
                    >
                        Select
                    </Button>
                )}
            </div>
        </Card>
    );
};

export default AddressCard;
