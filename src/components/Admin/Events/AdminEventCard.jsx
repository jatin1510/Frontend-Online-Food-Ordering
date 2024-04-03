import {
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Typography,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deleteEvent } from "../../State/Restaurant/Action";
import { fireToast } from "../../Notification/Notification";
import { DateTimeField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const AdminEventCard = ({ item }) => {
    const dispatch = useDispatch();
    const handleDeleteEvent = () => {
        dispatch(
            deleteEvent({ eventId: item.id, jwt: localStorage.getItem("jwt") })
        );
        fireToast("Event Deleted", "success");
    };
    console.log("item", item);
    console.log(dayjs(item?.startDateAndTime));
    console.log(dayjs(item?.endDateAndTime));
    return (
        <Card sx={{ width: 350 }}>
            <CardMedia sx={{ height: 250 }} image={item?.images[0]} />
            <CardContent>
                <div className="flex flex-row justify-between">
                    <Typography variant="h5">{item?.name}</Typography>
                    <IconButton onClick={handleDeleteEvent}>
                        <DeleteIcon className="text-red-600" />
                    </IconButton>
                </div>
                <Typography variant="body2">{item?.description}</Typography>
                <div className="pt-2">
                    <p className="py-1">{item?.location}</p>
                    <div className="flex flex-col gap-4 pt-3">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimeField
                                className="w-full"
                                color="success"
                                format="llll"
                                label="Start Date and Time"
                                value={dayjs(item?.startDateAndTime)}
                                focused
                            ></DateTimeField>
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimeField
                                className="w-full"
                                color="error"
                                label="End Date and Time"
                                format="llll"
                                value={dayjs(item?.endDateAndTime)}
                                focused
                            ></DateTimeField>
                        </LocalizationProvider>
                    </div>
                    {/* <p className=" text-green-500">
                        Starts at {item?.startDateAndTime}
                    </p>
                    <p className="text-red-500">
                        Ends at {item?.endDateAndTime}
                    </p> */}
                </div>
            </CardContent>
        </Card>
    );
};

export default AdminEventCard;
