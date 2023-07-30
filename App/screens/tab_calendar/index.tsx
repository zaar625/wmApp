import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Calender from '../../components/calender';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../../theme';

const Calendar = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Calender />
    </SafeAreaView>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.primary
  }
});
