import { api } from "../../Config/api";
import {
    FILTER_ORDERS_FAILURE,
    FILTER_ORDERS_REQUEST,
    FILTER_ORDERS_SUCCESS,
    GET_RESTAURANT_ORDERS_FAILURE,
    GET_RESTAURANT_ORDERS_REQUEST,
    GET_RESTAURANT_ORDERS_SUCCESS,
    UPDATE_ORDER_STATUS_FAILURE,
    UPDATE_ORDER_STATUS_REQUEST,
    UPDATE_ORDER_STATUS_SUCCESS,
} from "./ActionTypes";

export const getRestaurantOrders = ({ jwt, restaurantId, orderStatus }) => {
    return async (dispatch) => {
        dispatch({ type: GET_RESTAURANT_ORDERS_REQUEST });
        var url = `/api/admin/orders/restaurant/${restaurantId}`;
        if (orderStatus) {
            url = url + `?orderStatus=${orderStatus}`;
        }
        console.log("orders url: ", url);
        try {
            const { data } = await api.get(url, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("Get restaurant orders data: ", data);
            dispatch({ type: GET_RESTAURANT_ORDERS_SUCCESS, payload: data });
        } catch (error) {
            console.log("Get restaurant orders error: ", error);
            dispatch({ type: GET_RESTAURANT_ORDERS_FAILURE, payload: error });
        }
    };
};

export const updateOrderStatus = ({ jwt, orderId, orderStatus }) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });
        try {
            const { data } = await api.put(
                `/api/admin/orders/update/${orderId}/${orderStatus}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            console.log("Update order status data: ", data);
            dispatch({ type: UPDATE_ORDER_STATUS_SUCCESS, payload: data });
        } catch (error) {
            console.log("Update order status error: ", error);
            dispatch({ type: UPDATE_ORDER_STATUS_FAILURE, payload: error });
        }
    };
};

export const filterOrders = (value) => {
    return async (dispatch) => {
        dispatch({ type: FILTER_ORDERS_REQUEST });
        try {
            console.log("Filtering orders: ", value);
            dispatch({ type: FILTER_ORDERS_SUCCESS, payload: value });
        } catch (error) {
            console.log("Filter orders error: ", error);
            dispatch({ type: FILTER_ORDERS_FAILURE, payload: error });
        }
    };
};
