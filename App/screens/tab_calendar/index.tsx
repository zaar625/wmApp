import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Calender from '../../components/calender';
import { ScreenTitle } from '../../components/Title';
import { SafeAreaView } from 'react-native-safe-area-context';
import themeChange from '../../util/theme';
import MonthPayRoll from './components/MonthPayRoll';

const Calendar = () => {
  const themeMode = themeChange();
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: themeMode.primary }]}
      edges={['top']}
    >
      <ScrollView>
        <ScreenTitle title={`이번달${`\n`}이만큼 벌었어요`} style={{ paddingHorizontal: 20 }} />
        <MonthPayRoll />
        <Calender />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
