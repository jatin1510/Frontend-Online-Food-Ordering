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

const MenuCard = ({ item }) => {
    const navigate = useNavigate();
    const jwt = localStorage.getItem("jwt");
    const { cart } = useSelector((store) => store);
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

    const handleUpdateCartItem = ({value, id}) => {
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
        var array1 = selectedIngredients;
        for (const cartItem of cart.cartItems) {
            var array2 = cartItem.ingredients;
            var is_same = (array1.length === array2.length) && array1.every((element, index) => {
                return element === array2[index]; 
            });
            if (is_same && cartItem.food.id === item.id) {
                handleUpdateCartItem({value: cartItem.quantity + 1, id: cartItem.id});
                navigate("/cart");
                return;
            }
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
                            <p className="text-gray-400">{item.description}</p>
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
                                                            onChange={() => {
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
                            disabled={false}
                            variant="contained"
                            type="submit"
                            onClick={handleAddItemToCart}
                        >
                            {true ? "Add to cart" : "Out of Stock"}
                        </Button>
                    </div>
                </form>
            </AccordionDetails>
        </Accordion>
    );
};

export default MenuCard;
