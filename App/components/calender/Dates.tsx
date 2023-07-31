import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  endOfMonth,
  startOfMonth,
  addDays,
  format,
  eachWeekOfInterval,
  isSameMonth
} from 'date-fns';
import themeChange from '../../util/theme';

const Dates = ({ currentMonth }: { currentMonth: Date }) => {
  const themeMode = themeChange();

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  // const startDate = startOfWeek(monthStart);
  // const endDate = endOfWeek(monthEnd);

  const weeksInMonth = eachWeekOfInterval({ start: monthStart, end: monthEnd }); //당월 시작하는 주의 첫번째값

  let datesOfWeek = [];

  for (let i = 0; i < weeksInMonth.length; i++) {
    const week = [...Array(7)].map((_, index) => addDays(weeksInMonth[i], index));
    datesOfWeek.push(week);
  }

  return (
    <>
      {datesOfWeek.map((date, index) => (
        <View key={index}>
          <View style={styles.weekContainer}>
            {date.map(date => (
              <View style={styles.dateWrapper}>
                {isSameMonth(monthStart, date) && (
                  <>
                    <Text style={[styles.dateText, { color: themeMode.tint }]}>
                      {format(date, 'd')}
                    </Text>
                    <View style={{ minHeight: 50 }}>
                      <Text style={[styles.priceText, { color: themeMode.tint }]}>+ 11,000</Text>
                    </View>
                  </>
                )}
              </View>
            ))}
          </View>
          <View style={[styles.total, { backgroundColor: themeMode.secondary }]}>
            <Text style={[styles.totalPriceText, { color: themeMode.tint }]}>+ 35,000</Text>
          </View>
        </View>
      ))}
    </>
  );
};

export default Dates;

const styles = StyleSheet.create({
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dateWrapper: {
    flex: 1,
    marginTop: 10
  },
  dateText: {
    textAlign: 'center',
    fontWeight: '400'
  },
  priceText: {
    alignSelf: 'center',
    marginVertical: 5,
    fontSize: 10
  },
  total: {
    paddingHorizontal: 8,
    paddingVertical: 5
  },
  totalPriceText: {
    textAlign: 'right',
    fontSize: 11,
    fontWeight: '500',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
