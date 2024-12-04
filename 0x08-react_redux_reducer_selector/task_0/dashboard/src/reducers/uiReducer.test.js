import uiReducer, { initialState } from './uiReducer';
import { DISPLAY_NOTIFICATION_DRAWER } from '../actions/uiActionTypes';

describe('reducer', () => {
    test('initial state', () => {
        const state = uiReducer(undefined, {});
        expect(state).toEqual(initialState);
    });

    test('SELECT_COURSE', () => {
        const state = uiReducer(undefined, { type: 'SELECT_COURSE' });
        expect(state).toEqual(initialState);
    });

    test('DISPLAY_NOTIFICATION_DRAWER', () => {
        const state = uiReducer(undefined, { type: DISPLAY_NOTIFICATION_DRAWER });
        expect(state).toEqual({
            ...initialState,
            isNotificationDrawerVisible: true,
        });
    });
});