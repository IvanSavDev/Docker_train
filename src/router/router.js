import React from "react";
import {
    createBrowserRouter, Navigate,
    RouterProvider,
} from "react-router-dom";

import {Paths} from "../consts/consts";
import App from "../components/App";
import SignIn from "../components/SignIn/SignIn";
import SignUp from "../components/SignUp/SignUp";


// const router = createBrowserRouter([
//     {
//         path: Paths.main,
//         element: <App />,
//     },
//     {
//         path: Paths.signIn,
//         element: <SignIn />
//     },
//     {
//         path: Paths.signUp,
//         element: <SignUp />
//     }
// ]);

const routers = [
    {
        path: "/",
        element: <SignIn />,
        private: false
    },
    {
        path: "/",
        element: <SignIn />,
        private: false
    },
    {
        path: Paths.signUp,
        element: <SignUp />,
        private: false
    },
    {
        path: Paths.signIn,
        element: <SignIn />,
        private: false
    },
    {
        path: '*',
        element: <Navigate to="/signin" />,
        private: false
    }
]

const AppRouter = () => {
    return <div>
        
    </div>
}

export default AppRouter;