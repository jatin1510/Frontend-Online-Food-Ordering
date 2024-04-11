import { api } from "../../Config/api";
import { fireToast } from "../../Notification/Notification";
import {
    ADD_TO_FAVORITE_FAILURE,
    ADD_TO_FAVORITE_REQUEST,
    ADD_TO_FAVORITE_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    GET_USER_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GOOGLE_LOGIN_FAILURE,
    GOOGLE_LOGIN_REQUEST,
    GOOGLE_LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    RESET_PASSWORD_FAILURE,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
} from "./ActionTypes";

export const registerUser = (req) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
        const { data } = await api.post(`/auth/signup`, req.userData);
        if (data.jwt) localStorage.setItem("jwt", data.jwt);
        if (data.role === "ROLE_RESTAURANT_OWNER") {
            req.navigate("/admin/restaurant");
        } else {
            req.navigate("/");
        }
        dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
        console.log("Register Success: ", data);
        fireToast("Registration Successful", "success");
    } catch (error) {
        dispatch({ type: REGISTER_FAILURE, payload: error });
        console.log(error);
        fireToast(
            error?.response?.data?.message || error?.message,
            "error"
        );
    }
};

export const loginUser = (req) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const { data } = await api.post(`/auth/signin`, req.userData);
        if (data.jwt) localStorage.setItem("jwt", data.jwt);
        if (data.role) localStorage.setItem("role", data.role);
        if (data.role === "ROLE_RESTAURANT_OWNER") {
            req.navigate("/admin/restaurant");
        } else {
            req.navigate("/");
        }
        dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
        console.log("Login Success: ", data);
        fireToast("Login Successful", "success");
    } catch (error) {
        console.log(error);
        dispatch({ type: LOGIN_FAILURE, payload: error });
        fireToast(
            error?.response?.data?.message || error?.message,
            "error"
        );
    }
};

export const googleLoginUser = (req) => async (dispatch) => {
    dispatch({ type: GOOGLE_LOGIN_REQUEST });
    try {
        const { data } = await api.post(`/auth/google-signin`, req.userData);
        if (data.jwt) localStorage.setItem("jwt", data.jwt);
        if (data.role) localStorage.setItem("role", data.role);
        if (data.role === "ROLE_RESTAURANT_OWNER") {
            req.navigate("/admin/restaurant");
        } else {
            req.navigate("/");
        }
        dispatch({ type: GOOGLE_LOGIN_SUCCESS, payload: data.jwt });
        console.log("Login Success: ", data);
        fireToast("Login Successful", "success");
    } catch (error) {
        console.log(error);
        dispatch({ type: GOOGLE_LOGIN_FAILURE, payload: error });
        fireToast(
            error?.response?.data?.message || error?.message,
            "error"
        );
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

export const forgotPassword = async (req) => {
    return async (dispatch) => {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });
        try {
            const { data } = await api.post(`/auth/forgot-password`, req);
            dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data });
            console.log("Forgot Password Success: ", data);
            fireToast(data.message, "success");
        } catch (error) {
            dispatch({ type: FORGOT_PASSWORD_FAILURE, payload: error });
            fireToast(
                error?.response?.data?.message || error?.message,
                "error"
            );
            console.log(error);
        }
    };
};

export const resetPassword = (req) => {
    return async (dispatch) => {
        dispatch({ type: RESET_PASSWORD_REQUEST });
        try {
            const { data } = await api.post(`/auth/reset-password`, req);
            dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data });
            console.log("Reset Password Success: ", data);
            fireToast(data.message, "success");
        } catch (error) {
            dispatch({ type: RESET_PASSWORD_FAILURE, payload: error });
            fireToast(
                error?.response?.data?.message || error?.message,
                "error"
            );
            console.log(error);
        }
    };
};

export const logout = () => async (dispatch) => {
    try {
        localStorage.clear();
        dispatch({ type: LOGOUT });
    } catch (error) {
        console.log(error);
    }
};
