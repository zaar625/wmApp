import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  isOpen: false
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    openToast: (state, actions) => {
      const { message } = actions.payload;
      state.message = message;
      state.isOpen = true;
    },
    closeToast: state => {
      state.isOpen = false;
    }
  }
});

export default toastSlice.reducer;
export const { openToast, closeToast } = toastSlice.actions;
