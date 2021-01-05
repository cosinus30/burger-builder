import { put } from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";
import * as actions from "../actions";
import { authInstance } from "../../axios-orders";

export function* logoutSaga(action) {
    yield localStorage.removeItem("accessToken");
    yield localStorage.removeItem("refreshToken");
    yield localStorage.removeItem("userId");
    yield put({
        type: actionTypes.LOGOUT,
    });
}

export function* authUserSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true,
    };

    let url = "/accounts:signUp?key=AIzaSyArgNSJKdmms1mQ836hc2N70L3Q3UU9Ct0";

    if (!action.isSignup) {
        url = "/accounts:signInWithPassword?key=AIzaSyArgNSJKdmms1mQ836hc2N70L3Q3UU9Ct0";
    }

    try {
        const response = yield authInstance.post(url, authData);
        yield localStorage.setItem("accessToken", response.data.idToken);
        yield localStorage.setItem("refreshToken", response.data.refreshToken);
        yield localStorage.setItem("userId", response.data.localId);
        yield put(actions.authSuccess(response.data.idToken, response.data.localId, response.data.refreshToken));
    } catch (error) {
        yield put(actions.authFail(error.response.data.error));
    }
}

export function* checkAuthStateSaga() {
    const accessToken = yield localStorage.getItem("accessToken");
    const refreshToken = yield localStorage.getItem("refreshToken");
    const userId = yield localStorage.getItem("userId");
    if (accessToken != null && refreshToken != null && userId != null) {
        yield put(actions.authSuccess(accessToken, userId, refreshToken));
    } else {
        yield put(actions.logout());
    }
}
