import * as actionTypes from './actionTypes'
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
}

export const authSuccess = (token, userId, refreshToken) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        refreshToken: refreshToken,
        userId: userId
    }
}

export const logout = () => {
    return {
        type: actionTypes.LOGOUT
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyArgNSJKdmms1mQ836hc2N70L3Q3UU9Ct0';

        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyArgNSJKdmms1mQ836hc2N70L3Q3UU9Ct0'
        }

        axios.post(url, authData)
            .then((response) => {
                console.log(response);
                localStorage.setItem('accessToken', response.data.idToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                dispatch(authSuccess(response.data.idToken, response.data.localId, response.data.refreshToken));
            })
            .catch((error) => {
                console.log(error);
                dispatch(authFail(error.response.data.error));
            })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path,
    }
}

