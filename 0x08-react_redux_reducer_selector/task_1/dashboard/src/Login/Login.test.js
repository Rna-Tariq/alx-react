import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../Login/Login';

describe("verify Login renders without crashing", () => {
    test('should render Login', () => { 
        render(<Login />);
        const loginDiv = screen.getByText(/Login to access the full dashboard/i).closest('div');
        expect(loginDiv).toBeInTheDocument();
    });

    test('Verify Login renders 2 input tags and 2 label tags', () => { 
        render(<Login />);
        const emailInput = screen.getByLabelText(/Email:/i);
        const passwordInput = screen.getByLabelText(/Password:/i);
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();

        const labelElements = screen.getAllByText((content, element) => {
            return element.tagName.toLowerCase() === 'label';
        });
        expect(labelElements).toHaveLength(2);          
    })
});