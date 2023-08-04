import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { BarCodeReadEvent } from 'react-native-camera';

import { deviceWidth, deviceheight } from '../../theme';
import themeChange from '../../util/theme';

import firestore from '@react-native-firebase/firestore';

const workHourRef = firestore()
  .collection('users')
  .doc('DMWrTCluLrhJMrI01BVhJK6byFs1')
  .collection('workHour');

const BarcodeTabScreen = () => {
  const themeMode = themeChange();

  const scanerHandler = async (event: BarCodeReadEvent) => {
    const storeId = event.data;
    const currentTime = new Date();
    console.log(currentTime);

    console.log((await workHourRef.doc(String(currentTime)).get()).exists);

    workHourRef
      .doc(String(currentTime))
      .set({ work: [{ start: currentTime, end: null, storeName: storeId, date: currentTime }] });

    // const { work }: any = dateWork;

    // dateWork.update({
    //   work: [...work, { start: currentTime, end: null, storeName: storeId, date: currentTime }]
    // });
  };

  return (
    <View style={{ flex: 1, backgroundColor: themeMode.primary }}>
      {/* <QRCodeScanner
        onRead={scanerHandler}
        showMarker={true}
        cameraStyle={{
          width: deviceWidth,
          height: 300,
          alignSelf: 'center'
        }}
        topContent={
          <View>
            <Text style={{ color: '#fff' }}>출퇴근</Text>
          </View>
        }
        reactivate={true}
        reactivateTimeout={5000}
      /> */}
    </View>
  );
};

export default BarcodeTabScreen;

const styles = StyleSheet.create({});
