import { ScrollView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Calender from '../../components/calender';
import { ScreenTitle } from '../../components/Title';
import { SafeAreaView } from 'react-native-safe-area-context';
import themeChange from '../../util/theme';
import MonthPayRoll from './components/MonthPayRoll';
import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/subMonths';

import firestore from '@react-native-firebase/firestore';

const Calendar = () => {
  const themeMode = themeChange();
  const [currentDate, setCurrentDate] = useState(new Date());
  // const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: themeMode.primary }]}
      edges={['top']}
    >
      <ScrollView>
        <ScreenTitle title={`이번달${`\n`}이만큼 벌었어요`} style={{ paddingHorizontal: 20 }} />
        <MonthPayRoll currentDate={currentDate} />
        <Calender setCurrentDate={setCurrentDate} currentDate={currentDate} />
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
