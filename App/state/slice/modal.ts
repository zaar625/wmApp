import { createSlice } from '@reduxjs/toolkit';
import OneBtnModal from '../../components/modal/OneBtnModal';

const initialState = {
  modalType: '',
  isOpen: false
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, actions) => {
      const { modalType } = actions.payload;
      state.modalType = modalType;
      state.isOpen = true;
    },
    closeModal: state => {
      state.isOpen = false;
    }
  }
});

export default modalSlice.reducer;
export const { openModal, closeModal } = modalSlice.actions;
