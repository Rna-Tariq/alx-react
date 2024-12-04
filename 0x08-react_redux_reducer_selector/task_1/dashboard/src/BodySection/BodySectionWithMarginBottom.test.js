import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';

describe('test body section with margin bottom', () => {
    test('should render correctly a BodySection', () => { 
        render(<BodySectionWithMarginBottom title="test title"><p>test children node</p></BodySectionWithMarginBottom>);

        const bodySection_h2 = screen.getAllByText(/test title/i);
        const bodySection_p = screen.getAllByText(/test children node/i);
        expect(bodySection_h2).toHaveLength(1);
        expect(bodySection_p).toHaveLength(1);
    });
});