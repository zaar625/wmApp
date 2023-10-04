import { useMemo } from 'react';
import { Gesture } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../type';

const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

export const panGesture = useMemo(
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
