import { api } from "../../Config/api";
import {
    ADD_TO_FAVORITE_FAILURE,
    ADD_TO_FAVORITE_REQUEST,
    ADD_TO_FAVORITE_SUCCESS,
    GET_USER_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
} from "./ActionTypes";

export const registerUser = (req) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
        const { data } = await api.post(
            `/auth/signup`,
            req.userData
        );
        if (data.jwt) localStorage.setItem("jwt", data.jwt);
        if (data.role === "ROLE_RESTAURANT_OWNER") {
            req.navigate("/admin/restaurant");
        } else {
            req.navigate("/");
        }
        dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
        console.log("Register Success: ", data);
    } catch (error) {
        dispatch({ type: REGISTER_FAILURE, payload: error });
        console.log(error);
    }
};

export const loginUser = (req) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const { data } = await api.post(
            `/auth/signin`,
            req.userData
        );
        if (data.jwt) localStorage.setItem("jwt", data.jwt);
        if (data.role === "ROLE_RESTAURANT_OWNER") {
            req.navigate("/admin/restaurant");
        } else {
            req.navigate("/");
        }
        dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
        console.log("Login Success: ", data);
    } catch (error) {
        console.log(error);
        dispatch({ type: LOGIN_FAILURE, payload: error });
    }
};

export const getUser = (jwt) => async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    try {
        const { data } = await api.get(`/users/profile`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({ type: GET_USER_SUCCESS, payload: data });
        console.log("Get User Success: ", data);
    } catch (error) {
        console.log(error);
        dispatch({ type: GET_USER_FAILURE, payload: error });
    }
};

export const addToFavorite =
    ({ jwt, restaurantId }) =>
    async (dispatch) => {
        dispatch({ type: ADD_TO_FAVORITE_REQUEST });
        try {
            const { data } = await api.put(
                `/api/restaurants/add-to-favorite/${restaurantId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            dispatch({ type: ADD_TO_FAVORITE_SUCCESS, payload: data });
            console.log("Added to favorite: ", data);
        } catch (error) {
            console.log(error);
            dispatch({ type: ADD_TO_FAVORITE_FAILURE, payload: error });
        }
    };

export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem("jwt");
        dispatch({ type: LOGOUT });
        console.log("Logged Out");
    } catch (error) {
        console.log(error);
    }
};
