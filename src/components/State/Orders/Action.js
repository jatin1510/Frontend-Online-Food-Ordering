import { api } from "../../Config/api";
import {
    CREATE_ORDER_FAILURE,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    GET_USER_ORDERS_FAILURE,
    GET_USER_ORDERS_REQUEST,
    GET_USER_ORDERS_SUCCESS,
} from "./ActionTypes";

export const createOrder = (req) => {
    return (dispatch) => {
        dispatch({ type: CREATE_ORDER_REQUEST });
        try {
            const { data } = api.post(`/api/order`, req.data, {
                headers: {
                    Authorization: `Bearer ${req.jwt}`,
                },
            });
            // TODO: Integrate Payment Gateway
            console.log("Create order data: ", data);
            dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
        } catch (error) {
            console.log("Create order error: ", error);
            dispatch({ type: CREATE_ORDER_FAILURE, payload: error });
        }
    };
};

export const getUserOrders = (jwt) => {
    return (dispatch) => {
        dispatch({ type: GET_USER_ORDERS_REQUEST });
        try {
            const { data } = api.get(`/api/orders/user`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("Get user orders data: ", data);
            dispatch({ type: GET_USER_ORDERS_SUCCESS, payload: data });
        } catch (error) {
            console.log("Get user orders error: ", error);
            dispatch({ type: GET_USER_ORDERS_FAILURE, payload: error });
        }
    };
};
