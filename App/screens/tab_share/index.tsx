import { StyleSheet, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const ShareTabScreen = () => {
  const gesture = useMemo(
    () =>
      Gesture.Tap().onStart(e => {
        console.log(e);
      }),
    []
  );
  return (
    <GestureDetector gesture={gesture}>
      <Text>ShareTabScreen</Text>
    </GestureDetector>
  );
};

export default ShareTabScreen;

const styles = StyleSheet.create({});
