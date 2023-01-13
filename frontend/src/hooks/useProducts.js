import { useContext } from 'react';

import ProductsContext from '../context/ProductsContext';

const useProducts = () => useContext(ProductsContext);

export default useProducts;
