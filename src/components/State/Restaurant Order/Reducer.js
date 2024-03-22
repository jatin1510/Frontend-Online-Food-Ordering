import * as actionTypes from "./ActionTypes";
import { LOGOUT } from "../Authentication/ActionTypes";

const initialState = {
    loading: false,
    error: null,
    orders: [],
};

export const restaurantOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_RESTAURANT_ORDERS_REQUEST:
        case actionTypes.UPDATE_ORDER_STATUS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case actionTypes.GET_RESTAURANT_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload,
            };

        case actionTypes.UPDATE_ORDER_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: state.orders.map((order) => {
                    if (order.id === action.payload.id) {
                        return action.payload;
                    }
                    return order;
                }),
            };

        case actionTypes.GET_RESTAURANT_ORDERS_FAILURE:
        case actionTypes.UPDATE_ORDER_STATUS_FAILURE:
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
