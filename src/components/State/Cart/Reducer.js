import * as actionTypes from "./ActionTypes";
import { LOGOUT } from "../Authentication/ActionTypes";

const initialState = {
    cart: null,
    cartItems: [],
    loading: false,
    error: null,
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FIND_CART_REQUEST:
        case actionTypes.CLEAR_CART_REQUEST:
        case actionTypes.GET_ALL_CART_ITEMS_REQUEST:
        case actionTypes.ADD_ITEM_TO_CART_REQUEST:
        case actionTypes.UPDATE_CART_ITEM_REQUEST:
        case actionTypes.REMOVE_CART_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case actionTypes.FIND_CART_SUCCESS:
        case actionTypes.CLEAR_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                cart: action.payload,
                cartItems: action.payload?.items,
            };

        case actionTypes.ADD_ITEM_TO_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: [...state.cartItems, action.payload],
            };

        case actionTypes.UPDATE_CART_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: state.cartItems.map((item) =>
                    item.id === action.payload.id ? action.payload : item
                ),
            };

        case actionTypes.REMOVE_CART_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: state.cartItems.filter(
                    (item) => item.id !== action.payload
                ),
            };

        case actionTypes.FIND_CART_FAILURE:
        case actionTypes.CLEAR_CART_FAILURE:
        case actionTypes.GET_ALL_CART_ITEMS_FAILURE:
        case actionTypes.ADD_ITEM_TO_CART_FAILURE:
        case actionTypes.UPDATE_CART_ITEM_FAILURE:
        case actionTypes.REMOVE_CART_ITEM_FAILURE:
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
