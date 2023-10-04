import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { Modalize } from 'react-native-modalize';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { closeBottomSheet } from '../../state/slice/bottomSheet';
import { useDispatch } from 'react-redux';
import TimeModifySheet from './TimeModifySheet';
import ShareModifySheet from './ShareModifySheet';
import EditWorkingInfoSheet from './EditWorkingInfoSheet';
import DateSheet from './DateSheet';
import themeChange from '../../util/theme';

const GlobalBottomSheet = () => {
  const themeMode = themeChange();
  const modalizeRef = useRef<Modalize>();
  const dispatch = useDispatch();
  const { route, isOpen, data, date } = useSelector((state: RootState) => state.bottomSheet);

  const renderBottomSheet = (route: string) => {
    if (route === 'shareTabScreen') return <TimeModifySheet data={data} />;
    if (route === 'calendarTabScreen') return <DateSheet data={data} date={date} />;
    if (route === 'shareDetailScreen') return <ShareModifySheet data={data} />;
    if (route === 'settingScreen') return <EditWorkingInfoSheet data={data} />;
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
      modalStyle={{ backgroundColor: themeMode.secondary }}
      adjustToContentHeight
      onClosed={() => dispatch(closeBottomSheet())}
    >
      {renderBottomSheet(route)}
    </Modalize>
  );
};

export default GlobalBottomSheet;

const styles = StyleSheet.create({});
