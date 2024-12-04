import '@testing-library/jest-dom';
import { SET_TYPE_FILTER, NotificationTypeFilters } from './notificationActionTypes';
import { setNotificationFilter } from './notificationActionCreators';

describe('Test Notification Actions', () => {
    test('should create right action for notification filter', () => { 
        expect(setNotificationFilter(NotificationTypeFilters["DEFAULT"])).toEqual({
            type: SET_TYPE_FILTER,
            filter: "DEFAULT",
        });
    });
})