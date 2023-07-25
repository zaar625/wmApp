import { StyleSheet, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { NavigationScreenProps } from '../../type';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../type';

import { deviceheight } from '../../theme';
import { runOnJS } from 'react-native-reanimated';

const ScannerScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onSuccess = async (data: any) => {
    console.log(data);
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
      <QRCodeScanner onRead={onSuccess} showMarker cameraStyle={{ height: deviceheight }} />
    </GestureDetector>
  );
};

export default ScannerScreen;

const styles = StyleSheet.create({});
