import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  route: '',
  isOpen: false
};

export const bottomSheetlSlice = createSlice({
  name: 'bottomSheet',
  initialState,
  reducers: {
    openBottomSheet: (state, actions) => {
      const { route } = actions.payload;
      state.route = route;
      state.isOpen = true;
    },
    closeBottomSheet: state => {
      state.isOpen = false;
    }
  }
});

export default bottomSheetlSlice.reducer;
export const { openBottomSheet, closeBottomSheet } = bottomSheetlSlice.actions;
