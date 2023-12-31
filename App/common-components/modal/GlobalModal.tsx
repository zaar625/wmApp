import { StyleSheet, Text, View, Modal } from 'react-native';
import React from 'react';
import OneBtnModal from './OneBtnModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import TwoBtnModal from './TwoBtnModal';

const GlobalModal = () => {
  const { modalType, isOpen, contents } = useSelector((state: RootState) => state.modal);

  if (!isOpen) return;

  const renderModal = (modalType: string, contents: any) => {
    if (modalType === 'OneBtnModal') {
      return <OneBtnModal props={contents} />;
    } else {
      return <TwoBtnModal props={contents} />;
    }
  };

  return (
    <>
      <Modal animationType="fade" transparent={true} visible={isOpen}>
        {renderModal(modalType, contents)}
      </Modal>
    </>
  );
};

export default GlobalModal;

const styles = StyleSheet.create({});
