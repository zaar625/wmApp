import { StyleSheet, View } from 'react-native';
import React from 'react';

import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/subMonths';

import Month from './Month';
import Days from './Days';
import Dates from './Dates';

const Calender = ({
  setCurrentDate,
  currentDate
}: {
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
}) => {
  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  return (
    <View style={styles.container}>
      <Month currentDate={currentDate} prevMonth={prevMonth} nextMonth={nextMonth} />
      <Days />
      <Dates currentDate={currentDate} />
    </View>
  );
};

export default Calender;

const styles = StyleSheet.create({
  container: {
    marginBottom: 50
  }
});
