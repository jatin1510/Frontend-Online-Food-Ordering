import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Button from "@mui/material/Button";
import { fireToast } from "../Notification/Notification";
import { useNavigate } from "react-router-dom";

const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
});

const SearchItem = ({ item }) => {
    const navigate = useNavigate();
    const handleNavigateToRestaurant = () => {
        const restaurant = item.restaurant;
        if (restaurant.open) {
            navigate(
                `/restaurant/${restaurant.address.city}/${restaurant.name}/${restaurant.id}`
            );
        }
        else{
            fireToast("Restaurant is closed", "error");
        }
    };
    return (
        <Paper
            sx={{
                width: "100%",
                p: 2,
                flexGrow: 1,
                cursor: "pointer",
            }}
            onClick={handleNavigateToRestaurant}
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
                                <p className="font-bold text-xl">{item.restaurant.name}</p>
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                            <p style={{fontWeight: 500}} className="text-sm">{item.name}</p>
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
                            <Typography component="div">₹{item.price}</Typography>
                        </Grid>
                        <Grid item>
                            <Button
                                sx={{ cursor: "pointer" }}
                                variant="contained"
                            >
                                Add to Cart
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default SearchItem;
