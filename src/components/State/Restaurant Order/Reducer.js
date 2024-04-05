import * as actionTypes from "./ActionTypes";
import { LOGOUT } from "../Authentication/ActionTypes";

const initialState = {
    loading: false,
    error: null,
    orders: [],
    filteredOrders: [],
};

export const restaurantOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_RESTAURANT_ORDERS_REQUEST:
        case actionTypes.UPDATE_ORDER_STATUS_REQUEST:
        case actionTypes.FILTER_ORDERS_REQUEST:
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
                orders: state.orders.map((order) =>
                    order.id === action.payload.id ? action.payload : order
                ),
            };

        case actionTypes.FILTER_ORDERS_SUCCESS:
            if (action.payload === "ALL")
                return {
                    ...state,
                    loading: false,
                    filteredOrders: state.orders,
                };
            else
                return {
                    ...state,
                    loading: false,
                    filteredOrders: state.orders.map(
                        (order) => order.orderStatus === action.payload
                    ),
                };

        case actionTypes.GET_RESTAURANT_ORDERS_FAILURE:
        case actionTypes.UPDATE_ORDER_STATUS_FAILURE:
        case actionTypes.FILTER_ORDERS_FAILURE:
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
