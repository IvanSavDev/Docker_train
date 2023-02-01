import { createSlice } from '@reduxjs/toolkit';
import { Statuses } from '../../consts/consts';

const initialState = {
  isOpened: false,
  type: null,
  extra: null,
  status: Statuses.FULFILLED,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.isOpened = true;
      state.type = payload.type;
      state.extra = payload.id;
    },
    closeModal: (state) => {
      state.isOpened = false;
      state.type = null;
      state.extra = null;
    },
  },
});

export const { openModal, closeModal } = modalsSlice.actions;

export default modalsSlice.reducer;
