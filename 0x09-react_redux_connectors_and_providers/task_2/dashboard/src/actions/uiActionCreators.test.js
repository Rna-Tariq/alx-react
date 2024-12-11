import '@testing-library/jest-dom';
import { login, logout, displayNotificationDrawer, hideNotificationDrawer, loginRequest, loginFailure, loginSuccess } from './uiActionCreators';
import { DISPLAY_NOTIFICATION_DRAWER, HIDE_NOTIFICATION_DRAWER, LOGIN, LOGOUT, LOGIN_SUCCESS, LOGIN_FAILURE } from './uiActionTypes';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

global.fetch = jest.fn();

const createTestStore = (initialState = {}) => {
    return configureStore({
        reducer: (state = initialState, action) => {
            return state;
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(thunk)
    });
};

describe('Test UI Actions', () => {
    test('test logout', () => {
        const email = "johndoe@gmail.com";
        const password = "123456";
        expect(login(email, password)).toEqual({
            type: LOGIN,
            user: { email: "johndoe@gmail.com", password: "123456" }
        })
    });

    test('test logout', () => {
        expect(logout()).toEqual({
            type: LOGOUT
        });
    });


    test('test displayNotificationDrawer', () => {
        expect(displayNotificationDrawer()).toEqual({
            type: DISPLAY_NOTIFICATION_DRAWER
        });
    });


    test('test hideNotificationDrawer', () => {
        expect(hideNotificationDrawer()).toEqual({
            type: HIDE_NOTIFICATION_DRAWER
        });
    });
});


describe('loginRequest Action', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    test('creates LOGIN and LOGIN_SUCCESS actions when login is successful', async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ success: true })
        });

        const store = createTestStore();

        const dispatchSpy = jest.spyOn(store, 'dispatch');

        await store.dispatch(loginRequest('test@example.com', 'password'));

        const dispatchedActions = dispatchSpy.mock.calls.map(call => call[0]);

        expect(dispatchedActions).toHaveLength(2);
        expect(dispatchedActions[0].type).toBe(LOGIN);
        expect(dispatchedActions[1].type).toBe(LOGIN_SUCCESS);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('http://localhost:8564/login-success.json');
    });

    test('creates LOGIN and LOGIN_FAILURE actions when login fails', async () => {
        fetch.mockRejectedValueOnce(new Error('Network error'));

        const store = createTestStore();

        const dispatchSpy = jest.spyOn(store, 'dispatch');

        await store.dispatch(loginRequest('test@example.com', 'password'));

        const dispatchedActions = dispatchSpy.mock.calls.map(call => call[0]);

        expect(dispatchedActions).toHaveLength(2);
        expect(dispatchedActions[0].type).toBe(LOGIN);
        expect(dispatchedActions[1].type).toBe(LOGIN_FAILURE);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('http://localhost:8564/login-success.json');
    });
});
