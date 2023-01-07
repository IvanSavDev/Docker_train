import React, { useEffect, useMemo, useState } from "react";
import { KeysLocalStorage } from "../consts/consts";
import {
  getDataFromLocalStorage,
  setDataInLocalStorage,
} from "../utils/localStorage";
import ProductsContext from "../context/ProductsContext";

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
            firstProduct.creationDate > secondProduct.creationDate
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
      setDataInLocalStorage(KeysLocalStorage.products, {
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

  const getProduct = (id) => products[id];

  const deleteProduct = (id) => {
    const copyProducts = { ...products };
    delete copyProducts[id];
    setProducts(copyProducts);
  };

  const addProduct = (product) => {
    const accountId = getDataFromLocalStorage(KeysLocalStorage.userId);
    const id = Date.now() + 1;
    const updatedProduct = {
      [id]: { id, accountId: accountId, ...product },
      ...products,
    };
    setProducts(updatedProduct);
  };

  const productsInfo = useMemo(
    () => ({
      products,
      updateProduct,
      addProduct,
      deleteProduct,
      updateProducts,
      getProduct,
    }),
    [products, updateProduct, addProduct, deleteProduct, getProduct]
  );

  return (
    <ProductsContext.Provider value={productsInfo}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
