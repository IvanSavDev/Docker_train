import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';

import routes from '../routes';
import productsSlice from '../slices/productsSlice';
import salesSlice from '../slices/salesSlice';
import userSlice from '../slices/userSlice';

const store = configureStore({
  reducer: {
    products: productsSlice,
    sales: salesSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          axios,
          routes,
        },
      },
    }),
});

export default store;
