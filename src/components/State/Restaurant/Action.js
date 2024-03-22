import { api } from "../../Config/api";

import {
    CREATE_CATEGORY_FAILURE,
    CREATE_CATEGORY_REQUEST,
    CREATE_CATEGORY_SUCCESS,
    CREATE_EVENTS_FAILURE,
    CREATE_EVENTS_REQUEST,
    CREATE_EVENTS_SUCCESS,
    CREATE_RESTAURANT_FAILURE,
    CREATE_RESTAURANT_REQUEST,
    CREATE_RESTAURANT_SUCCESS,
    DELETE_EVENTS_FAILURE,
    DELETE_EVENTS_REQUEST,
    DELETE_EVENTS_SUCCESS,
    DELETE_RESTAURANT_FAILURE,
    DELETE_RESTAURANT_REQUEST,
    DELETE_RESTAURANT_SUCCESS,
    GET_ALL_EVENTS_FAILURE,
    GET_ALL_EVENTS_REQUEST,
    GET_ALL_EVENTS_SUCCESS,
    GET_ALL_RESTAURANTS_FAILURE,
    GET_ALL_RESTAURANTS_REQUEST,
    GET_ALL_RESTAURANTS_SUCCESS,
    GET_RESTAURANT_BY_ID_FAILURE,
    GET_RESTAURANT_BY_ID_REQUEST,
    GET_RESTAURANT_BY_ID_SUCCESS,
    GET_RESTAURANT_BY_USER_ID_FAILURE,
    GET_RESTAURANT_BY_USER_ID_REQUEST,
    GET_RESTAURANT_BY_USER_ID_SUCCESS,
    GET_RESTAURANT_CATEGORIES_FAILURE,
    GET_RESTAURANT_CATEGORIES_REQUEST,
    GET_RESTAURANT_CATEGORIES_SUCCESS,
    GET_RESTAURANT_EVENTS_FAILURE,
    GET_RESTAURANT_EVENTS_REQUEST,
    GET_RESTAURANT_EVENTS_SUCCESS,
    UPDATE_RESTAURANT_FAILURE,
    UPDATE_RESTAURANT_REQUEST,
    UPDATE_RESTAURANT_STATUS_FAILURE,
    UPDATE_RESTAURANT_STATUS_REQUEST,
    UPDATE_RESTAURANT_STATUS_SUCCESS,
    UPDATE_RESTAURANT_SUCCESS,
} from "./ActionTypes";

export const getAllRestaurants = (token) => {
    return async (dispatch) => {
        dispatch({ type: GET_ALL_RESTAURANTS_REQUEST });
        try {
            const { data } = await api.get("/api/restaurants", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("All Restaurants: ", data);
            dispatch({
                type: GET_ALL_RESTAURANTS_SUCCESS,
                payload: data,
            });
        } catch (error) {
            console.log(error);
            dispatch({ type: GET_ALL_RESTAURANTS_FAILURE, payload: error });
        }
    };
};

export const getRestaurantById = (req) => {
    return async (dispatch) => {
        dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST });
        try {
            const { data } = await api.get(`/api/restaurants/${req.id}`, {
                headers: {
                    Authorization: `Bearer ${req.jwt}`,
                },
            });
            console.log("Restaurant By ID: ", req.id, " is ", data);
            dispatch({
                type: GET_RESTAURANT_BY_ID_SUCCESS,
                payload: data,
            });
        } catch (error) {
            console.log(error);
            dispatch({ type: GET_RESTAURANT_BY_ID_FAILURE, payload: error });
        }
    };
};

export const getRestaurantByUserId = (jwt) => {
    return async (dispatch) => {
        dispatch({ type: GET_RESTAURANT_BY_USER_ID_REQUEST });
        try {
            const { data } = await api.get(`/api/admin/restaurants/mine`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("Mine Restaurant: ", data);
            dispatch({
                type: GET_RESTAURANT_BY_USER_ID_SUCCESS,
                payload: data,
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: GET_RESTAURANT_BY_USER_ID_FAILURE,
                payload: error,
            });
        }
    };
};

export const createRestaurant = (req) => {
    console.log("token: ", req.token);
    return async (dispatch) => {
        dispatch({ type: CREATE_RESTAURANT_REQUEST });
        try {
            const { data } = await api.post(
                `/api/admin/restaurants`,
                req.data,
                {
                    headers: {
                        Authorization: `Bearer ${req.jwt}`,
                    },
                }
            );
            console.log("Created Restaurant: ", data);
            dispatch({
                type: CREATE_RESTAURANT_SUCCESS,
                payload: data,
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: CREATE_RESTAURANT_FAILURE,
                payload: error,
            });
        }
    };
};

export const updateRestaurant = ({ restaurantId, restaurantData, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_RESTAURANT_REQUEST });
        try {
            const { data } = await api.put(
                `/api/admin/restaurants/${restaurantId}`,
                restaurantData,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            console.log("Updated Restaurant: ", data);
            dispatch({
                type: UPDATE_RESTAURANT_SUCCESS,
                payload: data,
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: UPDATE_RESTAURANT_FAILURE,
                payload: error,
            });
        }
    };
};

