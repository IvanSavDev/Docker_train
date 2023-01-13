import React, { useEffect, useMemo, useState } from 'react';

import AccountContext from '../context/AccountContext';
import { KeysLocalStorage } from '../consts/consts';
import {
  getDataFromLocalStorage,
  setDataInLocalStorage,
} from '../utils/localStorage';
import { generateId } from '../utils/utils';

const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const loadAccountFromLocalStorage = () => {
    const accountId = getDataFromLocalStorage(KeysLocalStorage.userId);
    if (accountId) {
      const accounts = getDataFromLocalStorage(KeysLocalStorage.accounts);
      const accountFromLocalStorage = accounts[accountId];
      setAccount(accountFromLocalStorage);
    }
  };

  useEffect(() => {
    loadAccountFromLocalStorage();
  }, []);

  useEffect(() => {
    if (account) {
      const accounts = getDataFromLocalStorage(KeysLocalStorage.accounts) || {};
      setDataInLocalStorage(KeysLocalStorage.accounts, {
        ...accounts,
        [account.id]: { ...account },
      });
    }
  }, [account]);

  const updateAccount = (updatedAccount) => {
    setAccount(updatedAccount);
  };

  const addAccount = (newAccount) => {
    const id = generateId();
    setAccount({ id, ...newAccount });
    setDataInLocalStorage(KeysLocalStorage.userId, id);
  };

  const accountInfo = useMemo(
    () => ({
      account,
      loadAccountFromLocalStorage,
      addAccount,
      updateAccount,
    }),
    [account, loadAccountFromLocalStorage, addAccount, updateAccount],
  );

  return (
    <AccountContext.Provider value={accountInfo}>
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
