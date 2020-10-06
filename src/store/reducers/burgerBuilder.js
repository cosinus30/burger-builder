import * as actionTypes from '../actions/actionTypes'

const PRICES = {
    salad: 0.25,
    bacon: 0.6,
    meat: 0.5,
    cheese: 0.35
}

const initialState = {
    ingredients: null,
    totalPrice: 3,
    error: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
                },
                totalPrice: state.totalPrice + PRICES[action.ingredientName],
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
                },
                totalPrice: state.totalPrice - PRICES[action.ingredientName],
            }
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false,
                totalPrice: 3.0,
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true,
            }
        default:
            return state
    }
}




export default reducer