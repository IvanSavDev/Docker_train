import React, { useEffect, useMemo, useState } from "react";
import SalesContext from "../context/SalesContext";
import { KeysLocalStorage } from "../consts/consts";
import {
  getDataFromLocalStorage,
  setDataInLocalStorage,
} from "../utils/localStorage";
import { isEmptyObject } from "../utils/utils";

const SalesProvider = ({ children }) => {
  const [sales, setSales] = useState(null);

  const updateSales = () => {
    const salesFromLocalStorage = getDataFromLocalStorage(
      KeysLocalStorage.sales
    );
    const accountId = getDataFromLocalStorage(KeysLocalStorage.userId);
    if (salesFromLocalStorage) {
      const accountSales = Object.values(salesFromLocalStorage)
        .sort((a, b) => a.creationDate > b.creationDate)
        .reduce((acc, sale) => {
          if (sale.accountId === accountId) {
            return { [sale.id]: { ...sale }, ...acc };
          } else {
            return acc;
          }
        }, {});
      setSales(accountSales);
    }
  };

  useEffect(() => {
    updateSales();
  }, []);

  useEffect(() => {
    if (sales) {
      setDataInLocalStorage(KeysLocalStorage.sales, {
        ...sales,
      });
    }
  }, [sales]);

  const updateSale = (id, updatedSales) => {
    setSales((prevState) => ({
      ...prevState,
      [id]: updatedSales,
    }));
  };

  const getSale = (id) => sales[id];

  const addSale = (product) => {
    const accountId = getDataFromLocalStorage(KeysLocalStorage.userId);
    const id = Date.now() + 1;
    const updatedProduct = {
      [id]: { id, accountId: accountId, ...product },
      ...sales,
    };
    setSales(updatedProduct);
  };

  const salesInfo = useMemo(
    () => ({ sales, updateSale, getSale, addSale }),
    [sales, updateSale, getSale, addSale]
  );

  return (
    <SalesContext.Provider value={salesInfo}>{children}</SalesContext.Provider>
  );
};

export default SalesProvider;
