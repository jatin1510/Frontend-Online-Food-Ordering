import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { DateTimeField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Chip from '@mui/material/Chip';

const EventCard = ({ item }) => {
    const checkTimeIntersection = () => {
        const start = new Date(item.startDateAndTime).getTime();
        const end = new Date(item.endDateAndTime).getTime();
        const currentTime = new Date().getTime();
        return start < currentTime && currentTime < end;
    };
    return (
        <Card
            sx={{
                width: 345,
            }}
        >
            <CardMedia sx={{ height: 345 }} image={item?.images[0]} />
            <CardContent>
                <div className="flex flex-row items-center justify-between pb-2">
                    <Typography variant="h5">{item.restaurant.name}</Typography>
                    {checkTimeIntersection() && <Chip color="success" label={"Live"}>
                        Live
                    </Chip>}
                </div>
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
