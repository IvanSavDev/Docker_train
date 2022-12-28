import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";

import {Paths} from "../consts/consts";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import Main from "../pages/Main/Main";
import MyProduct from "../pages/MyProduct/MyProduct";
import MySales from "../pages/MySales/MySales";
import PersonalCabinet from "../pages/PersonalCabinet/PersonalCabinet";
import useAuth from "../hooks/useAuth";
import PersonalPage from "../pages/PersonalPage";

const routers = [
    {
        path: Paths.signUp,
        element: <SignUp/>,
        private: false,
    },
    {
        path: Paths.signIn,
        element: <SignIn/>,
        private: false,
    },
    {
        path: '*',
        element: <Navigate to={Paths.signIn}/>,
        private: false,
    },
    {
        path: Paths.base,
        element: <PersonalPage/>,
        private: true,
        children: [
            {
                path: Paths.main,
                element: <Main/>,
                private: true,
                index: true
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
        ]
    },
    {
        path: '*',
        element: <Navigate to={Paths.base}/>,
        private: true
    }

]

const AppRouter = () => {
    const {loggedIn} = useAuth();

    return <Routes>
        {routers
            .filter(router => loggedIn ? router.private : !router.private)
            .map((router, index) => (
                <Route key={index} path={router.path} element={router.element}>
                    {router?.children?.map((childRouter, index) => (
                        childRouter.index
                            ? <Route
                                key={index}
                                element={childRouter.element}
                                index
                            />
                            : <Route
                                key={index}
                                path={childRouter.path}
                                element={childRouter.element}
                            />
                    ))}
                </Route>
            ))
        }
    </Routes>
}

export default AppRouter;