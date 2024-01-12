import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';
import App from './pages/home-page/App';
import LoginFunc from './pages/login-page/Login';
import Books from './pages/books-page/Books';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'auth/login',
    element: <LoginFunc />,
  },
  {
    path: 'books',
    element: <Books />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
