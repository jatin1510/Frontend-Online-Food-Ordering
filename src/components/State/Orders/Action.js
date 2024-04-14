import { api } from "../../Config/api";
import {
    CREATE_ORDER_FAILURE,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    GET_PAYMENT_LINK,
    GET_USER_ORDERS_FAILURE,
    GET_USER_ORDERS_REQUEST,
    GET_USER_ORDERS_SUCCESS,
    PAYMENT_FAILURE,
    PAYMENT_REQUEST,
    PAYMENT_SUCCESS,
} from "./ActionTypes";

export const createOrder = (req) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_ORDER_REQUEST });
        try {
            const { data } = await api.post(`/api/order`, req.data, {
                headers: {
                    Authorization: `Bearer ${req.jwt}`,
                },
            });
            if (data.payment_url) {
                window.location.href = data.payment_url;
            }
            console.log("Create order data: ", data);
            dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
        } catch (error) {
            console.log("Create order error: ", error);
            dispatch({ type: CREATE_ORDER_FAILURE, payload: error });
        }
    };
};

export const getUserOrders = (jwt) => {
    return async (dispatch) => {
        dispatch({ type: GET_USER_ORDERS_REQUEST });
        try {
            const { data } = await api.get(`/api/orders/user`, {
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

export const paymentSuccess = (req) => {
    return async (dispatch) => {
        dispatch({ type: PAYMENT_REQUEST });
        try {
            const response = await api.put(
                `/api/order/payment/success/${req.orderId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${req.jwt}`,
                    },
                }
            );
            console.log("Payment success data: ", response);
            dispatch({ type: PAYMENT_SUCCESS, payload: req.orderId });
        } catch (error) {
            console.log("Payment success error: ", error);
            dispatch({ type: PAYMENT_FAILURE, payload: error });
        }
    };
};

export const getPaymentLink = (req) => {
    return async (dispatch) => {
        dispatch({ type: GET_PAYMENT_LINK });
        try {
            const { data } = await api.get(
                `/api/order/payment/link/${req.orderId}`,
                {
                    headers: {
                        Authorization: `Bearer ${req.jwt}`,
                    },
                }
            );
            return data.payment_url;
        } catch (error) {
            console.log("Get payment link error: ", error);
        }
    };
};
