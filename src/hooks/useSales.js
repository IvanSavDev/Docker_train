import React, { useContext } from "react";
import ProductsContext from "../context/ProductsContext";
import SalesContext from "../context/SalesContext";

const useSales = () => useContext(SalesContext);

export default useSales;
