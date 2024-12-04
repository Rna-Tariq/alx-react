import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Notifications from './Notifications';
import { getLatestNotification } from '../utils/utils';


jest.mock('../utils/utils', () => ({
    getLatestNotification: jest.fn(() => '<strong>Urgent requirement</strong> - complete by EOD'),
}));

describe('Notifications Component', () => {
    test('renders NotificationItem elements', () => {
        const listNotifications = [
            { id: 1, type: "default", value: "New course available" },
            { id: 2, type: "urgent", value: "New resume available" },
            { id: 3, type: "urgent", html: getLatestNotification() }
        ];
        render(<Notifications displayDrawer={true} listNotifications={listNotifications} />);

        const notificationItems = screen.getAllByTestId('notification-item');
        expect(notificationItems).toHaveLength(3);
    });

    test('first NotificationItem element renders the correct HTML', () => {
        const listNotifications = [
            { id: 1, type: "default", value: "New course available" },
            { id: 2, type: "urgent", value: "New resume available" },
            { id: 3, type: "urgent", html: getLatestNotification() }
        ];
        render(<Notifications displayDrawer={true} listNotifications={listNotifications} />);

        const notificationItems = screen.getAllByTestId('notification-item');

        expect(notificationItems[0]).toHaveAttribute('data-notification-type', 'default');
        expect(notificationItems[0].textContent).toBe('New course available');
    });

    test('last NotificationItem element renders HTML from getLatestNotification', () => {
        const listNotifications = [
            { id: 1, type: "default", value: "New course available" },
            { id: 2, type: "urgent", value: "New resume available" },
            { id: 3, type: "urgent", html: getLatestNotification() }
        ];
        render(<Notifications displayDrawer={true} listNotifications={listNotifications} />);

        const notificationItems = screen.getAllByTestId('notification-item');

        expect(notificationItems[2]).toHaveAttribute('data-urgent');
        expect(notificationItems[2].innerHTML).toBe('<strong>Urgent requirement</strong> - complete by EOD');
    });
});
