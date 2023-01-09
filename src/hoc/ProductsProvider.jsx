import React, { useEffect, useMemo, useState } from "react";

import ProductsContext from "../context/ProductsContext";
import { KeysLocalStorage } from "../consts/consts";
import {
  getDataFromLocalStorage,
  setDataInLocalStorage,
} from "../utils/localStorage";
import { generateId } from "../utils/utils";

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(null);

  const updateProducts = () => {
    const productsFromLocalStorage = getDataFromLocalStorage(
      KeysLocalStorage.products
    );

    const accountId = getDataFromLocalStorage(KeysLocalStorage.userId);
    if (productsFromLocalStorage) {
      const accountProductsReduce = Object.values(productsFromLocalStorage)
        .sort(
          (firstProduct, secondProduct) =>
            firstProduct.creationDate - secondProduct.creationDate
        )
        .reduce((acc, product) => {
          if (product.accountId === accountId) {
            return { [product.id]: { ...product }, ...acc };
          } else {
            return acc;
          }
        }, {});

      setProducts(accountProductsReduce);
    }
  };

  useEffect(() => {
    updateProducts();
  }, []);

  useEffect(() => {
    if (products) {
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
      [id]: { ...prevState[id], ...updatedProduct },
    }));
  };

  const getProduct = (id) => products[id];

  const deleteProduct = (id) => {
    const copyProducts = { ...products };
    delete copyProducts[id];
    setProducts(copyProducts);
  };

  const addProduct = (product) => {
    const accountId = getDataFromLocalStorage(KeysLocalStorage.userId);
    const id = generateId();
    const createdProduct = {
      ...product,
      id,
      accountId: accountId,
      creationDate: Date.now(),
    };

    setProducts((prevState) => ({
      [id]: createdProduct,
      ...prevState,
    }));
  };

  const productsInfo = useMemo(
    () => ({
      products,
      updateProduct,
      updateProducts,
      addProduct,
      deleteProduct,
      getProduct,
    }),
    [products, addProduct, deleteProduct, getProduct, updateProducts]
  );

  return (
    <ProductsContext.Provider value={productsInfo}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
