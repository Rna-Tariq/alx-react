import React from 'react';
import ReactDOM from 'react-dom'; // Use the old 'react-dom'
import App from './App';
import reportWebVitals from './reportWebVitals';
import Notifications from './Notifications';

// Render the main App component
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // This is the root div in index.html
);

// Render the Notifications component
ReactDOM.render(
  <React.StrictMode>
    <Notifications />
  </React.StrictMode>,
  document.getElementById('root-notifications') // This is another root div for notifications
);

// Measuring performance (optional)
reportWebVitals();
