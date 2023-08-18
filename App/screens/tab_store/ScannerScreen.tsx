import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { BarCodeReadEvent } from 'react-native-camera';
import React, { useMemo } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../type';
import { searchStore } from '../../api/store';
import { useDispatch } from 'react-redux';
import { openModal } from '../../state/slice/modal';
import { ADDSTORE_MODAL_SUCCESS, ADDSTORE_MODAL_FAIL } from '../../constant';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ScannerMarker from './components/ScannerMarker';
import themeChange from '../../util/theme';
import ScannerHeader from './components/ScannerHeader';

import { muTateaddStore } from '../../api/store/hooks/useAddStore';
import { deviceheight } from '../../theme';

const ScannerScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const themeMode = themeChange();
  const queryClient = useQueryClient();

  const mutationAddTodo = useMutation({
    mutationFn: muTateaddStore,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myStoreList'] });
    },
    onError: () => console.log('error')
  });

  const scanerHandler = async (event: BarCodeReadEvent) => {
    const { data: codeId } = event;

    const isStore = await searchStore(codeId);

    if (isStore) {
      // addStore(codeId, 'DMWrTCluLrhJMrI01BVhJK6byFs1');
      mutationAddTodo.mutate({ storeId: codeId, userId: 'DMWrTCluLrhJMrI01BVhJK6byFs1' });
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
      <View style={[styles.container, { backgroundColor: themeMode.primary }]}>
        <ScannerHeader />
        <QRCodeScanner onRead={scanerHandler} cameraStyle={{ height: deviceheight }} />
        <ScannerMarker />
      </View>
    </GestureDetector>
  );
};

export default ScannerScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
});
