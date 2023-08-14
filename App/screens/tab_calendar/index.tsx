import { ScrollView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Calender from '../../common-components/calender';
import { ScreenTitle } from '../../common-components/Title';
import { SafeAreaView } from 'react-native-safe-area-context';
import themeChange from '../../util/theme';
import MonthPayRoll from './components/MonthPayRoll';

const Calendar = () => {
  const themeMode = themeChange();
  const [currentDate, setCurrentDate] = useState(new Date());

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
