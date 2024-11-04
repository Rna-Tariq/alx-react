import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { getFullYear, getFooterCopy } from './utils';

jest.mock('./utils', () => ({
    getFooterCopy: jest.fn(() => 'Holberton School'),
    getFullYear: jest.fn(() => 2024),
}));

describe('App component', () => {
    test('renders App component without crashing', () => {
        render(<App />);
        expect(screen.getByText(/School dashboard/i)).toBeInTheDocument();
    });

    test('renders a div with the class App-header', () => {
        render(<App />);
        const headerDiv = screen.getByText(/School dashboard/i).closest('div');
        expect(headerDiv).toHaveClass('App-header');
    });

    test('renders a div with the class App-body', () => {
        render(<App />);
        const bodyDiv = screen.getByText(/Login to access the full dashboard/i).closest('div');
        expect(bodyDiv).toHaveClass('App-body');
    });

    test('renders a div with the class App-footer', () => {
        render(<App />);
        const expectedFooterText = `Copyright ${getFullYear()} - ${getFooterCopy()}`;
        const footerText = screen.getByText(expectedFooterText);
        const footerDiv = footerText.closest('div');
        expect(footerDiv).toHaveClass('App-footer');
    });
    
});
