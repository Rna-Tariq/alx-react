import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import uiReducer, { initialState } from "./reducers/uiReducer";

import { Map } from "immutable";

const store = createStore(uiReducer, Map(initialState));
const rootElement = document.getElementById('root');

const root = ReactDOM.createRoot(rootElement);
root.render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>
);