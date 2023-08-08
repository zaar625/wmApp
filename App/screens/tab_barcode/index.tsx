import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { BarCodeReadEvent } from 'react-native-camera';
import themeChange from '../../util/theme';
import firestore from '@react-native-firebase/firestore';
import format from 'date-fns/format';

import { addWorkingTime } from './handlers/attendance';

const BarcodeTabScreen = () => {
  const workHourRef = firestore()
    .collection('users')
    .doc('DMWrTCluLrhJMrI01BVhJK6byFs1')
    .collection('workHour');

  const themeMode = themeChange();
  const currentTime = new Date();
  const currentDate = format(currentTime, 'yyyy-MM');

  // console.log(workHourRef.doc(String(currentTime)).get().exists);

  return (
    <View style={[styles.container, { backgroundColor: themeMode.primary }]}>
      <Pressable onPress={() => addWorkingTime(currentTime, 'start')}>
        <Text style={{ color: '#FFF' }}>출근</Text>
      </Pressable>
      <Pressable onPress={() => addWorkingTime(currentTime, 'end')}>
        <Text style={{ color: '#FFF' }}>퇴근</Text>
      </Pressable>
    </View>
  );
};

export default BarcodeTabScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});
