import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React from 'react';
import TimeModifySheet from '../../components/bottom_sheet/TimeModifySheet';

const CalendarTabScreen = () => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <TimeModifySheet />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CalendarTabScreen;

const styles = StyleSheet.create({});
