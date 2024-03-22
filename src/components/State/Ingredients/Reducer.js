import * as actionTypes from "./ActionTypes";
import { LOGOUT } from "../Authentication/ActionTypes";

const initialState = {
    ingredients: [],
    update: null,
    categories: [], // FIXME: name changed from category to categories
    loading: false,
    error: null,
};

export const ingredientReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_INGREDIENTS_REQUEST:
        case actionTypes.UPDATE_STOCK_REQUEST:
        case actionTypes.CREATE_INGREDIENT_ITEM_REQUEST:
        case actionTypes.CREATE_INGREDIENT_CATEGORY_REQUEST:
        case actionTypes.GET_INGREDIENT_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case actionTypes.GET_INGREDIENT_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: action.payload,
            };

        case actionTypes.CREATE_INGREDIENT_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: [...state.categories, action.payload],
            };

        case actionTypes.CREATE_INGREDIENT_ITEM_SUCCESS:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload],
            };

        case actionTypes.UPDATE_STOCK_SUCCESS:
            return {
                ...state,
                update: action.payload,
                ingredients: state.ingredients.map((item) => {
                    if (item.id === action.payload.id) {
                        return action.payload;
                    }
                    return item;
                }),
            };

        case actionTypes.GET_INGREDIENTS_SUCCESS:
            return {
                ...state,
                ingredients: action.payload,
                loading: false,
            };

        case actionTypes.GET_INGREDIENTS_FAILURE:
        case actionTypes.UPDATE_STOCK_FAILURE:
        case actionTypes.CREATE_INGREDIENT_ITEM_FAILURE:
        case actionTypes.CREATE_INGREDIENT_CATEGORY_FAILURE:
        case actionTypes.GET_INGREDIENT_CATEGORY_FAILURE:
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
