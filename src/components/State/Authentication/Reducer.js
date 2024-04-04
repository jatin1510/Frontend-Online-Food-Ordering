import { isPresentInFavorites } from "../../Config/logic";
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

const initialState = {
    user: null,
    isLoading: false,
    error: null,
    jwt: null,
    favorites: [],
    success: null,
    registrationError: null,
    loginError: null,
    resetPassword: { success: null, error: null },
    forgotPassword: { success: null, error: null },
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
        case ADD_TO_FAVORITE_REQUEST:
        case RESET_PASSWORD_REQUEST:
        case FORGOT_PASSWORD_REQUEST:
            return { ...state, isLoading: true, error: null, success: null };

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                jwt: action.payload,
                success: "Success",
                registrationError: null,
                loginError: null,
            };
            
        case GET_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                favorites: action.payload.favorites,
            };

        case ADD_TO_FAVORITE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                favorites: isPresentInFavorites(state.favorites, action.payload)
                    ? state.favorites.filter(
                          (item) => item.id !== action.payload.id
                      )
                    : [...state.favorites, action.payload],
            };

        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resetPassword: { success: action.payload, error: null },
            };

        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                forgotPassword: { success: action.payload, error: null },
            };

        case FORGOT_PASSWORD_FAILURE:
            return {
                ...state,
                isLoading: false,
                forgotPassword: { success: null, error: action.payload },
            };

        case RESET_PASSWORD_FAILURE:
            return {
                ...state,
                isLoading: false,
                resetPassword: { success: null, error: action.payload },
            };

        case REGISTER_FAILURE:
            return {
                ...state,
                isLoading: false,
                registrationError: action.payload,
                success: null,
            };

        case LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                loginError: action.payload,
                success: null,
            };

        case GET_USER_FAILURE:
        case ADD_TO_FAVORITE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                success: null,
            };

        case LOGOUT:
            return initialState;

        default:
            return state;
    }
};
