import { Pressable, StyleSheet, Text, View } from 'react-native';
import format from 'date-fns/format';
import React from 'react';
import SvgIcon from '../SvgIcon';

const Month = ({
  currentMonth,
  nextMonth,
  prevMonth
}: {
  currentMonth: Date;
  prevMonth: Function;
  nextMonth: Function;
}) => {
  return (
    <View style={styles.container}>
      <Pressable style={{ marginRight: 10 }} onPress={() => prevMonth()}>
        <SvgIcon name="arrow_left" width={20} height={20} color={'#FFF'} />
      </Pressable>
      <Text style={styles.month}>{format(currentMonth, 'M')} 월</Text>
      <Pressable style={{ marginLeft: 10 }} onPress={() => nextMonth()}>
        <SvgIcon name="arrow_right" width={20} height={20} color={'#FFF'} />
      </Pressable>
    </View>
  );
};

export default Month;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  month: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#FFF'
  }
});
