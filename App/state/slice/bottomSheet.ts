import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  route: '',
  isOpen: false,
  data: []
};

export const bottomSheetlSlice = createSlice({
  name: 'bottomSheet',
  initialState,
  reducers: {
    openBottomSheet: (state, actions) => {
      const { route, data } = actions.payload;
      state.route = route;
      state.isOpen = true;
      state.data = data;
      console.log('state', state.data);
    },
    closeBottomSheet: state => {
      state.isOpen = false;
    }
  }
});

export default bottomSheetlSlice.reducer;
export const { openBottomSheet, closeBottomSheet } = bottomSheetlSlice.actions;
