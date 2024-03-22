import { api } from "../../Config/api";

import {
    ADD_ITEM_TO_CART_FAILURE,
    ADD_ITEM_TO_CART_REQUEST,
    ADD_ITEM_TO_CART_SUCCESS,
    CLEAR_CART_FAILURE,
    CLEAR_CART_REQUEST,
    CLEAR_CART_SUCCESS,
    FIND_CART_FAILURE,
    FIND_CART_REQUEST,
    FIND_CART_SUCCESS,
    GET_ALL_CART_ITEMS_FAILURE,
    GET_ALL_CART_ITEMS_REQUEST,
    GET_ALL_CART_ITEMS_SUCCESS,
    REMOVE_CART_ITEM_FAILURE,
    REMOVE_CART_ITEM_REQUEST,
    REMOVE_CART_ITEM_SUCCESS,
    UPDATE_CART_ITEM_FAILURE,
    UPDATE_CART_ITEM_REQUEST,
    UPDATE_CART_ITEM_SUCCESS,
} from "./ActionTypes";

export const findCart = (token) => {
    return (dispatch) => {
        dispatch({ type: FIND_CART_REQUEST });
        try {
            const { data } = api.get(`/api/cart`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Find cart data: ", data);
            dispatch({ type: FIND_CART_SUCCESS, payload: data });
        } catch (error) {
            console.log("Find cart error: ", error);
            dispatch({ type: FIND_CART_FAILURE, payload: error });
        }
    };
};

// TODO: Backend is pending for this request
// FIXME: In the video, he is taking req, as parameter but it has no significance as nobody can see others cart
// TODO: Reducer is also pending for this request
export const getAllCartItems = (req) => {
    return (dispatch) => {
        dispatch({ type: GET_ALL_CART_ITEMS_REQUEST });
        try {
            const { data } = api.get(`/api/carts/${req.cartId}/items`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Get all cart items data: ", data);
            dispatch({ type: GET_ALL_CART_ITEMS_SUCCESS, payload: data });
        } catch (error) {
            console.log("Get all cart items error: ", error);
            dispatch({ type: GET_ALL_CART_ITEMS_FAILURE, payload: error });
        }
    };
};

export const addItemToCart = (req) => {
    return (dispatch) => {
        dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
        try {
            const { data } = api.post(`/api/carts/add`, req.cartItem, {
                headers: {
                    Authorization: `Bearer ${req.token}`,
                },
            });

            console.log("Add item to cart data: ", data);
            dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data });
        } catch (error) {
            console.log("Add item to cart error: ", error);
            dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload: error });
        }
    };
};

export const updateCartItem = (req) => {
    return (dispatch) => {
        dispatch({ type: UPDATE_CART_ITEM_REQUEST });
        try {
            const { data } = api.put(`/api/cart-item/update`, req.data, {
                headers: {
                    Authorization: `Bearer ${req.jwt}`,
                },
            });

            console.log("Update cart item data: ", data);
            dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: data });
        } catch (error) {
            console.log("Update cart item error: ", error);
            dispatch({ type: UPDATE_CART_ITEM_FAILURE, payload: error });
        }
    };
};

export const removeCartItem = ({ cartItemId, jwt }) => {
    return (dispatch) => {
        dispatch({ type: REMOVE_CART_ITEM_REQUEST });
        try {
            const { data } = api.delete(`/api/cart-item/${cartItemId}/remove`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });

            console.log("Remove cart item data: ", data);
            dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: cartItemId });
        } catch (error) {
            console.log("Remove cart item error: ", error);
            dispatch({ type: REMOVE_CART_ITEM_FAILURE, payload: error });
        }
    };
};

export const clearCart = () => {
    return (dispatch) => {
        dispatch({ type: CLEAR_CART_REQUEST });
        try {
            const { data } = api.delete(`/api/carts/clear`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
            });

            console.log("Clear cart data: ", data);
            dispatch({ type: CLEAR_CART_SUCCESS, payload: data });
        } catch (error) {
            console.log("Clear cart error: ", error);
            dispatch({ type: CLEAR_CART_FAILURE, payload: error });
        }
    };
};
