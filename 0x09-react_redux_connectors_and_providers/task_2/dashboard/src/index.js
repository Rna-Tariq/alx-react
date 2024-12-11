import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import uiReducer, { initialState } from "./reducers/uiReducer";
import { Map } from "immutable";
import { thunk } from "redux-thunk";

const store = createStore(uiReducer, Map(initialState), applyMiddleware(thunk));

const rootElement = document.getElementById('root');

const root = ReactDOM.createRoot(rootElement);
root.render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>
);