import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
const Context = lazy(() => import("./ContextProvider/Context"));
const ContextAdmin = lazy(() => import("./Admin/ContextAdmin/ContextAdmin"));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context>
    <ContextAdmin>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContextAdmin>
  </Context>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
