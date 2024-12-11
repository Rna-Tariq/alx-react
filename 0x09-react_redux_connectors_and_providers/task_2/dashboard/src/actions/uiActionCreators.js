import { DISPLAY_NOTIFICATION_DRAWER, LOGIN, LOGOUT, HIDE_NOTIFICATION_DRAWER, LOGIN_FAILURE, LOGIN_SUCCESS } from './uiActionTypes';

export const login = (email, password) => ({
    type: LOGIN,
    user: { email, password },
});

export const logout = () => ({
    type: LOGOUT
});

export const displayNotificationDrawer = () => ({
    type: DISPLAY_NOTIFICATION_DRAWER,
});

export const hideNotificationDrawer = () => ({
    type: HIDE_NOTIFICATION_DRAWER,
});

export const boundLogin = (email, password) => dispatch(login(email, password));
export const boundLogout = () => dispatch(logout());
export const boundDisplayNotificationDrawer = () => dispatch(displayNotificationDrawer());
export const boundHideNotificationDrawer = () => dispatch(hideNotificationDrawer());

export function loginSuccess() {
    return {
        type: LOGIN_SUCCESS,
    };
}

export function loginFailure() {
    return {
        type: LOGIN_FAILURE,
    };
}

export const loginRequest = (email, password) => {
    return async (dispatch) => {
        dispatch(login(email, password));

        try {
            const response = await fetch("http://localhost:8080/login-success.json");
            if (!response.ok) throw new Error("API error");
            const data = await response.json();
            dispatch(loginSuccess());

        } catch (error) {
            return dispatch(loginFailure());
        }
    };
}
