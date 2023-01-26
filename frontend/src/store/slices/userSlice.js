import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Statuses, Routes } from '../../consts/consts';
import { debounceAsyncFunction } from '../../utils/utils';

export const getUser = createAsyncThunk(
  'user/getUser',
  async (_, { extra: { axios }, rejectWithValue }) => {
    try {
      const req = () => axios.get(Routes.USER);
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

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data, { extra: { axios }, rejectWithValue }) => {
    try {
      const req = () => axios.patch(Routes.USER, data);
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

export const loadAvatar = createAsyncThunk(
  'user/loadImg',
  async (data, { extra: { axios }, rejectWithValue }) => {
    try {
      const req = () => axios.post(Routes.UPLOAD_AVATAR, data);
      const request = await debounceAsyncFunction(req);
      return request.data.urlImg;
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status,
        errors: error.response?.data?.errors || [],
      });
    }
  },
);

export const loadBackgroundImg = createAsyncThunk(
  'user/loadBackgroundImg',
  async (data, { extra: { axios }, rejectWithValue }) => {
    try {
      const req = () => axios.post(Routes.UPLOAD_BACKGROUND, data);
      const request = await debounceAsyncFunction(req);
      return request.data.urlBackgroundImg;
    } catch (error) {
      return rejectWithValue({
        status: error.response?.status,
        errors: error.response?.data?.errors || [],
      });
    }
  },
);

const initialState = {
  user: {},
  status: Statuses.FULFILLED,
  statusAvatar: Statuses.FULFILLED,
  statusBackgroundImg: Statuses.FULFILLED,
};

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
        state.status = Statuses.FULFILLED;
        state.statusAvatar = Statuses.FULFILLED;
        state.statusBackgroundImg = Statuses.FULFILLED;
      })
      .addCase(getUser.pending, (state) => {
        state.status = Statuses.PENDING;
        state.statusAvatar = Statuses.PENDING;
        state.statusBackgroundImg = Statuses.PENDING;
      })
      .addCase(getUser.rejected, (state) => {
        state.status = Statuses.REJECTED;
        state.statusAvatar = Statuses.REJECTED;
        state.statusBackgroundImg = Statuses.REJECTED;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.user = {
          ...state.user,
          ...payload,
        };
        state.status = Statuses.FULFILLED;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = Statuses.PENDING;
      })
      .addCase(updateUser.rejected, (state) => {
        state.status = Statuses.REJECTED;
      })
      .addCase(loadAvatar.fulfilled, (state, { payload }) => {
        state.user = {
          ...state.user,
          urlImg: payload,
        };
        state.statusAvatar = Statuses.FULFILLED;
      })
      .addCase(loadAvatar.pending, (state) => {
        state.statusAvatar = Statuses.PENDING;
      })
      .addCase(loadAvatar.rejected, (state) => {
        state.statusAvatar = Statuses.REJECTED;
      })
      .addCase(loadBackgroundImg.fulfilled, (state, { payload }) => {
        state.user = {
          ...state.user,
          urlBackgroundImg: payload,
        };
        state.statusBackgroundImg = Statuses.FULFILLED;
      })
      .addCase(loadBackgroundImg.pending, (state) => {
        state.statusBackgroundImg = Statuses.PENDING;
      })
      .addCase(loadBackgroundImg.rejected, (state) => {
        state.statusBackgroundImg = Statuses.REJECTED;
      });
  },
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;
