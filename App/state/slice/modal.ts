import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalType: '',
  isOpen: false,
  contents: null
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, actions) => {
      const { modalType, contents } = actions.payload;
      state.modalType = modalType;
      state.isOpen = true;
      state.contents = contents;
    },
    closeModal: state => {
      state.isOpen = false;
    }
  }
});

export default modalSlice.reducer;
export const { openModal, closeModal } = modalSlice.actions;
