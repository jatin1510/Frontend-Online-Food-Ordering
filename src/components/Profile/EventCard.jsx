import {
    Card,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import React from "react";
import { DateTimeField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const EventCard = ({ item }) => {
    return (
        <Card sx={{ width: 345 }}>
            <CardMedia sx={{ height: 345 }} image={item?.images[0]} />
            <CardContent>
                <Typography variant="h5">{item.restaurant.name}</Typography>
                <Typography variant="body2">{item.description}</Typography>
                <div className="py-2 space-y-2">
                    <p>{item.location}</p>
                    <div className="flex flex-col gap-4 pt-3">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimeField
                                disabled
                                className="w-full"
                                color="success"
                                format="llll"
                                label="Start Date and Time"
                                value={dayjs(item?.startDateAndTime)}
                            ></DateTimeField>
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimeField
                                disabled
                                className="w-full"
                                color="error"
                                label="End Date and Time"
                                format="llll"
                                value={dayjs(item?.endDateAndTime)}
                            ></DateTimeField>
                        </LocalizationProvider>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default EventCard;
