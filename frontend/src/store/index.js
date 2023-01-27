import { configureStore } from '@reduxjs/toolkit';

import updatedAxios from '../utils/axios';
import salesSlice from './slices/salesSlice';
import productsSlice from './slices/productsSlice';
import userSlice from './slices/userSlice';
import modalsSlice from './slices/modalSlice';

const store = configureStore({
  reducer: {
    products: productsSlice,
    sales: salesSlice,
    user: userSlice,
    modal: modalsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          axios: updatedAxios,
        },
      },
    }),
});

export default store;
