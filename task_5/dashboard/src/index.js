import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/App';
import Notifications from '../src/Notifications/Notifications';

const rootElement = document.getElementById('root');

const root = ReactDOM.createRoot(rootElement);
root.render(
    <StrictMode>
        <App />
    </StrictMode>
);

// const root_notifications = document.getElementById('root_notifications');

// const secRoot = ReactDOM.createRoot(root_notifications);
// secRoot.render(
//     <StrictMode>
//         <Notifications />
//     </StrictMode>
// );



