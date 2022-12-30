import React, { useEffect, useMemo, useState } from "react";
import { KeysLocalStorage } from "../consts/consts";
import {
  getDataFromLocalStorage,
  setDataInLocalStorage,
} from "../utils/localStorage";
import ProductsContext from "../context/ProductsContext";
import { isEmptyObject } from "../utils/utils";
import useAccount from "../hooks/useAccount";

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState({});

  const updateProducts = () => {
    const productsFromLocalStorage = getDataFromLocalStorage(
      KeysLocalStorage.products
    );

    setProducts(productsFromLocalStorage || {});
  };

  useEffect(() => {
    updateProducts();
  }, []);

  useEffect(() => {
    if (!isEmptyObject(products)) {
      const productsFromLocalStorage = getDataFromLocalStorage(
        KeysLocalStorage.products
      );
      setDataInLocalStorage(KeysLocalStorage.products, {
        ...productsFromLocalStorage,
        ...products,
      });
    }
  }, [products]);

  const updateProduct = (id, updatedProduct) => {
    setProducts((prevState) => ({
      ...prevState,
      [id]: updatedProduct,
    }));
  };
  const getProducts = (accountId) =>
    Object.values(products).filter(
      (product) => product.accountId === accountId
    );

  const getProduct = (id) => products[id];

  const deleteProduct = (id) => {
    const copyProducts = { ...products };
    delete copyProducts[id];
    setProducts(copyProducts);
  };

  const addProduct = (product) => {
    const id = Date.now() + 1;
    setProducts((prevState) => ({
      [id]: { id, ...product },
      ...prevState,
    }));
  };

  const productsInfo = useMemo(
    () => ({
      products,
      updateProduct,
      getProduct,
      addProduct,
      deleteProduct,
      updateProducts,
      getProducts,
    }),
    [
      products,
      updateProduct,
      getProduct,
      addProduct,
      deleteProduct,
      getProducts,
    ]
  );

  return (
    <ProductsContext.Provider value={productsInfo}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
