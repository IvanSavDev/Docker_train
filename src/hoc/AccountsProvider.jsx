import React, { useEffect, useMemo, useState } from "react";
import AccountsContext from "../context/AccountsContext";
import { KeysLocalStorage } from "../consts/consts";
import {
  getDataFromLocalStorage,
  setDataInLocalStorage,
} from "../utils/localStorage";
import { isEmptyObject } from "../utils/utils";

const AccountsProvider = ({ children }) => {
  const [accounts, setAccounts] = useState({});
  const updateAccounts = () => {
    const accountsFromLocalStorage = getDataFromLocalStorage(
      KeysLocalStorage.accounts
    );
    setAccounts(accountsFromLocalStorage || {});
  };

  useEffect(() => {
    updateAccounts();
  }, []);

  useEffect(() => {
    if (!isEmptyObject(accounts)) {
      setDataInLocalStorage(KeysLocalStorage.accounts, accounts);
    }
  }, [accounts]);

  const updateAccount = (id, updatedAccount) => {
    setAccounts((prevState) => ({
      ...prevState,
      [id]: updatedAccount,
    }));
  };
  const getAccount = (id) => accounts[id];

  const addAccount = (account) => {
    const id = Date.now();
    setAccounts((prevState) => ({
      ...prevState,
      [id]: { ...account },
    }));
  };

  const accountsInfo = useMemo(
    () => ({ accounts, updateAccount, updateAccounts, getAccount, addAccount }),
    [accounts, getAccount, updateAccount]
  );

  return (
    <AccountsContext.Provider value={accountsInfo}>
      {children}
    </AccountsContext.Provider>
  );
};

export default AccountsProvider;
