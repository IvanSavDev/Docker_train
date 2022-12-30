import React, { useEffect, useMemo, useState } from "react";
import AccountContext from "../context/AccountContext";
import { KeysLocalStorage } from "../consts/consts";
import {
  getDataFromLocalStorage,
  setDataInLocalStorage,
} from "../utils/localStorage";

const AccountProvider = ({ children }) => {
  const [accountId, setAccountId] = useState(null);
  const updateAccountId = () => {
    const accountsFromLocalStorage = getDataFromLocalStorage(
      KeysLocalStorage.userId
    );
    setAccountId(accountsFromLocalStorage);
  };

  useEffect(() => {
    updateAccountId();
  }, []);

  useEffect(() => {
    if (accountId) {
      setDataInLocalStorage(KeysLocalStorage.userId, accountId);
    }
  }, [accountId]);

  const getAccountId = () => accountId;

  const addAccountId = (id) =>
    setDataInLocalStorage(KeysLocalStorage.userId, id);

  const accountInfo = useMemo(
    () => ({ accountId, setAccountId, addAccountId }),
    [accountId, addAccountId, getAccountId]
  );

  return (
    <AccountContext.Provider value={accountInfo}>
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
