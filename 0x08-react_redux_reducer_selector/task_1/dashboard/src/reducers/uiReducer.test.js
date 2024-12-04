import uiReducer, { initialState } from './uiReducer';
import { DISPLAY_NOTIFICATION_DRAWER } from '../actions/uiActionTypes';

describe('reducer', function () {
    test('initial state', function () {
        const state = uiReducer(undefined, {});
        expect(state.toJS()).toEqual(initialState);
    });

    test('SELECT_COURSE', function () {
        const state = uiReducer(undefined, { type: 'SELECT_COURSE' });
        expect(state.toJS()).toEqual(initialState);
    });

    test('DISPLAY_NOTIFICATION_DRAWER', function () {
        const state = uiReducer(undefined, { type: DISPLAY_NOTIFICATION_DRAWER });
        expect(state.toJS()).toEqual({
            ...initialState,
            isNotificationDrawerVisible: true,
        });
    });
});