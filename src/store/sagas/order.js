import { put } from "redux-saga/effects";
import {
    purchaseBurgerStart,
    purchaseBurgerFail,
    purchaseBurgerSuccess,
    fetchOrdersSuccess,
    fetchOrdersFail,
} from "../actions";
import axios from "../../axios-orders";

export function* burgerPurchaseSaga(action) {
    yield put(purchaseBurgerStart());
    try {
        const response = yield axios.post("/orders.json?auth=" + action.token, action.orderData);
        yield put(purchaseBurgerSuccess(response.data.name, action.orderData));
    } catch (error) {
        yield put(purchaseBurgerFail(error));
    }
}

export function* fetchOrdersSaga(action) {
    const queryParams = "?auth=" + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
    try {
        const res = yield axios.get("/orders.json" + queryParams);
        const fetchedOrders = [];
        for (let key in res.data) {
            fetchedOrders.push({ ...res.data[key], id: key });
        }
        yield put(fetchOrdersSuccess(fetchedOrders));
    } catch (err) {
        yield put(fetchOrdersFail(err));
    }
}
