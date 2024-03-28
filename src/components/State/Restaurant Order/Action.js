import api from "../../Config/api";
import {
    GET_RESTAURANT_ORDERS_FAILURE,
    GET_RESTAURANT_ORDERS_REQUEST,
    GET_RESTAURANT_ORDERS_SUCCESS,
} from "./ActionTypes";

export const getRestaurantOrders = ({ jwt, restaurantId, orderStatus }) => {
    return async (dispatch) => {
        dispatch({ type: GET_RESTAURANT_ORDERS_REQUEST });
        try {
            const { data } = await api.get(
                `/api/admin/orders/restaurant/${restaurantId}?orderStatus=${orderStatus}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
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
        dispatch({ type: GET_RESTAURANT_ORDERS_REQUEST });
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
            dispatch({ type: GET_RESTAURANT_ORDERS_SUCCESS, payload: data });
        } catch (error) {
            console.log("Update order status error: ", error);
            dispatch({ type: GET_RESTAURANT_ORDERS_FAILURE, payload: error });
        }
    };
};