export const deleteRestaurant = ({ restaurantId, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_RESTAURANT_REQUEST });
        try {
            const { data } = await api.delete(
                `/api/admin/restaurants/${restaurantId}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            console.log("Deleted Restaurant: ", data);
            dispatch({
                type: DELETE_RESTAURANT_SUCCESS,
                payload: restaurantId,
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: DELETE_RESTAURANT_FAILURE,
                payload: error,
            });
        }
    };
};

export const updateRestaurantStatus = ({ restaurantId, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });
        try {
            const { data } = await api.put(
                `/api/admin/restaurants/${restaurantId}/status`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            console.log("Updated Restaurant Status: ", data);
            dispatch({
                type: UPDATE_RESTAURANT_STATUS_SUCCESS,
                payload: data,
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: UPDATE_RESTAURANT_STATUS_FAILURE,
                payload: error,
            });
        }
    };
};

// TODO: Backend is pending for this request
export const createEvent = ({ reqData, jwt, restaurantId }) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_EVENTS_REQUEST });
        try {
            const { data } = await api.post(
                `/api/admin/events/${restaurantId}`,
                reqData,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            console.log("Created Event: ", data);
            dispatch({
                type: CREATE_EVENTS_SUCCESS,
                payload: data,
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: CREATE_EVENTS_FAILURE,
                payload: error,
            });
        }
    };
};

// TODO: Backend is pending for this request
export const getAllEvents = ({ jwt }) => {
    return async (dispatch) => {
        dispatch({ type: GET_ALL_EVENTS_REQUEST });
        try {
            const { data } = await api.get(`/api/admin/events`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("All Events: ", data);
            dispatch({
                type: GET_ALL_EVENTS_SUCCESS,
                payload: data,
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: GET_ALL_EVENTS_FAILURE,
                payload: error,
            });
        }
    };
};

// TODO: Backend is pending for this request
export const deleteEvent = ({ eventId, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_EVENTS_REQUEST });
        try {
            const { data } = await api.delete(`/api/admin/events/${eventId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("Deleted Event: ", data);
            dispatch({
                type: DELETE_EVENTS_SUCCESS,
                payload: eventId,
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: DELETE_EVENTS_FAILURE,
                payload: error,
            });
        }
    };
};

// TODO: Backend is pending for this request
export const getRestaurantEvents = ({ restaurantId, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: GET_RESTAURANT_EVENTS_REQUEST });
        try {
            const { data } = await api.get(
                `/api/admin/events/restaurant/${restaurantId}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            console.log("Restaurant Events: ", data);
            dispatch({
                type: GET_RESTAURANT_EVENTS_SUCCESS,
                payload: data,
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: GET_RESTAURANT_EVENTS_FAILURE,
                payload: error,
            });
        }
    };
};

export const createCategory = ({ reqData, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_CATEGORY_REQUEST });
        try {
            const { data } = await api.post(`/api/admin/category`, reqData, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("Created Category: ", data);
            dispatch({
                type: CREATE_CATEGORY_SUCCESS,
                payload: data,
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: CREATE_CATEGORY_FAILURE,
                payload: error,
            });
        }
    };
};

export const getRestaurantCategories = ({ jwt, restaurantId }) => {
    return async (dispatch) => {
        dispatch({ type: GET_RESTAURANT_CATEGORIES_REQUEST });
        try {
            const { data } = await api.get(
                `/api/category/restaurant/${restaurantId}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            console.log("Restaurant Categories: ", data);
            dispatch({
                type: GET_RESTAURANT_CATEGORIES_SUCCESS,
                payload: data,
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: GET_RESTAURANT_CATEGORIES_FAILURE,
                payload: error,
            });
        }
    };
};
