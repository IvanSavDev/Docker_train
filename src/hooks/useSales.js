import React, { useContext } from "react";

import SalesContext from "../context/SalesContext";

const useSales = () => useContext(SalesContext);

export default useSales;
