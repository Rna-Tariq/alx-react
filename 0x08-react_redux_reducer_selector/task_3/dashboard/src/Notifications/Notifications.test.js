import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Notifications from './Notifications';
import { getLatestNotification } from '../utils/utils';
import NotificationItem from './NotificationItem';

jest.mock('../utils/utils.js', () => ({
    getLatestNotification: jest.fn(() => '<strong>Urgent requirement</strong> - complete by EOD'),
}));

const listNotifications = [
    { id: 1, type: "default", value: "New course available" },
    { id: 2, type: "urgent", value: "New resume available" },
    { id: 3, type: "urgent", html: getLatestNotification() },
];

describe('Notifications component', () => {
    test('renders Notifications component without crashing', () => {
        render(<Notifications />);
        expect(screen.getByText(/Your notifications/i)).toBeInTheDocument();
    });

    // test('renders three list items', () => {
    //     render(<Notifications displayDrawer={true} listNotifications={listNotifications} />);
    //     const listItems = screen.getAllByTestId("notification-item");
    //     expect(listItems).toHaveLength(3);
    // });

    test('renders the text Your notifications"', () => {
        render(<Notifications displayDrawer={true} />);
        expect(screen.getByText(/Your notifications/i)).toBeInTheDocument();
    });

    test('should display the menu item when displayDrawer is false', () => {
        render(<Notifications displayDrawer={false} />);

        const menuItem = screen.getByTestId('menuItem');
        expect(menuItem).toBeInTheDocument();

        const notificationsDiv = screen.queryByTestId('notifications');
        expect(notificationsDiv).not.toBeInTheDocument();
    });

    test('should display the menu item when displayDrawer is true', () => {
        render(<Notifications displayDrawer={true} />);

        const menuItem = screen.getByTestId('menuItem');
        expect(menuItem).toBeInTheDocument();

        const notificationsDiv = screen.getByTestId('notifications');
        expect(notificationsDiv).toBeInTheDocument();
    });

    test('renders correctly with an empty array or without listNotifications', () => {
        render(<Notifications displayDrawer={true} />);

        const noNotificationsMessage = screen.getByText('No new notification for now');
        expect(noNotificationsMessage).toBeInTheDocument();

        const listMessage = screen.queryByText('Here is the list of notifications');
        expect(listMessage).toBeInTheDocument();
    });

    test('renders correctly with notifications in the listNotifications array', () => {
        const notifications = [
            { id: 1, type: 'default', value: 'New course available' },
            { id: 2, type: 'urgent', value: 'New resume available' },
        ];
        render(<Notifications displayDrawer={true} listNotifications={notifications} />);

        const listMessage = screen.getByText('Here is the list of notifications');
        expect(listMessage).toBeInTheDocument();

        const notificationItems = screen.getAllByRole('listitem');
        expect(notificationItems).toHaveLength(notifications.length);
    });

    test('calls console.log with the correct message when markAsRead is called', () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });

        const testId = 42;
        const markAsRead = (id) => {
            console.log(`Notification ${id} has been marked as read`);
        };

        const { container } = render(
            <NotificationItem id={testId} type="default" value="Test Notification" markAsRead={markAsRead} />
        );

        const instance = container.querySelector('li');
        instance.click();

        expect(consoleSpy).toHaveBeenCalledWith(`Notification ${testId} has been marked as read`);

        consoleSpy.mockRestore();
    });

    test("does not rerender when updating props with the same list", () => {
        const initialList = [
            { id: 1, type: "default", value: "Notification 1" },
            { id: 2, type: "urgent", value: "Notification 2" },
        ];
    
        const { container, rerender } = render(
            <Notifications listNotifications={initialList} displayDrawer={true} />
        );
    
        const initialHTML = container.innerHTML;
    
        rerender(<Notifications listNotifications={initialList} displayDrawer={true} />);
    
        const updatedHTML = container.innerHTML;
    
        expect(updatedHTML).toBe(initialHTML);
        });

        test("rerenders when updating props with a longer list", () => {
            const initialList = [
                { id: 1, type: "default", value: "Notification 1" },
                { id: 2, type: "urgent", value: "Notification 2" },
            ];
        
            const updatedList = [
                { id: 1, type: "default", value: "Notification 1" },
                { id: 2, type: "urgent", value: "Notification 2" },
                { id: 3, type: "default", value: "Notification 3" },
            ];
        
            const { container, rerender } = render(
                <Notifications listNotifications={initialList} displayDrawer={true} />
            );
        
            const initialHTML = container.innerHTML;
        
            rerender(<Notifications listNotifications={updatedList} displayDrawer={true} />);
        
            const updatedHTML = container.innerHTML;
        
            expect(updatedHTML).not.toBe(initialHTML);
            });

            test("displays notifications when displayDrawer is true", () => {
                render(
                    <Notifications
                        displayDrawer={true}
                        handleDisplayDrawer={jest.fn()}
                        handleHideDrawer={jest.fn()}
                    />
                );
                const notifications = screen.getByTestId("notifications");
                expect(notifications).toBeInTheDocument();
            });
        
            test("calls handleHideDrawer when close button is clicked", () => {
                const mockHandleHideDrawer = jest.fn();
                render(
                    <Notifications
                        displayDrawer={true}
                        handleDisplayDrawer={jest.fn()}
                        handleHideDrawer={mockHandleHideDrawer}
                    />
                );
        
                const closeButton = screen.getByTestId("Close Notifications");
                fireEvent.click(closeButton);
        
                expect(mockHandleHideDrawer).toHaveBeenCalledTimes(1);
            });
});
