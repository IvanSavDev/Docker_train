import React, { useEffect, useMemo, useState } from "react";
import SalesContext from "../context/SalesContext";
import { KeysLocalStorage } from "../consts/consts";
import {
  getDataFromLocalStorage,
  setDataInLocalStorage,
} from "../utils/localStorage";
import { isEmptyObject } from "../utils/utils";

const AccountsProvider = ({ children }) => {
  const [sales, setSales] = useState({});

  const updateSales = () => {
    const accountsFromLocalStorage = getDataFromLocalStorage(
      KeysLocalStorage.sales
    );
    setSales(accountsFromLocalStorage || {});
  };

  useEffect(() => {
    updateSales();
  }, []);

  useEffect(() => {
    if (!isEmptyObject(sales)) {
      setDataInLocalStorage(KeysLocalStorage.sales, sales);
    }
  }, [sales]);

  const updateSale = (id, updatedAccount) => {
    setSales((prevState) => ({
      ...prevState,
      [id]: { ...updatedAccount },
    }));
  };
  const getSale = (id) => sales[id];

  const addSale = (newSales) => {
    const id = Date.now();
    setSales((prevState) => ({
      ...prevState,
      [id]: { ...newSales },
    }));
  };

  const salesInfo = useMemo(
    () => ({ sales, updateSales, updateSale, getSale, addSale }),
    [sales, updateSales, updateSale, getSale, addSale]
  );

  return (
    <SalesContext.Provider value={salesInfo}>{children}</SalesContext.Provider>
  );
};

export default AccountsProvider;
