import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { debounceAsyncFunction, generateColor } from '../../utils/utils';
import { Routes, Statuses } from '../../consts/consts';

const initialState = {
  sales: null,
  status: Statuses.FULFILLED,
};

export const getSales = createAsyncThunk(
  'sales/getSales',
  async (_, { extra: { axios }, rejectWithValue }) => {
    try {
      const req = () => axios.get(Routes.SALES);
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

export const createSale = createAsyncThunk(
  'sales/createSale',
  async (data, { extra: { axios }, rejectWithValue }) => {
    try {
      const req = () => axios.post(Routes.SALE, data);
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

export const updateSale = createAsyncThunk(
  'sales/updateSale',
  async (data, { extra: { axios }, rejectWithValue }) => {
    try {
      const req = () => axios.patch(`${Routes.SALES}/${data.id}`, data);
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

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    clearSales: (state) => {
      state.sales = [];
      state.status = Statuses.FULFILLED;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSales.fulfilled, (state, action) => {
        state.sales = action.payload.map((sale) => ({
          ...sale,
          color: generateColor(),
        }));
      })
      .addCase(createSale.fulfilled, (state, { payload }) => {
        const color = generateColor();
        state.sales = [{ ...payload, color }, ...state.sales];
      })
      .addCase(updateSale.fulfilled, (state, { payload }) => {
        state.sales = state.sales.map((sale) =>
          sale.id === payload.id ? payload : sale,
        );
      })
      .addMatcher(
        (action) =>
          action.type.startsWith('sales') &&
          action.type.endsWith(Statuses.FULFILLED),
        (state) => {
          state.status = Statuses.FULFILLED;
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith('sales') &&
          action.type.endsWith(Statuses.PENDING),
        (state) => {
          state.status = Statuses.PENDING;
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith('sales') &&
          action.type.endsWith(Statuses.REJECTED),
        (state) => {
          state.status = Statuses.REJECTED;
        },
      );
  },
});

export const { clearSales, clearStatus } = salesSlice.actions;

export default salesSlice.reducer;
