import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Notifications from '../Notifications/Notifications';
import Login from '../Login/Login';
import { fromJS } from 'immutable';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import uiReducer, { initialState } from "../reducers/uiReducer";
import { mapStateToProps } from './App';
import { App } from './App';
import { Map } from "immutable";

const store = createStore(uiReducer, Map(initialState));

describe('App component', () => {
    test('renders App component without crashing', () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>);
        const appDiv = screen.getByTestId('app');
        expect(appDiv).toBeInTheDocument();
    });

    test('should render header', () => {
        render(<Header />);

        const headerDiv = screen.getByText(/School dashboard/i).closest('div');
        expect(headerDiv).toBeInTheDocument();
    });

    test('should render Login', () => {
        render(<Login />);

        const loginDiv = screen.getByText(/Login to access the full dashboard/i).closest('div');
        expect(loginDiv).toBeInTheDocument();
    });

    test('should render Notifications', () => {
        render(<Notifications />);

        const notifications = screen.getByText(/Your notifications/i);
        expect(notifications).toBeInTheDocument();
    });

    test('should render Footer', () => {
        render(<Footer />);

        const footerDiv = screen.getByText(/Copyright/i).closest('div');
        expect(footerDiv).toBeInTheDocument();
    });

    test('should check that CourseList is not displayed', () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>);

        const courseList = screen.queryByTestId('course-list');
        expect(courseList).not.toBeInTheDocument();

        const loginComponent = screen.getByTestId('login-component');
        expect(loginComponent).toBeInTheDocument();
    });

    test("shows CourseList after logging in", () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const loginButton = screen.getByText(/Ok/i);

        fireEvent.change(emailInput, { target: { value: "user@test.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });
        fireEvent.click(loginButton);

        // const courseList = screen.getByTestId("course-list");
        // expect(courseList).toBeInTheDocument();
        expect(screen.getByText(/Course name/i)).toBeInTheDocument();
        expect(screen.getByText(/Credit/i)).toBeInTheDocument();
    });

    test('calls logIn with the correct arguments', () => {
        const logInMock = jest.fn();
        render(<Login logIn={logInMock} />);

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const submitButton = screen.getByText(/ok/i);

        fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(submitButton);

        expect(logInMock).toHaveBeenCalledWith('test@test.com', 'password123');
    });

    test('logOut function resets user state to default', () => {
        const { container } = render(
            <Provider store={store}>
                <App />
            </Provider>
        );

        const emailInput = container.querySelector('input[name="email"]');
        const passwordInput = container.querySelector('input[name="password"]');
        const submitButton = container.querySelector('input[type="submit"]');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(submitButton);

        expect(screen.getByText('Welcome')).toBeInTheDocument();

        const logoutLink = screen.getByText('logout');
        fireEvent.click(logoutLink);

        expect(screen.queryByText('Welcome')).not.toBeInTheDocument();
        expect(screen.getByText('Login to access the full dashboard')).toBeInTheDocument();
    });
});

describe("Notifications Component", () => {
    test("default state for displayDrawer is false", () => {
        render(<Notifications />);

        const menuItem = screen.getByTestId("menuItem");
        expect(menuItem).toBeInTheDocument();

        const notifications = screen.queryByTestId("notifications");
        expect(notifications).not.toBeInTheDocument();
    });

    test("displays notifications when menu item is clicked", () => {
        const mockHandleDisplayDrawer = jest.fn();
        render(
            <Notifications
                displayDrawer={false}
                handleDisplayDrawer={mockHandleDisplayDrawer}
                listNotifications={[]}
            />
        );

        const menuItem = screen.getByTestId("menuItem");
        fireEvent.click(menuItem);

        expect(mockHandleDisplayDrawer).toHaveBeenCalledTimes(1);
    });

    test("displays notifications when displayDrawer is true", () => {
        render(
            <Notifications
                displayDrawer={true}
                listNotifications={[]}
            />
        );

        const notifications = screen.getByTestId("notifications");
        expect(notifications).toBeInTheDocument();
    });

    test("hides notifications when close button is clicked", () => {
        const mockHandleHideDrawer = jest.fn();
        render(
            <Notifications
                displayDrawer={true}
                handleHideDrawer={mockHandleHideDrawer}
                listNotifications={[]}
            />
        );

        const closeButton = screen.getByTestId("Close Notifications");
        fireEvent.click(closeButton);

        expect(mockHandleHideDrawer).toHaveBeenCalledTimes(1);
    });

    test("renders correct number of NotificationItems", () => {
        const testNotifications = [
            { id: 1, type: 'default', value: 'New course available' },
            { id: 2, type: 'urgent', value: 'New resume available' }
        ];

        render(
            <Notifications
                displayDrawer={true}
                listNotifications={testNotifications}
            />
        );

        const notificationItems = screen.getAllByRole('listitem');
        expect(notificationItems).toHaveLength(testNotifications.length);
    });

    test("renders 'No new notification for now' when list is empty", () => {
        render(
            <Notifications
                displayDrawer={true}
                listNotifications={[]}
            />
        );

        const noNotificationText = screen.getByText('No new notification for now');
        expect(noNotificationText).toBeInTheDocument();
    });

    test('does nothing for non-existent notification ID', () => {
        const component = new App({}); // Create an instance of the plain App class

        const mockNotifications = [
            { id: 1, value: "Notification 1", type: "default" },
            { id: 2, value: "Notification 2", type: "urgent" },
        ];

        component.state = {
            ...component.state,
            listNotifications: mockNotifications, // Set initial state
        };

        component.markNotificationAsRead(999); // Call the method with a non-existent ID

        // Assert that the notifications list remains unchanged
        expect(component.state.listNotifications).toEqual(mockNotifications);
        expect(component.state.listNotifications.length).toBe(2);
    });
});

describe('mapStateToProps', () => {
    test('returns correct values when isUserLoggedIn is true and isNotificationDrawerVisible is true', () => {
        const state = fromJS({
            isUserLoggedIn: true,
            isNotificationDrawerVisible: true,
        });

        const props = mapStateToProps(state);

        expect(props).toEqual({
            isLoggedIn: true,
            displayDrawer: true,
        });
    });

    test('returns correct values when isUserLoggedIn is false and isNotificationDrawerVisible is false', () => {
        const state = fromJS({
            isUserLoggedIn: false,
            isNotificationDrawerVisible: false,
        });

        const props = mapStateToProps(state);

        expect(props).toEqual({
            isLoggedIn: false,
            displayDrawer: false,
        });
    });
});
