import { StyleSheet, Text, View, Modal } from 'react-native';
import React from 'react';
import OneBtnModal from './OneBtnModal';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../state/store';

const MODAL_TYPES = {
  OneBtnModal: 'OneBtnModal'
};

const MODAL_COMPONENTS = [
  {
    type: MODAL_TYPES.OneBtnModal,
    component: <OneBtnModal />
  }
];

const GlobalModal = () => {
  const { modalType, isOpen } = useSelector((state: RootState) => state.modal);
  console.log(modalType, isOpen);

  if (!isOpen) return;

  const findModal = MODAL_COMPONENTS.find(modal => {
    return modal.type === modalType;
  });

  const renderModal = () => {
    return findModal?.component;
  };
  return (
    <>
      <Modal animationType="fade" transparent={true} visible={isOpen}>
        {renderModal()}
      </Modal>
    </>
  );
};

export default GlobalModal;

const styles = StyleSheet.create({});
