import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { categorizeIngredients } from "../Utils/CategorizeIngredients";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addItemToCart, updateCartItem } from "../State/Cart/Action";
import { useNavigate } from "react-router-dom";
import { fireToast } from "../Notification/Notification";

const MenuCard = ({ item }) => {
    const navigate = useNavigate();
    const jwt = localStorage.getItem("jwt");
    const { cart, restaurant } = useSelector((store) => store);
    const dispatch = useDispatch();
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const handleCheckboxChange = (value) => {
        if (selectedIngredients.includes(value)) {
            setSelectedIngredients(
                selectedIngredients.filter((ingredient) => ingredient !== value)
            );
        } else {
            setSelectedIngredients([...selectedIngredients, value]);
        }
    };

    const handleUpdateCartItem = ({ value, id }) => {
        const req = {
            jwt,
            data: {
                cartItemId: id,
                quantity: value,
            },
        };
        dispatch(updateCartItem(req));
    };

    const handleAddItemToCart = (e) => {
        e.preventDefault();
        if (localStorage.getItem("jwt") === null) {
            fireToast("🦄 Please login to add items to cart");
            return;
        }

        var array1 = selectedIngredients;
        for (const cartItem of cart.cartItems) {
            var array2 = cartItem.ingredients;
            var is_same =
                array1.length === array2.length &&
                array1.every((element, index) => {
                    return element === array2[index];
                });
            if (is_same && cartItem.food.id === item.id) {
                handleUpdateCartItem({
                    value: cartItem.quantity + 1,
                    id: cartItem.id,
                });
                navigate("/cart");
                fireToast("🦄 Item Already in Cart");
                return;
            }
        }
        // check whether the restaurant is same or not
        if (
            cart.cartItems.length > 0 &&
            cart.cartItems[0].food.restaurant.id !== restaurant.restaurant.id
        ) {
            fireToast("🦄 Your cart contains items from other restaurant.");
            setTimeout(() => {
                fireToast(
                    "🦄 Please clear the cart to add items from this restaurant."
                );
            }, 4000);
            return;
        }
        const req = {
            token: localStorage.getItem("jwt"),
            cartItem: {
                foodId: item.id,
                quantity: 1,
                ingredients: selectedIngredients,
            },
        };
        dispatch(addItemToCart(req));
        fireToast("Item added to cart");
    };

    const isDisabled = (ingredients, option) => {
        for (let i = 0; i < ingredients.length; i++) {
            if (ingredients[i].name === option) {
                return ingredients[i].inStock;
            }
        }
        return false;
    };
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <div className="lg:flex items-center justify-between">
                    <div className="lg:flex items-center lg:gap-5">
                        <img
                            className="w-[7rem] h-[7rem] object-cover"
                            src={item.images[0]}
                            alt=""
                        />
                        <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
                            <p className="font-semibold text-xl">{item.name}</p>
                            <p>
                                <b>₹</b>
                                {item.price}
                            </p>
                            <p>{item.description}</p>
                        </div>
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <form>
                    <div className="flex gap-5 flex-wrap">
                        {Object.keys(
                            categorizeIngredients(item.ingredients)
                        ).map((category, index) => {
                            return (
                                <div>
                                    <p>{category}</p>
                                    <FormGroup key={index}>
                                        {categorizeIngredients(
                                            item.ingredients
                                        )[category].map((option, index2) => {
                                            return (
                                                <FormControlLabel
                                                    key={index2}
                                                    control={
                                                        <Checkbox
                                                            disabled={
                                                                !isDisabled(
                                                                    item.ingredients,
                                                                    option
                                                                )
                                                            }
                                                            onChange={() => {
                                                                console.log(
                                                                    option
                                                                );
                                                                handleCheckboxChange(
                                                                    option
                                                                );
                                                            }}
                                                        />
                                                    }
                                                    label={option}
                                                />
                                            );
                                        })}
                                    </FormGroup>
                                </div>
                            );
                        })}
                    </div>
                    <div className="pt-5">
                        <Button
                            sx={{
                                cursor: !item.available
                                    ? "not-allowed"
                                    : "pointer",
                            }}
                            variant="contained"
                            type="submit"
                            onClick={handleAddItemToCart}
                        >
                            {item.available ? "Add to cart" : "Out of Stock"}
                        </Button>
                    </div>
                </form>
            </AccordionDetails>
        </Accordion>
    );
};

export default MenuCard;
