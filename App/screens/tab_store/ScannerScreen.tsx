import { StyleSheet } from 'react-native';
import React, { useMemo } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { NavigationScreenProps } from '../../type';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../type';
import { searchStore, addStore } from '../../api/store';
import { useDispatch } from 'react-redux';
import { openModal } from '../../state/slice/modal';
import { ADDSTORE_MODAL_SUCCESS, ADDSTORE_MODAL_FAIL } from '../../constant';

import { deviceheight } from '../../theme';

const ScannerScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  const scanerHandler = async (scanNum: any) => {
    const { data: storeId } = await scanNum;
    const isStore = await searchStore(storeId);

    if (isStore) {
      addStore(storeId, 'DMWrTCluLrhJMrI01BVhJK6byFs1');
      dispatch(
        openModal({
          modalType: 'OneBtnModal',
          contents: {
            ...ADDSTORE_MODAL_SUCCESS,
            onPress() {
              navigation.goBack();
            }
          }
        })
      );
    } else {
      dispatch(
        openModal({
          modalType: 'OneBtnModal',
          contents: {
            ...ADDSTORE_MODAL_FAIL,
            onPress() {
              navigation.goBack();
            }
          }
        })
      );
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
