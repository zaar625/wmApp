import { Pressable, StyleSheet, Text, View } from 'react-native';
import format from 'date-fns/format';
import React from 'react';
import SvgIcon from '../SvgIcon';
import themeChange from '../../util/theme';
import { colors } from '../../theme';

type TProps = {
  currentDate: Date;
  prevMonth: Function;
  nextMonth: Function;
};

const Month = ({ currentDate, nextMonth, prevMonth }: TProps) => {
  const themeMode = themeChange();
  return (
    <View style={styles.container}>
      <Pressable style={{ marginRight: 10 }} onPress={() => prevMonth()}>
        <SvgIcon name="arrow_left_fill" width={20} height={20} color={themeMode.tint} />
      </Pressable>
      <Text style={[styles.month, { color: themeMode.tint }]}>{format(currentDate, 'M')}월</Text>
      <Pressable style={{ marginLeft: 10 }} onPress={() => nextMonth()}>
        <SvgIcon name="arrow_right_fill" width={20} height={20} color={themeMode.tint} />
      </Pressable>
    </View>
  );
};

export default Month;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  month: {
    fontWeight: 'bold',
    fontSize: 24
  }
});
