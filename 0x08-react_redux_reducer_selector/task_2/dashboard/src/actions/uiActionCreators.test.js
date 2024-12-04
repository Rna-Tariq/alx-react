import '@testing-library/jest-dom';
import { login, logout, displayNotificationDrawer, hideNotificationDrawer, loginRequest, loginFailure, loginSuccess } from './uiActionCreators';
import { DISPLAY_NOTIFICATION_DRAWER, HIDE_NOTIFICATION_DRAWER, LOGIN, LOGOUT, LOGIN_SUCCESS, LOGIN_FAILURE } from './uiActionTypes';
const thunk = require('redux-thunk').default;
import configureMockStore from 'redux-mock-store';
import fetchMock from 'jest-fetch-mock';


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



console.log(thunk)

// Create a mock store with middleware
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('UI Action Creators - loginRequest', () => {
    afterEach(() => {
        // Restore fetch to its original state
        fetchMock.restore();
    });

    test('creates LOGIN and LOGIN_SUCCESS when fetching login is successful', async () => {
        // Prepare mock store
        const initialState = {};
        const store = mockStore(initialState);

        // Setup mock fetch response
        fetchMock.getOnce('http://localhost:8564/login-success.json', {
            body: { success: true },
            headers: { 'content-type': 'application/json' },
        });

        // Expected actions
        const expectedActions = [
            { type: LOGIN, user: { email: 'test@test.com', password: 'password123' } },
            { type: LOGIN_SUCCESS }
        ];

        // Dispatch the action
        await store.dispatch(loginRequest('test@test.com', 'password123'));

        // Check dispatched actions
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
    });

    test('creates LOGIN and LOGIN_FAILURE when fetching login fails', async () => {
        // Prepare mock store
        const initialState = {};
        const store = mockStore(initialState);

        // Setup mock fetch to simulate a network error
        fetchMock.getOnce('http://localhost:8564/login-success.json', {
            throws: new Error('Network error'),
        });

        // Expected actions
        const expectedActions = [
            { type: LOGIN, user: { email: 'test@test.com', password: 'password123' } },
            { type: LOGIN_FAILURE }
        ];

        // Dispatch the action
        await store.dispatch(loginRequest('test@test.com', 'password123'));

        // Check dispatched actions
        expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
    });
});
