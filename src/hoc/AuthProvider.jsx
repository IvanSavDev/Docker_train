import React, { useMemo, useState } from "react";

import AuthContext from "../context/AuthContext";
import { KeysLocalStorage } from "../consts/consts";

const AuthProvider = ({ children }) => {
  const isLogged = !!localStorage.getItem(KeysLocalStorage.userId);

  const [loggedIn, setLoggedIn] = useState(isLogged);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem(KeysLocalStorage.userId);
    setLoggedIn(false);
  };

  const authorizationInfo = useMemo(
    () => ({ loggedIn, logIn, logOut }),
    [logIn, logOut, loggedIn]
  );

  return (
    <AuthContext.Provider value={authorizationInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
