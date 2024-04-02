import { Box, Button, Modal } from "@mui/material";
import React, { useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import CreateEventForm from "./CreateEventForm";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantEvents } from "../../State/Restaurant/Action";
import AdminEventCard from "./AdminEventCard";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 520,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

const Events = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { restaurant } = useSelector((store) => store);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            getRestaurantEvents({
                restaurantId: restaurant.userRestaurant?.id,
                jwt: localStorage.getItem("jwt"),
            })
        );
    }, []);
    return (
        <div>
            <div className="p-10 flex flex-row justify-between">
                <h1 className="text-xl text-center font-semibold">
                    Events
                </h1>
                <Button
                    onClick={handleOpen}
                    variant="contained"
                    startIcon={<AddIcon />}
                >
                    Create New Event
                </Button>
            </div>
            <div className="flex items-center flex-col">
                <div className="px-5 flex flex-wrap gap-5 m-auto justify-center">
                    {restaurant.restaurantsEvents.map((item, index) => {
                        return <AdminEventCard key={index} item={item} />;
                    })}
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CreateEventForm handleClose={handleClose} />
                </Box>
            </Modal>
        </div>
    );
};

export default Events;
