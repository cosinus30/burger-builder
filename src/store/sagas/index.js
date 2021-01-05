import { logoutSaga, authUserSaga, checkAuthStateSaga } from "./auth";
import { initiateIngredientsSaga } from "./burgerBuilder";
import { burgerPurchaseSaga, fetchOrdersSaga } from "./order";

import { takeEvery } from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";

export function* watchAuth() {
    yield takeEvery(actionTypes.INITIATE_LOGOUT, logoutSaga);
    yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
    yield takeEvery(actionTypes.CHECK_USER_AUTH, checkAuthStateSaga);
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INITIATE_INGREDIENTS, initiateIngredientsSaga);
}

export function* watchOrder() {
    yield takeEvery(actionTypes.PURCHASE_BURGER, burgerPurchaseSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}
