import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom'; // Import ReactDOM from 'react-dom'

const isAuthenticated = false; // Set this to true if you want to skip the login dialog initially

ReactDOM.render(
  <React.StrictMode>
    <App isAuthenticated={isAuthenticated} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
