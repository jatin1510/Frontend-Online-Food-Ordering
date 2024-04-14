import { Card, Chip, IconButton } from "@mui/material";
import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorite } from "../State/Authentication/Action";
import { isPresentInFavorites } from "../Config/logic";
import { useNavigate } from "react-router-dom";
import { fireToast } from "../Notification/Notification";

const RestaurantCard = ({ item }) => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { auth } = useSelector((store) => store);
    const navigate = useNavigate();

    const handleAddToFavorite = (id) => {
        dispatch(
            addToFavorite({
                jwt: jwt,
                restaurantId: id,
            })
        );
    };

    const handleNavigateToRestaurant = () => {
        if (item.open) {
            navigate(
                `/restaurant/${item.id}`
            );
        }
    };

    return (
        <Card sx={{ borderRadius: "15px" }} className="w-[18rem]">
            <div
                className={`${
                    item.open ? "cursor-pointer" : "cursor-not-allowed"
                } relative`}
                onClick={handleNavigateToRestaurant}
            >
                <img
                    className="w-full h-[10rem] rounded-t-md object-cover"
                    src={item.images[0]}
                    alt=""
                />
                <Chip
                    size="small"
                    className="absolute top-2 left-2"
                    color={item.open ? "success" : "error"}
                    label={item.open ? "Open" : "Closed"}
                />
            </div>
            <div className="p-4 textPart lg:flex w-full justify-between">
                <div className="space-y-1">
                    <p className="font-semibold text-lg">{item.name}</p>
                    <p className="text-sm">{item.description}</p>
                </div>
                <div>
                    <IconButton
                        onClick={() => {
                            if (auth?.user) handleAddToFavorite(item.id);
                            else {
                                fireToast('Please Login to Continue', "error")
                            }
                        }}
                    >
                        {isPresentInFavorites(auth.favorites, item) ? (
                            <FavoriteIcon color="primary" />
                        ) : (
                            <FavoriteBorderIcon />
                        )}
                    </IconButton>
                </div>
            </div>
        </Card>
    );
};

export default RestaurantCard;
