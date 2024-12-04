import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';
import { AppContext } from "../App/AppContext";


describe("Verify that the header renders", () => {
    test('img and h1 tags', () => {
        render(<Header />);

        const imgElement = screen.getByRole('img', { name: /Holberton/i });
        expect(imgElement).toBeInTheDocument();

        const headingElemnt = screen.getByText(/School dashboard/i);
        expect(headingElemnt).toBeInTheDocument();
    });

    test("does not create logoutSection with default context value", () => {
        render(
            <AppContext.Provider value={{ user: { isLoggedIn: false }, logOut: jest.fn() }}>
                <Header />
            </AppContext.Provider>
        );

        const logoutSection = screen.queryByText(/logout/i);
        expect(logoutSection).not.toBeInTheDocument();
    });

    test("creates logoutSection when user is logged in", () => {
        render(
            <AppContext.Provider
                value={{ user: { isLoggedIn: true, email: "user@test.com" }, logOut: jest.fn() }}
            >
                <Header />
            </AppContext.Provider>
        );

        const logoutSection = screen.getByText(/Welcome/i);
        expect(logoutSection).toBeInTheDocument();

        expect(screen.getByText(/user@test.com/i)).toBeInTheDocument();
    });

    test("calls logOut when clicking on the logout link", () => {
        const logOutSpy = jest.fn();

        render(
            <AppContext.Provider
                value={{ user: { isLoggedIn: true, email: "user@test.com" }, logOut: logOutSpy }}
            >
                <Header />
            </AppContext.Provider>
        );

        const logoutLink = screen.getByText(/logout/i);
        fireEvent.click(logoutLink);

        expect(logOutSpy).toHaveBeenCalledTimes(1);
    });
});
