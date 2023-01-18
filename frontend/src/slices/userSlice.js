import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
};

export const getUser = createAsyncThunk(
  'getUser',
  async (_, { extra: { axios, routes } }) => {
    try {
      const token = localStorage.getItem('userId');
      const request = await axios.get(routes.userPath(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return request.data;
    } catch (error) {
      return console.log(error.response.data.errors);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [getUser.fulfilled]: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export default userSlice.reducer;
