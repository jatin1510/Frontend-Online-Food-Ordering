import * as actionTypes from "./ActionTypes";
import { LOGOUT } from "../Authentication/ActionTypes";

const initialState = {
    menuItems: [],
    loading: false,
    error: null,
    search: [],
    message: null,
};

export const menuItemReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_MENU_ITEM_REQUEST:
        case actionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST:
        case actionTypes.DELETE_MENU_ITEM_REQUEST:
        case actionTypes.SEARCH_MENU_ITEM_REQUEST:
        case actionTypes.UPDATE_MENU_ITEM_AVAILABILITY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                message: null,
            };

        case actionTypes.CREATE_MENU_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                menuItems: [...state.menuItems, action.payload],
                message: "Menu Item created successfully",
            };

        case actionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                menuItems: action.payload,
            };

        case actionTypes.DELETE_MENU_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                menuItems: state.menuItems.filter(
                    (item) => item.id !== action.payload
                ),
                message: "Menu Item deleted successfully",
            };

        case actionTypes.UPDATE_MENU_ITEM_AVAILABILITY_SUCCESS:
            return {
                ...state,
                loading: false,
                menuItems: state.menuItems.map((item) =>
                    item.id === action.payload.id ? action.payload : item
                ),
                message: "Menu Item updated successfully",
            };

        case actionTypes.SEARCH_MENU_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                search: action.payload,
            };

        case actionTypes.CLEAR_SEARCH_MENU_ITEM:
            return {
                ...state,
                search: [],
            };
            
        case actionTypes.CREATE_MENU_ITEM_FAILURE:
        case actionTypes.GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE:
        case actionTypes.DELETE_MENU_ITEM_FAILURE:
        case actionTypes.SEARCH_MENU_ITEM_FAILURE:
        case actionTypes.UPDATE_MENU_ITEM_AVAILABILITY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                message: null,
            };

        // FIXME: LOGOUT request is pending
        case LOGOUT:
            return initialState;

        default:
            return state;
    }
};
