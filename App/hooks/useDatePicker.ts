import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import DatePicker from 'react-native-date-picker';

const useDatePicker = () => {
  const [date, setDate] = useState(new Date());
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  return { date, datePickerOpen, setDatePickerOpen, setDate };
};

export default useDatePicker;
