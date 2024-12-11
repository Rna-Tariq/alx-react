import '@testing-library/jest-dom';
import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();


// Mock global document if necessary
if (typeof document !== 'undefined') {
    document.querySelector = jest.fn(() => null);
}
