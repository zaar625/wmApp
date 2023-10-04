import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useRef } from 'react';
import { Vibration } from 'react-native';
import RNShake from 'react-native-shake';

import { RootStackParamList } from '../type';

const ShakeDetector = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const subscription = RNShake.addListener(() => {
      navigation.navigate('attendanceScreen');
    });

    return () => {
      // Your code here...
      subscription.remove();
    };
  }, []);

  return null;
};

export default ShakeDetector;
