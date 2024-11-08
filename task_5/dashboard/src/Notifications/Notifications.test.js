import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Notifications from './Notifications';
import { getLatestNotification } from './utils';

jest.mock('./utils', () => ({
    getLatestNotification: jest.fn(() => '<strong>Urgent requirement</strong> - complete by EOD'),
}));

describe('Notifications component', () => {
    test('renders Notifications component without crashing', () => {
        render(<Notifications />);
        expect(screen.getByText(/Here is the list of notifications/i)).toBeInTheDocument();
    });

    test('renders three list items', () => {
        render(<Notifications />);
        const listItems = screen.getAllByRole('listitem');
        expect(listItems).toHaveLength(3);
    });

    test('renders the text "Here is the list of notifications"', () => {
        render(<Notifications />);
        expect(screen.getByText(/Here is the list of notifications/i)).toBeInTheDocument();
    });
});
