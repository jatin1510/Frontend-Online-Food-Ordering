import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Button from "@mui/material/Button";
import { fireToast } from "../Notification/Notification";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearSearchMenuItem } from "../State/Menu/Action";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
});

const SearchItem = ({ item }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleNavigateToRestaurant = () => {
        const restaurant = item.restaurant;
        if (restaurant.open) {
            dispatch(clearSearchMenuItem());
            localStorage.removeItem("search");
            navigate(
                `/restaurant/${restaurant.id}`
            );
        } else {
            fireToast("Restaurant is closed", "error");
        }
    };
    return (
        <Paper
            sx={{
                width: "100%",
                p: 2,
                flexGrow: 1,
            }}
        >
            <Grid container spacing={2}>
                <Grid item>
                    <ButtonBase sx={{ width: 128, height: 128 }}>
                        <Img
                            className="h-screen w-screen object-cover object-center"
                            alt="complex"
                            src={item.images[0]}
                        />
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom component="div">
                                <p className="font-bold text-xl">
                                    {item.restaurant.name}
                                </p>
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                <p
                                    style={{ fontWeight: 500 }}
                                    className="text-sm"
                                >
                                    {item.name}
                                </p>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {item.description}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        direction="column"
                        className="flex flex-col items-center justify-between"
                    >
                        <Grid item className="flex items-end justify-end">
                            <Typography component="div">
                                ₹{item.price}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button
                                sx={{ cursor: "pointer", zIndex: 1000}}
                                variant="contained"
                                onClick={handleNavigateToRestaurant}
                            >
                                <ArrowForwardIcon/>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default SearchItem;
