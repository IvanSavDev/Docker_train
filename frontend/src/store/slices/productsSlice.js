import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { debounceAsyncFunction } from '../../utils/utils';
import { Routes, Statuses } from '../../consts/consts';

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (_, { extra: { axios }, rejectWithValue }) => {
    try {
      const req = () => axios.get(Routes.PRODUCTS);
      const request = await debounceAsyncFunction(req);
      return request.data;
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status,
        errors: error.response?.data?.errors || [],
      });
    }
  },
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, { extra: { axios }, rejectWithValue }) => {
    try {
      const req = () => axios.delete(`${Routes.PRODUCTS}/${id}`);
      await debounceAsyncFunction(req);
      return id;
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status,
        errors: error.response?.data?.errors || [],
      });
    }
  },
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (data, { extra: { axios }, rejectWithValue }) => {
    try {
      const req = () => axios.post(Routes.PRODUCT, data);
      const request = await debounceAsyncFunction(req);
      return request.data;
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status,
        errors: error.response?.data?.errors || [],
      });
    }
  },
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (data, { extra: { axios }, rejectWithValue }) => {
    try {
      const req = () => axios.patch(`${Routes.PRODUCTS}/${data.id}`, data);
      const request = await debounceAsyncFunction(req);
      return request.data;
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status,
        errors: error.response?.data?.errors || [],
      });
    }
  },
);

const initialState = {
  products: null,
  status: Statuses.FULFILLED,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.products = null;
      state.status = Statuses.FULFILLED;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.products = payload;
      })
      .addCase(createProduct.fulfilled, (state, { payload }) => {
        state.products = [{ ...payload }, ...state.products];
      })
      .addCase(updateProduct.fulfilled, (state, { payload }) => {
        state.products = state.products.map((product) =>
          product.id === payload.id ? payload : product,
        );
      })
      .addCase(deleteProduct.fulfilled, (state, { payload }) => {
        state.products = state.products.filter(
          (product) => product.id !== payload,
        );
      })
      .addMatcher(
        (action) =>
          action.type.startsWith('products') &&
          action.type.endsWith(Statuses.FULFILLED),
        (state) => {
          state.status = Statuses.FULFILLED;
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith('products') &&
          action.type.endsWith(Statuses.PENDING),
        (state) => {
          state.status = Statuses.PENDING;
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith('products') &&
          action.type.endsWith(Statuses.REJECTED),
        (state, { payload }) => {
          state.status = Statuses.REJECTED;
        },
      );
  },
});

export const { clearProducts, clearErrors } = productsSlice.actions;

export default productsSlice.reducer;
