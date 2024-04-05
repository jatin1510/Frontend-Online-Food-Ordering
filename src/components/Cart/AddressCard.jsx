import React from "react";
import { Button, Card, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deleteAddress } from "../State/Cart/Action";
import { fireToast } from "../Notification/Notification";

const AddressCard = ({ chosen, item, showButton, chooseAddress }) => {
    const dispatch = useDispatch();
    const handleDeleteAddress = () => {
        dispatch(
            deleteAddress({ id: item.id, jwt: localStorage.getItem("jwt") })
        );
        fireToast("Address deleted successfully");
    };
    return (
        <Card>
            {/* {chosen && (
                <div className="absolute top-10 right-10 bg-green-500 text-white p-1 rounded-tl-md rounded-br-md flex justify-center items-center">
                    Chosen
                </div>
            )} */}
            <div className="flex flex-col gap-5 w-64 p-5 h-[80%]">
                <div className="flex flex-row justify-between items-center">
                    <IconButton sx={{ p: 0 }} onClick={handleDeleteAddress}>
                        <HomeIcon />
                    </IconButton>
                    <IconButton
                        sx={{ p: 0 }}
                        color="error"
                        onClick={handleDeleteAddress}
                    >
                        <DeleteIcon />
                    </IconButton>
                </div>
                <div className="space-y-3">
                    {/* <h1 className="font-semibold text-lg text-white">Home</h1> */}
                    <p>{item.streetAddress}</p>
                    <p>
                        {item.city}, {item.stateProvince}
                    </p>
                    <p>{item.country}</p>
                </div>
            </div>
            <div className="flex gap-5 w-64 p-2 h-[20%]">
                {showButton && (
                    <Button
                        variant={chosen ? "contained" : "outlined"}
                        fullWidth
                        onClick={() => chooseAddress(item)}
                    >
                        {chosen ? "Selected" : "Select"}
                    </Button>
                )}
            </div>
        </Card>
    );
};

export default AddressCard;
