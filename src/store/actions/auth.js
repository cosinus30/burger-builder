import * as actionTypes from "./actionTypes";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (token, userId, refreshToken) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        refreshToken: refreshToken,
        userId: userId,
    };
};

export const logout = () => {
    return {
        type: actionTypes.INITIATE_LOGOUT,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    };
};

export const auth = (email, password, isSignup) => {
    return {
        type: actionTypes.AUTH_USER,
        email: email,
        password: password,
        isSignup: isSignup,
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path,
    };
};

export const checkAuthState = () => {
    return {
        type: actionTypes.CHECK_USER_AUTH
    };
};
