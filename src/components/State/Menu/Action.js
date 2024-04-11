import {
    CLEAR_SEARCH_MENU_ITEM,
    CREATE_MENU_ITEM_FAILURE,
    CREATE_MENU_ITEM_REQUEST,
    CREATE_MENU_ITEM_SUCCESS,
    DELETE_MENU_ITEM_FAILURE,
    DELETE_MENU_ITEM_REQUEST,
    DELETE_MENU_ITEM_SUCCESS,
    GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE,
    GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST,
    GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS,
    SEARCH_MENU_ITEM_FAILURE,
    SEARCH_MENU_ITEM_REQUEST,
    SEARCH_MENU_ITEM_SUCCESS,
    UPDATE_MENU_ITEM_AVAILABILITY_FAILURE,
    UPDATE_MENU_ITEM_AVAILABILITY_REQUEST,
    UPDATE_MENU_ITEM_AVAILABILITY_SUCCESS,
} from "./ActionTypes";

import { api } from "../../Config/api";

export const createMenuItem = ({ menu, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_MENU_ITEM_REQUEST });
        try {
            const { data } = await api.post(`/api/admin/food`, menu, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("Created Menu Item: ", data);
            dispatch({ type: CREATE_MENU_ITEM_SUCCESS, payload: data });
        } catch (error) {
            console.log("Error creating menu item: ", error);
            dispatch({ type: CREATE_MENU_ITEM_FAILURE, payload: error });
        }
    };
};

export const getMenuItemsByRestaurantId = (req) => {
    return async (dispatch) => {
        dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST });
        try {
            const { data } = await api.get(
                `/api/restaurant/${req.restaurantId}/foods?vegetarian=${req.vegetarian}&nonVegetarian=${req.nonVegetarian}&seasonal=${req.seasonal}&foodCategory=${req.foodCategory}`
            );
            console.log("Got menu items: ", data);
            dispatch({
                type: GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS,
                payload: data,
            });
        } catch (error) {
            console.log("Error getting menu items: ", error);
            dispatch({
                type: GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE,
                payload: error,
            });
        }
    };
};

export const searchMenuItem = (keyword) => {
    return async (dispatch) => {
        dispatch({ type: SEARCH_MENU_ITEM_REQUEST });
        try {
            const { data } = await api.get(
                `/api/food/search?keyword=${keyword}`
            );
            console.log("Got menu items: ", data);
            dispatch({ type: SEARCH_MENU_ITEM_SUCCESS, payload: data });
        } catch (error) {
            console.log("Error getting menu items: ", error);
            dispatch({ type: SEARCH_MENU_ITEM_FAILURE, payload: error });
        }
    };
};

// TODO: commented code in video
export const getAllIngredientsOfMenuItem = (req) => {};

export const updateMenuItemAvailability = ({ menuItemId, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_MENU_ITEM_AVAILABILITY_REQUEST });
        try {
            const { data } = await api.put(
                `/api/admin/food/${menuItemId}/availability`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            console.log("Updated menu item availability: ", data);
            dispatch({
                type: UPDATE_MENU_ITEM_AVAILABILITY_SUCCESS,
                payload: data,
            });
        } catch (error) {
            console.log("Error updating menu item availability: ", error);
            dispatch({
                type: UPDATE_MENU_ITEM_AVAILABILITY_FAILURE,
                payload: error,
            });
        }
    };
};

export const deleteMenuItem = ({ menuItemId, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_MENU_ITEM_REQUEST });
        try {
            const { data } = await api.delete(`/api/admin/food/${menuItemId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("Deleted menu item: ", data);
            dispatch({ type: DELETE_MENU_ITEM_SUCCESS, payload: menuItemId });
        } catch (error) {
            console.log("Error deleting menu item: ", error);
            dispatch({ type: DELETE_MENU_ITEM_FAILURE, payload: error });
        }
    };
};

export const clearSearchMenuItem = () => {
    return async (dispatch) => {
        dispatch({ type: CLEAR_SEARCH_MENU_ITEM });
    };
};
