import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "./Footer";
import { AppContext } from "../App/AppContext";

describe('Footer Component', () => {
    test('should render the Footer component', () => {
        const contextValue = {
            user: {
                isLoggedIn: false,
                email: ''
            },
            logOut: jest.fn()
        };

        render(
            <AppContext.Provider value={contextValue}>
                <Footer />
            </AppContext.Provider>
        );

        const footerDiv = screen.getByText(/Copyright/i).closest('div');
        expect(footerDiv).toBeInTheDocument();
    });

    test('does not display contact link when user is not logged in', () => {
        const contextValue = {
            user: {
                isLoggedIn: false,
                email: ''
            },
            logOut: jest.fn()
        };

        render(
            <AppContext.Provider value={contextValue}>
                <Footer />
            </AppContext.Provider>
        );

        const contactLink = screen.queryByText('Contact us');
        expect(contactLink).not.toBeInTheDocument();
    });

    test('displays contact link when user is logged in', () => {
        const contextValue = {
            user: {
                isLoggedIn: true,
                email: 'test@example.com'
            },
            logOut: jest.fn()
        };

        render(
            <AppContext.Provider value={contextValue}>
                <Footer />
            </AppContext.Provider>
        );

        const contactLink = screen.getByText('Contact us');
        expect(contactLink).toBeInTheDocument();
    });
});