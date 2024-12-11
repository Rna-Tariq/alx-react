import React from 'react';
import { render, cleanup } from '@testing-library/react';
import WithLogging from './WithLogging';
import Login from '../Login/Login';

describe('WithLogging HOC', () => {
    let consoleSpy;

    beforeEach(() => {
        consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    });

    afterEach(() => {
        consoleSpy.mockRestore();
        cleanup();
    });

    test('logs mount and unmount for a pure HTML component', () => {
        const WrappedHTML = WithLogging(() => <p>Test</p>);

        const { unmount } = render(<WrappedHTML />);
        expect(consoleSpy).toHaveBeenCalledWith('Component Component is mounted');

        unmount();
        expect(consoleSpy).toHaveBeenCalledWith(
            'Component Component is going to unmount'
        );
    });

    test('logs mount and unmount for the Login component', () => {
        const WrappedLogin = WithLogging(Login);

        const { unmount } = render(<WrappedLogin />);
        expect(consoleSpy).toHaveBeenCalledWith('Component Login is mounted');

        unmount();
        expect(consoleSpy).toHaveBeenCalledWith(
            'Component Login is going to unmount'
        );
    });
});
