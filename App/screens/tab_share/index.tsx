import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';

const ShareTabScreen = () => {
  const onSuccess = async (data: any) => {
    console.log(data);
  };
  return (
    <View>
      <QRCodeScanner
        onRead={onSuccess}
        showMarker
        cameraStyle={{ height: Dimensions.get('window').height }}
      />
    </View>
  );
};

export default ShareTabScreen;

const styles = StyleSheet.create({});
