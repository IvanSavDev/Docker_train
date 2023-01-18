import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
};

export const getProducts = createAsyncThunk(
  'getProducts',
  async (_, { extra: { axios, routes } }) => {
    try {
      const token = localStorage.getItem('userId');
      console.log(token);
      const request = await axios.get(routes.productsPath(), {
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

export const deleteProduct = createAsyncThunk(
  'deleteProduct',
  async (id, { extra: { axios, routes } }) => {
    try {
      const token = localStorage.getItem('userId');
      await axios.delete(`${routes.productsPath()}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (error) {
      return console.log(error);
    }
  },
);

export const createProduct = createAsyncThunk(
  'createProduct',
  async (data, { extra: { axios, routes } }) => {
    try {
      const token = localStorage.getItem('userId');
      // console.log(token);
      console.log(data);
      const req = await fetch(routes.productPath(), {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      // const request = await axios.post(routes.productPath(), {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      return true;
    } catch (error) {
      return console.log(error);
    }
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: {
    [deleteProduct.fulfilled]: (state, { payload }) => {
      state.products = state.products.filter(
        (product) => product.id !== payload,
      );
    },
    [getProducts.fulfilled]: (state, { payload }) => {
      state.products = payload;
    },
  },
});

export default productsSlice.reducer;
