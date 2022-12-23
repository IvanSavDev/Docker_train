import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import App from './components/App';
import SignIn from "./components/SignIn/SignIn";

import './index.css';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/signin",
        element: <SignIn />
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
