import * as actionTypes from "./ActionTypes";
import { LOGOUT } from "../Authentication/ActionTypes";

// FIXME: notification handling is pending
const initialState = {
    loading: false,
    orders: [],
    error: null,
    // notifications: null,
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_ORDER_REQUEST:
        case actionTypes.GET_USER_ORDERS_REQUEST:
            // case actionTypes.GET_USER_NOTIFICATIONS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case actionTypes.CREATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: [...state.orders, action.payload],
            };

        case actionTypes.GET_USER_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload,
            };

        case actionTypes.CREATE_ORDER_FAILURE:
        case actionTypes.GET_USER_ORDERS_FAILURE:
            // case actionTypes.GET_USER_NOTIFICATIONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        // FIXME: LOGOUT request is pending
        case LOGOUT:
            return initialState;

        default:
            return state;
    }
};
