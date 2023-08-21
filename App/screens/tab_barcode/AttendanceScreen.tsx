import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useState } from 'react';
import themeChange from '../../util/theme';
import firestore from '@react-native-firebase/firestore';
import format from 'date-fns/format';
import ScannerHeader from '../tab_store/components/ScannerHeader';
import QRCodeScanner from 'react-native-qrcode-scanner';
import ScannerMarker from '../tab_store/components/ScannerMarker';
import { BarCodeReadEvent } from 'react-native-camera';

import { useAddAttendance } from './handlers/attendance';
import { deviceWidth } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMyStoreList } from '../../api/store/hooks/useMyStoreList';
import { useDispatch } from 'react-redux';
import { openModal, closeModal } from '../../state/slice/modal';
import { NavigationScreenProps } from '../../type';

const AttendanceScreen = ({ navigation }: NavigationScreenProps) => {
  const themeMode = themeChange();
  const dispatch = useDispatch();
  const currentTime = new Date();

  const [storeName, setStoreName] = useState<null | string>(null);

  const { mutate: addattendance } = useAddAttendance();
  const { data: storeList } = useMyStoreList();

  const scanerHandler = (event: BarCodeReadEvent) => {
    const { data: codeId } = event;
    const findStore = storeList?.find(list => list.id === codeId);

    if (findStore) {
      return setStoreName(findStore.name);
    }

    return setStoreName(null);
  };

  const onAttendanceSuccess = (type: string) => {
    const typeName = type === 'start' ? '출근' : '퇴근';

    dispatch(
      openModal({
        modalType: 'OneBtnModal',
        contents: {
          title: `${typeName} 등록 완료`,
          content: `${storeName}에 ${typeName} 등록이 완료되었습니다.`,
          onPress() {
            navigation.goBack();
          }
        }
      })
    );
  };

  const attendanceOnPress = (attendanceType: string) => {
    if (storeName) {
      addattendance(
        { currentDate: currentTime, attendanceType },
        {
          onSuccess: () => onAttendanceSuccess(attendanceType)
        }
      );
      return;
    }

    return dispatch(
      openModal({
        modalType: 'OneBtnModal',
        contents: {
          title: '매장 정보가 없어요.',
          content: `현재 매장 정보가 없습니다.${`\n`}다시 스캔해 주세요.`,
          onPress() {
            dispatch(closeModal());
          }
        }
      })
    );
  };

  return (
    <SafeAreaView
      edges={['bottom']}
      style={[styles.container, { backgroundColor: themeMode.primary }]}
    >
      <ScannerHeader />
      <View style={styles.qrMarkerWrapper}>
        <QRCodeScanner onRead={scanerHandler} cameraStyle={{ height: '100%', flex: 1 }} />
        <ScannerMarker />
      </View>
      <View style={styles.storeInfo}>
        <Text style={[styles.storeName, { color: themeMode.tint }]}>
          {storeName ? storeName : '매장 정보 없음'}
        </Text>
      </View>

      <View style={styles.btnWrapper}>
        <Pressable
          style={[styles.attendanceBtn, { backgroundColor: themeMode.secondary }]}
          onPress={() => attendanceOnPress('start')}
        >
          <Text style={[styles.btnText, { color: themeMode.tint }]}>출근</Text>
        </Pressable>
        <Pressable
          style={[styles.attendanceBtn, { backgroundColor: themeMode.secondary }]}
          onPress={() => attendanceOnPress('end')}
        >
          <Text style={[styles.btnText, { color: themeMode.tint }]}>퇴근</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default AttendanceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  attendanceBtn: {
    paddingVertical: 15,
    borderRadius: 10,
    width: deviceWidth * 0.42,
    alignItems: 'center'
  },
  btnText: {
    fontWeight: '600'
  },
  storeName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    width: '100%'
  },
  storeInfo: {
    paddingVertical: 40
  },
  qrMarkerWrapper: { flex: 1, alignItems: 'center', justifyContent: 'center' }
});
