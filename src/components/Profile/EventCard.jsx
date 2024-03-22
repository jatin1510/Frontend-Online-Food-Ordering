import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete"
const EventCard = () => {
    return (
        <Card sx={{width: 345}}>
            <CardMedia sx={{height: 345}} image="https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"/>
            <CardContent>
                <Typography variant="h5">
                    Indian Fast Food
                </Typography>
                <Typography variant="body2">
                    50% off on your first order
                </Typography>
                <div className="py-2 space-y-2">
                    <p>{"Mumbai"}</p>
                    <p className="text-sm text-green-500">Starts at </p>
                    <p className="text-sm text-red-500">Ends at </p>
                </div>
            </CardContent>
            {false && <CardActions>
                <IconButton>
                    <DeleteIcon className="text-red-400"/>
                </IconButton>
            </CardActions>}
        </Card>
    );
};

export default EventCard;
