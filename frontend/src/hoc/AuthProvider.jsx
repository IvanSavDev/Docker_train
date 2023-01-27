import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import AuthContext from '../context/AuthContext';
import { KeysLocalStorage } from '../consts/consts';
import { clearSales } from '../store/slices/salesSlice';
import { clearProducts } from '../store/slices/productsSlice';
import { clearUser } from '../store/slices/userSlice';

const AuthProvider = ({ children }) => {
  const isLogged = !!localStorage.getItem(KeysLocalStorage.TOKEN);
  const dispatch = useDispatch();

  const [loggedIn, setLoggedIn] = useState(isLogged);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem(KeysLocalStorage.TOKEN);
    dispatch(clearProducts());
    dispatch(clearUser());
    dispatch(clearSales());
    setLoggedIn(false);
  };

  const authorizationInfo = useMemo(
    () => ({ loggedIn, logIn, logOut }),
    [logIn, logOut, loggedIn],
  );

  return (
    <AuthContext.Provider value={authorizationInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
