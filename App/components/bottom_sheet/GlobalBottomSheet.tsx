import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { Modalize } from 'react-native-modalize';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { closeBottomSheet } from '../../state/slice/bottomSheet';
import { useDispatch } from 'react-redux';
import TimeModifySheet from './TimeModifySheet';
import DateSheet from './DateSheet';

const GlobalBottomSheet = () => {
  const modalizeRef = useRef<Modalize>();
  const dispatch = useDispatch();
  const { route, isOpen } = useSelector((state: RootState) => state.bottomSheet);
  isOpen;

  const renderBottomSheet = (route: string) => {
    if (route === 'shareTabScreen') return <TimeModifySheet />;
    if (route === 'calendarTabScreen') return <DateSheet />;
  };

  useEffect(() => {
    if (!isOpen) {
      modalizeRef.current?.close();
    } else {
      modalizeRef.current?.open();
    }
  }, [isOpen]);

  return (
    <Modalize
      ref={modalizeRef}
      modalStyle={{ backgroundColor: '#30394B' }}
      adjustToContentHeight
      onClosed={() => dispatch(closeBottomSheet())}
    >
      {renderBottomSheet(route)}
    </Modalize>
  );
};

export default GlobalBottomSheet;

const styles = StyleSheet.create({});