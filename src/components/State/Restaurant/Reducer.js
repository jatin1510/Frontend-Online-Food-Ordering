import * as actionTypes from "./ActionTypes";
import { LOGOUT } from "../Authentication/ActionTypes";

const initialState = {
    restaurants: [],
    userRestaurant: null,
    restaurant: null,
    loading: false,
    error: null,
    events: [],
    restaurantsEvents: [],
    categories: [],
};

export const restaurantReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_RESTAURANT_REQUEST:
        case actionTypes.GET_ALL_RESTAURANTS_REQUEST:
        case actionTypes.DELETE_RESTAURANT_REQUEST:
        case actionTypes.UPDATE_RESTAURANT_REQUEST:
        case actionTypes.CREATE_CATEGORY_REQUEST:
        case actionTypes.GET_RESTAURANT_CATEGORIES_REQUEST:
            return { ...state, loading: true, error: null };

        case actionTypes.CREATE_RESTAURANT_SUCCESS:
            return { ...state, loading: false, userRestaurant: action.payload };

        case actionTypes.GET_ALL_RESTAURANTS_SUCCESS:
            return { ...state, loading: false, restaurants: action.payload };

        case actionTypes.GET_RESTAURANT_BY_ID_SUCCESS:
            return { ...state, loading: false, restaurant: action.payload };

        case actionTypes.GET_RESTAURANT_BY_USER_ID_SUCCESS:
        case actionTypes.UPDATE_RESTAURANT_STATUS_SUCCESS:
        case actionTypes.UPDATE_RESTAURANT_SUCCESS:
            return { ...state, loading: false, userRestaurant: action.payload };

        case actionTypes.DELETE_RESTAURANT_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
                restaurants: state.restaurants.filter(
                    (restaurant) => restaurant.id !== action.payload
                ),
                // TODO: Meaning less to remove userRestaurant
                // userRestaurant: state.userRestaurant.filter(
                //     (restaurant) => restaurant.id !== action.payload
                // ),
            };

        case actionTypes.CREATE_EVENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                events: [...state.events, action.payload],
                restaurantsEvents: [...state.restaurantsEvents, action.payload],
            };

        case actionTypes.GET_ALL_EVENTS_SUCCESS:
            return { ...state, loading: false, events: action.payload };

        case actionTypes.GET_RESTAURANT_EVENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                restaurantsEvents: action.payload,
            };

        case actionTypes.DELETE_EVENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                events: state.events.filter(
                    (event) => event.id !== action.payload
                ),
                restaurantsEvents: state.restaurantsEvents.filter(
                    (event) => event.id !== action.payload
                ),
            };

        case actionTypes.CREATE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: [...state.categories, action.payload],
            };

        case actionTypes.GET_RESTAURANT_CATEGORIES_SUCCESS:
            return { ...state, loading: false, categories: action.payload };

        case actionTypes.CREATE_RESTAURANT_FAILURE:
        case actionTypes.GET_ALL_RESTAURANTS_FAILURE:
        case actionTypes.DELETE_RESTAURANT_FAILURE:
        case actionTypes.UPDATE_RESTAURANT_FAILURE:
        case actionTypes.GET_RESTAURANT_BY_ID_FAILURE:
        case actionTypes.GET_RESTAURANT_BY_USER_ID_FAILURE:
        case actionTypes.UPDATE_RESTAURANT_STATUS_FAILURE:
        case actionTypes.CREATE_EVENTS_FAILURE:
        case actionTypes.GET_ALL_EVENTS_FAILURE:
        case actionTypes.GET_RESTAURANT_EVENTS_FAILURE:
        case actionTypes.DELETE_EVENTS_FAILURE:
        case actionTypes.CREATE_CATEGORY_FAILURE:
        case actionTypes.GET_RESTAURANT_CATEGORIES_FAILURE:
            return { ...state, loading: false, error: action.payload };

        // FIXME: LOGOUT request is pending
        case LOGOUT:
            return initialState;

        default:
            return state;
    }
};
