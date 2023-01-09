import React, { useEffect, useMemo, useState } from "react";

import SalesContext from "../context/SalesContext";
import { KeysLocalStorage } from "../consts/consts";
import {
  getDataFromLocalStorage,
  setDataInLocalStorage,
} from "../utils/localStorage";
import { generateId } from "../utils/utils";

const SalesProvider = ({ children }) => {
  const [sales, setSales] = useState(null);

  const updateSales = () => {
    const salesFromLocalStorage = getDataFromLocalStorage(
      KeysLocalStorage.sales
    );
    const accountId = getDataFromLocalStorage(KeysLocalStorage.userId);
    if (salesFromLocalStorage) {
      const accountSales = Object.values(salesFromLocalStorage)
        .sort(
          (firstProduct, secondProduct) =>
            firstProduct.creationDate - secondProduct.creationDate
        )
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
      const salesFromLocalStorage = getDataFromLocalStorage(
        KeysLocalStorage.sales
      );
      setDataInLocalStorage(KeysLocalStorage.sales, {
        ...salesFromLocalStorage,
        ...sales,
      });
    }
  }, [sales]);

  const updateSale = (id, updatedSales) => {
    setSales((prevState) => ({
      ...prevState,
      [id]: { ...prevState[id], ...updatedSales },
    }));
  };

  const addSale = (sale) => {
    const id = generateId();
    const updatedProduct = {
      [id]: { ...sale, id },
      ...sales,
    };
    setSales(updatedProduct);
  };

  const getSale = (id) => sales[id];

  const salesInfo = useMemo(
    () => ({ sales, updateSale, addSale, getSale, updateSales }),
    [sales, updateSale, addSale, getSale, updateSales]
  );

  return (
    <SalesContext.Provider value={salesInfo}>{children}</SalesContext.Provider>
  );
};

export default SalesProvider;
