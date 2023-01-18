import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  sales: [],
};

export const getSales = createAsyncThunk(
  'getSales',
  async (_, { extra: { axios, routes } }) => {
    try {
      const token = localStorage.getItem('userId');
      console.log(token);
      const request = await axios.get(routes.salesPath(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return request.data;
    } catch (error) {
      return console.log(error);
    }
  },
);

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {},
  extraReducers: {
    [getSales.fulfilled]: (state, action) => {
      state.sales = action.payload;
    },
  },
});

export default salesSlice.reducer;
