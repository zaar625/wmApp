import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  route: '',
  isOpen: false,
  date: new Date(),
  data: []
};

export const bottomSheetlSlice = createSlice({
  name: 'bottomSheet',
  initialState,
  reducers: {
    openBottomSheet: (state, actions) => {
      const { route, data, date } = actions.payload;
      state.route = route;
      state.isOpen = true;
      state.data = data;
      state.date = date;
    },
    closeBottomSheet: state => {
      state.isOpen = false;
    }
  }
});

export default bottomSheetlSlice.reducer;
export const { openBottomSheet, closeBottomSheet } = bottomSheetlSlice.actions;
