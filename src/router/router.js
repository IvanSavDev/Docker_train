import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";

import {Paths} from "../consts/consts";
import SignIn from "../Pages/SignIn/SignIn";
import SignUp from "../Pages/SignUp/SignUp";
import Main from "../Pages/Main/Main";
import MyProduct from "../Pages/MyProduct/MyProduct";
import MySales from "../Pages/MySales/MySales";
import PersonalCabinet from "../Pages/PersonalCabinet/PersonalCabinet";
import useAuth from "../hooks/useAuth";

const routers = [
    {
        path: Paths.signUp,
        element: <SignUp/>,
        private: false
    },
    {
        path: Paths.signIn,
        element: <SignIn/>,
        private: false
    },
    {
        path: '*',
        element: <Navigate to={Paths.signIn}/>,
        private: false
    },
    {
        path: Paths.base,
        element: <Main/>,
        private: true
    },
    {
        path: Paths.myProduct,
        element: <MyProduct/>,
        private: true
    },
    {
        path: Paths.mySales,
        element: <MySales/>,
        private: true
    },
    {
        path: Paths.personalCabinet,
        element: <PersonalCabinet/>,
        private: true
    },
    {
        path: '*',
        element: <Navigate to={Paths.main}/>,
        private: true
    }

]

const AppRouter = () => {
    const {loggedIn} = useAuth();
    console.log(loggedIn)
    return <Routes>
        {routers
            .filter(router => loggedIn ? router.private : !router.private)
            .map((router, index) => <Route key={index} path={router.path} element={router.element}/>)
        }
    </Routes>
}

export default AppRouter;