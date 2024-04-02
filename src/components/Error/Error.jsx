import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Error = () => {
    const fireToast = (message) => {
        toast(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    };
    const {
        auth,
        restaurant,
        menu,
        cart,
        order,
        restaurantOrder,
        ingredients,
    } = useSelector((store) => store);
    useEffect(() => {
        const error =
            auth.error ||
            restaurant.error ||
            menu.error ||
            cart.error ||
            order.error ||
            restaurantOrder.error ||
            ingredients.error ||
            null;

        if (error) {
            console.log(error);
            if (error.message === "Network Error") {
                fireToast("Server Down! Please try again later.");
            } else if (error?.code === "ERR_BAD_REQUEST") {
                fireToast("Invalid Credentials! Please try again.");
            }
        }
    }, [
        auth.error ||
            restaurant.error ||
            menu.error ||
            cart.error ||
            order.error ||
            restaurantOrder.error ||
            ingredients.error,
    ]);
    return (
        <div>
            <ToastContainer />
        </div>
    );
};

export default Error;
