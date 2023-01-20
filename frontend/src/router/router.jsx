import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Paths } from '../consts/consts';
import SignIn from '../pages/SignIn/SignIn';
import SignUp from '../pages/SignUp/SignUp';
import Main from '../pages/Main/Main';
import MyProduct from '../pages/MyProduct/MyProduct';
import MySales from '../pages/MySales/MySales';
import PersonalCabinet from '../pages/PersonalCabinet/PersonalCabinet';
import useAuth from '../hooks/useAuth';
import PersonalPage from '../pages/PersonalPage';
import { generateId } from '../utils/utils';

const routers = [
  {
    path: Paths.SIGN_UP,
    element: <SignUp />,
    private: false,
  },
  {
    path: Paths.SIGN_IN,
    element: <SignIn />,
    private: false,
  },
  {
    path: '*',
    element: <Navigate to={Paths.SIGN_IN} />,
    private: false,
  },
  {
    path: Paths.BASE,
    element: <PersonalPage />,
    private: true,
    children: [
      {
        path: Paths.MAIN,
        element: <Main />,
        private: true,
        index: true,
      },
      {
        path: Paths.MY_PRODUCT,
        element: <MyProduct />,
        private: true,
      },
      {
        path: Paths.MY_SALES,
        element: <MySales />,
        private: true,
      },
      {
        path: Paths.PERSONAL_CABINET,
        element: <PersonalCabinet />,
        private: true,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={Paths.BASE} />,
    private: true,
  },
];

const AppRouter = () => {
  const { loggedIn } = useAuth();

  return (
    <Routes>
      {routers
        .filter((router) => (loggedIn ? router.private : !router.private))
        .map((router) => (
          <Route key={generateId()} path={router.path} element={router.element}>
            {router?.children?.map((childRouter) =>
              childRouter.index ? (
                <Route key={generateId()} element={childRouter.element} index />
              ) : (
                <Route
                  key={generateId()}
                  path={childRouter.path}
                  element={childRouter.element}
                />
              ),
            )}
          </Route>
        ))}
    </Routes>
  );
};

export default AppRouter;
