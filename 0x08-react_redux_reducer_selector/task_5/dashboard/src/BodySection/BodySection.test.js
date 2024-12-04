import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import BodySection from './BodySection';

describe('test body section', ()=> {
    test('should render correctly the children and one h2 element', () => { 
        render(<BodySection title="test title"><p>test children node</p></BodySection>);

        const bodySection_h2 = screen.getAllByText(/test title/i);
        const bodySection_p = screen.getAllByText(/test children node/i);
        expect(bodySection_h2).toHaveLength(1);
        expect(bodySection_p).toHaveLength(1);
    });
});