import { getFullYear, getFooterCopy, getLatestNotification } from "./utils";

describe('Utility Functions', () => {
    test('getFullYear returns the current year', () => {
        expect(getFullYear()).toBe(new Date().getFullYear());
    });

    test('getFooterCopy returns "Holberton School" when the argument is true', () => {
        expect(getFooterCopy(true)).toBe("Holberton School");
    });

    test('getFooterCopy returns "Holberton School main dashboard" when the argument is false', () => {
        expect(getFooterCopy(false)).toBe("Holberton School main dashboard");
    });

    test('getLatestNotification returns the expected notification string', () => {
        expect(getLatestNotification()).toBe("<strong>Urgent requirement</strong> - complete by EOD");
    });
});
