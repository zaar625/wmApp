import { StyleSheet, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { NavigationScreenProps } from '../../type';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../type';

import { deviceheight } from '../../theme';

const ScannerScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const scanerHandler = async (event: any) => {
    const { data } = await event;

    try {
      if (data) {
        console.log(data);
        navigation.goBack();
      }
    } catch (error) {
      console.log(error);
    }
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
      <QRCodeScanner
        onRead={scanerHandler}
        showMarker={true}
        cameraStyle={{ height: deviceheight }}
      />
    </GestureDetector>
  );
};

export default ScannerScreen;

const styles = StyleSheet.create({});
