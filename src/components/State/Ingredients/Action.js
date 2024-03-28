import {
    CREATE_INGREDIENT_CATEGORY_FAILURE,
    CREATE_INGREDIENT_CATEGORY_REQUEST,
    CREATE_INGREDIENT_CATEGORY_SUCCESS,
    CREATE_INGREDIENT_ITEM_FAILURE,
    CREATE_INGREDIENT_ITEM_REQUEST,
    CREATE_INGREDIENT_ITEM_SUCCESS,
    GET_INGREDIENTS_FAILURE,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENT_CATEGORY_FAILURE,
    GET_INGREDIENT_CATEGORY_REQUEST,
    GET_INGREDIENT_CATEGORY_SUCCESS,
    UPDATE_STOCK_FAILURE,
    UPDATE_STOCK_REQUEST,
    UPDATE_STOCK_SUCCESS,
} from "./ActionTypes";

import { api } from "../../Config/api";

export const getIngredients = ({ id, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: GET_INGREDIENTS_REQUEST });
        try {
            const { data } = await api.get(
                `/api/admin/ingredients/restaurant/${id}/items`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            console.log("Get Ingredients Data: ", data);
            dispatch({ type: GET_INGREDIENTS_SUCCESS, payload: data });
        } catch (error) {
            console.log("Get Ingredients Error: ", error);
            dispatch({ type: GET_INGREDIENTS_FAILURE, payload: error });
        }
    };
};

export const createIngredientItem = ({ jwt, data }) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_INGREDIENT_ITEM_REQUEST });
        try {
            const response = await api.post(
                "/api/admin/ingredients/item",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            console.log("Create Ingredient Item Response: ", response.data);
            dispatch({
                type: CREATE_INGREDIENT_ITEM_SUCCESS,
                payload: response.data,
            });
        } catch (error) {
            console.log("Create Ingredient Item Error: ", error);
            dispatch({ type: CREATE_INGREDIENT_ITEM_FAILURE, payload: error });
        }
    };
};

export const createIngredientCategory = ({ jwt, data }) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_INGREDIENT_CATEGORY_REQUEST });
        try {
            const response = await api.post(
                "/api/admin/ingredients/category",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            console.log("Create Ingredient Category Response: ", response.data);
            dispatch({
                type: CREATE_INGREDIENT_CATEGORY_SUCCESS,
                payload: response.data,
            });
        } catch (error) {
            console.log("Create Ingredient Category Error: ", error);
            dispatch({
                type: CREATE_INGREDIENT_CATEGORY_FAILURE,
                payload: error,
            });
        }
    };
};

export const getIngredientCategories = ({ id, jwt }) => {
    return async (dispatch) => {
        dispatch({ type: GET_INGREDIENT_CATEGORY_REQUEST });
        try {
            const { data } = await api.get(
                `/api/admin/ingredients/restaurant/${id}/categories`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            console.log("Get Ingredient Categories Data: ", data);
            dispatch({ type: GET_INGREDIENT_CATEGORY_SUCCESS, payload: data });
        } catch (error) {
            console.log("Get Ingredient Categories Error: ", error);
            dispatch({ type: GET_INGREDIENT_CATEGORY_FAILURE, payload: error });
        }
    };
};

export const updateStockOfIngredient = ({ jwt, id }) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_STOCK_REQUEST });
        try {
            const { data } = await api.put(
                `/api/admin/ingredients/item/${id}/stock`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            console.log("Update Stock Response: ", data);
            dispatch({ type: UPDATE_STOCK_SUCCESS, payload: data });
        } catch (error) {
            console.log("Update Stock Error: ", error);
            dispatch({ type: UPDATE_STOCK_FAILURE, payload: error });
        }
    };
};
