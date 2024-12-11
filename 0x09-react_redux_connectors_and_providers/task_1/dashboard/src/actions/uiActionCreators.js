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

export default function loginRequest(email, password) {
    return async (dispatch) => {
        boundLogin(email, password);

        try {
            const res = await fetch("http://localhost:8564/login-success.json");
            const json = await res.json();
            return dispatch(loginSuccess());
        } catch (error) {
            return dispatch(loginFailure());
        }
    };
}
