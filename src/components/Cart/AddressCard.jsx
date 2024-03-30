import React from "react";
import { Button, Card } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const AddressCard = ({ item, showButton, handleSelectAddress }) => {
    return (
        <Card>
            <div className="flex gap-5 w-64 p-5">
                <HomeIcon />
                <div className="space-y-3">
                    <h1 className="font-semibold text-lg text-white">Home</h1>
                    <p >{item.streetAddress}</p>
                    <p >
                        {item.city}, {item.stateProvince}
                    </p>
                    <p>{item.country}</p>
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
