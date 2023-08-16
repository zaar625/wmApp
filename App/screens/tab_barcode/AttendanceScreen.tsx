import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import themeChange from '../../util/theme';
import firestore from '@react-native-firebase/firestore';
import format from 'date-fns/format';
import ScannerHeader from '../tab_store/components/ScannerHeader';
import QRCodeScanner from 'react-native-qrcode-scanner';
import ScannerMarker from '../tab_store/components/ScannerMarker';
import { BarCodeReadEvent } from 'react-native-camera';

import { addWorkingTime } from './handlers/attendance';
import { deviceWidth, deviceheight } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';

const AttendanceScreen = () => {
  const workHourRef = firestore()
    .collection('users')
    .doc('DMWrTCluLrhJMrI01BVhJK6byFs1')
    .collection('workHour');

  const themeMode = themeChange();
  const currentTime = new Date();
  const currentDate = format(currentTime, 'yyyy-MM');

  const scanerHandler = async (event: BarCodeReadEvent) => {
    const { data: codeId } = event;
  };

  return (
    <SafeAreaView
      edges={['bottom']}
      style={[styles.container, { backgroundColor: themeMode.primary }]}
    >
      <ScannerHeader />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <QRCodeScanner
          onRead={scanerHandler}
          cameraStyle={{ height: '100%', flex: 1 }}
          containerStyle={{ backgroundColor: 'blue' }}
        />
        <ScannerMarker />
      </View>
      <View style={{ paddingVertical: 40 }}>
        <Text style={[styles.storeName, { color: themeMode.tint }]}>카페이루</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          width: '100%'
        }}
      >
        <Pressable
          style={[styles.attendanceBtn, { backgroundColor: themeMode.secondary }]}
          onPress={() => addWorkingTime(currentTime, 'start')}
        >
          <Text style={[styles.btnText, { color: themeMode.tint }]}>출근</Text>
        </Pressable>
        <Pressable
          style={[styles.attendanceBtn, { backgroundColor: themeMode.secondary }]}
          onPress={() => addWorkingTime(currentTime, 'end')}
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
  }
});
