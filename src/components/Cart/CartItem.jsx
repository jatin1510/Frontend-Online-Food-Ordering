import { Chip, IconButton } from "@mui/material";
import React from "react";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const CartItem = () => {
    return (
        <div className="px-5">
            <div className="lg:flex items-center lg:space-x-5">
                <div>
                    <img
                        style={{borderRadius: '10px'}}
                        className="w-[5rem] h-[5rem] object-cover"
                        src="https://cdn.pixabay.com/photo/2015/07/30/18/23/burger-868145_1280.jpg"
                        alt=""
                    />
                </div>
                <div className="flex items-center justify-between lg:w-[70%]">
                    <div className="space-y-1 lg:space-y-3 w-full">
                        <p>Burger</p>
                        <div className="justify-between items-center">
                            <div className="flex items-center space-x-1 ">
                                <IconButton>
                                    <RemoveCircleOutlineIcon/>
                                </IconButton>
                                <div className="w-5 h-5 text-base flex items-center justify-center">{5}</div>
                                <IconButton>
                                    <AddCircleOutlineIcon/>
                                </IconButton>
                            </div>
                        </div>
                    </div>
                    <p>₹500</p>
                </div>
            </div>
            <div className="pt-3 space-x-2">
                {[1,1,1].map((item, index) => {
                    return (<Chip key={index} label={"bread"}/>);
                })}
            </div>
        </div>
    );
};

export default CartItem;
