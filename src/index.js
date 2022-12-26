import React from 'react';
import ReactDOM from 'react-dom/client';

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import App from './components/App';
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import {Paths} from "./consts/consts";

import './index.css';

const router = createBrowserRouter([
    {
        path: Paths.main,
        element: <App />,
    },
    {
        path: Paths.signIn,
        element: <SignIn />
    },
    {
        path: Paths.signUp,
        element: <SignUp />
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
