import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';

import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/subMonths';

import Month from './Month';
import Days from './Days';
import Dates from './Dates';

const Calender = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  return (
    <View style={styles.container}>
      <Month currentMonth={currentMonth} prevMonth={prevMonth} nextMonth={nextMonth} />
      <Days />
      <Dates currentMonth={currentMonth} />
    </View>
  );
};

export default Calender;

const styles = StyleSheet.create({
  container: {
    marginBottom: 50
  }
});
