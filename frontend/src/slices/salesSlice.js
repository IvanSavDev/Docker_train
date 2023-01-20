import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { generateColor } from '../utils/utils';
import { Routes, Statuses } from '../consts/consts';

const initialState = {
  sales: [],
  status: Statuses.FULFILLED,
};

export const getSales = createAsyncThunk(
  'sales/getSales',
  async (_, { extra: { axios }, rejectWithValue }) => {
    try {
      const request = await axios.get(Routes.SALES);
      return request.data;
    } catch (error) {
      return rejectWithValue({
        data: error.response.data,
        status: error.response.status,
      });
    }
  },
);

export const createSale = createAsyncThunk(
  'sales/createSale',
  async (data, { extra: { axios }, rejectWithValue }) => {
    try {
      const request = await axios({
        method: 'post',
        url: Routes.SALE,
        data,
      });
      return request.data;
    } catch (error) {
      return rejectWithValue({
        data: error.response.data,
        status: error.response.status,
      });
    }
  },
);

export const updateSale = createAsyncThunk(
  'sales/updateSale',
  async (data, { extra: { axios }, rejectWithValue }) => {
    try {
      const request = await axios({
        method: 'patch',
        url: `${Routes.SALES}/${data.id}`,
        data,
      });
      return request.data;
    } catch (error) {
      return rejectWithValue({
        data: error.response.data,
        status: error.response.status,
      });
    }
  },
);

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    clearSales: (state) => {
      state.sales = initialState.sales;
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

export const { clearSales } = salesSlice.actions;

export default salesSlice.reducer;
