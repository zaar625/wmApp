import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { BarCodeReadEvent } from 'react-native-camera';

import { deviceWidth, deviceheight } from '../../theme';
import themeChange from '../../util/theme';

const BarcodeTabScreen = () => {
  const themeMode = themeChange();

  const scanerHandler = async (event: BarCodeReadEvent) => {
    const currentTime = new Date();
    console.log(currentTime);
  };

  return (
    <View style={{ flex: 1, backgroundColor: themeMode.primary }}>
      <QRCodeScanner
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
      />
    </View>
  );
};

export default BarcodeTabScreen;

const styles = StyleSheet.create({});
