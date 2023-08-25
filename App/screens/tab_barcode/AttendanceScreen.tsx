import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useState, useMemo } from 'react';
import themeChange from '../../util/theme';
import firestore from '@react-native-firebase/firestore';
import format from 'date-fns/format';
import ScannerHeader from '../tab_store/components/ScannerHeader';
import QRCodeScanner from 'react-native-qrcode-scanner';
import ScannerMarker from '../tab_store/components/ScannerMarker';
import { BarCodeReadEvent } from 'react-native-camera';
import { useQueryClient } from '@tanstack/react-query';

import { useAddAttendance } from './handlers/attendance';
import { deviceWidth } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMyStoreList } from '../../api/store/hooks/useMyStoreList';
import { useDispatch } from 'react-redux';
import { openModal, closeModal } from '../../state/slice/modal';
import { NavigationScreenProps } from '../../type';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

const AttendanceScreen = ({ navigation }: NavigationScreenProps) => {
  const themeMode = themeChange();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const currentTime = new Date();

  const [storeInfo, setStoreInfo] = useState<any>();

  const { mutate: addattendance } = useAddAttendance();
  const { data: storeList } = useMyStoreList();

  const scanerHandler = (event: BarCodeReadEvent) => {
    const { data: codeId } = event;
    const findStore = storeList?.find(list => list.id === codeId);

    if (findStore) {
      return setStoreInfo(findStore);
    } else {
      dispatch(
        openModal({
          modalType: 'OneBtnModal',
          contents: {
            title: `매장 정보가 없습니다.`,
            content: `근무지에 매장 등록이 되었는지 ${`\n`}또는 ${`\n`}QR 코드가 유효한지 확인해주세요.`,
            onPress() {
              navigation.goBack();
            }
          }
        })
      );
    }

    return setStoreInfo(null);
  };

  const onAttendanceSuccess = (type: string) => {
    const typeName = type === 'start' ? '출근' : '퇴근';

    dispatch(
      openModal({
        modalType: 'OneBtnModal',
        contents: {
          title: `${typeName} 등록 완료`,
          content: `${storeInfo?.name}에 ${typeName} 등록이 완료되었습니다.`,
          onPress() {
            queryClient.invalidateQueries({ queryKey: ['work-date'] });
            navigation.goBack();
          }
        }
      })
    );
  };

  const attendanceOnPress = (attendanceType: string) => {
    const attendanceData = {
      currentDate: currentTime,
      attendanceType,
      storeInfo
    };

    if (storeInfo) {
      addattendance(attendanceData, {
        onSuccess: () => onAttendanceSuccess(attendanceType)
      });
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

  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .runOnJS(true)
        .onEnd(event => {
          const translationY = event.translationY;
          if (translationY > 20) {
            navigation.goBack();
          }
        }),
    []
  );

  return (
    <GestureDetector gesture={panGesture}>
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
            {storeInfo ? storeInfo.name : null}
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
    </GestureDetector>
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
