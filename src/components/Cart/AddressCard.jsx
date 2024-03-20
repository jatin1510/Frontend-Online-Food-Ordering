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
                    <p>
                        Suite 214 8904 Skiles Parkway, Port Lucianoland, PA
                        91790-7454
                    </p>
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
