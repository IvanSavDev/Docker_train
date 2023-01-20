import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Statuses, Routes } from '../consts/consts';

const initialState = {
  user: {},
  status: Statuses.FULFILLED,
};

export const getUser = createAsyncThunk(
  'user/getUser',
  async (_, { extra: { axios }, rejectWithValue }) => {
    try {
      const request = await axios.get(Routes.USER);
      return request.data;
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  },
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data, { extra: { axios }, rejectWithValue }) => {
    try {
      const request = await axios({
        method: 'patch',
        url: Routes.USER,
        data,
      });
      return request.data;
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.user = payload;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.user = {
          ...state.user,
          ...payload,
        };
      })
      .addMatcher(
        (action) =>
          action.type.startsWith('user') &&
          action.type.endsWith(Statuses.FULFILLED),
        (state) => {
          state.status = Statuses.FULFILLED;
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith('user') &&
          action.type.endsWith(Statuses.PENDING),
        (state) => {
          state.status = Statuses.PENDING;
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith('user') &&
          action.type.endsWith(Statuses.REJECTED),
        (state) => {
          state.status = Statuses.REJECTED;
        },
      );
  },
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;
