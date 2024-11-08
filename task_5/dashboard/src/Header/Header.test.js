// src/Header/Header.test.js
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

test('renders the header text', () => {
    render(<Header />);
    const headerElement = screen.getByText(/welcome/i);
    expect(headerElement).toBeInTheDocument();  // Provided by jest-dom
});


// describe("Verify that the header renders", () => {
//     test('img and h1 tags', () => {
//         render(<Header />);
//         const headerDiv = screen.getByText(/School dashboard/i).closest('div');
//         expect(headerDiv).toHaveClass('App-header');
//     })

// });
