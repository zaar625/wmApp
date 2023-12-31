import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  endOfMonth,
  startOfMonth,
  addDays,
  format,
  eachWeekOfInterval,
  isSameMonth,
  isSameDay
} from 'date-fns';
import isToday from 'date-fns/isToday';
import themeChange from '../../util/theme';
import { useDispatch } from 'react-redux';
import { openBottomSheet } from '../../state/slice/bottomSheet';
import { useWorkingDate } from '../../api/store/hooks/useMonthlyWork';
import { dailyTotalTime, weeklyTotalTime } from '../../util/time';
import { calculatePayment } from '../../util/calculatePayment';

const Dates = ({ currentDate }: { currentDate: Date }) => {
  const { data } = useWorkingDate(format(currentDate, 'yyyy-MM'));

  const themeMode = themeChange();
  const dispatch = useDispatch();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);

  // 당월 주마다 시작하는 날짜
  const weeklyStartDates = eachWeekOfInterval({ start: monthStart, end: monthEnd });

  let datesOfWeek: Date[][] = [];

  for (let i = 0; i < weeklyStartDates.length; i++) {
    const week = [...Array(7)].map((_, index) => addDays(weeklyStartDates[i], index));
    datesOfWeek.push(week);
  }

  const dateOnPress = (date: Date) => {
    const formatDate = format(date, 'yyyy-MM-dd');

    if (!data) return dispatch(openBottomSheet({ route: 'calendarTabScreen', data: [], date }));

    const findDayData = data?.filter(
      (dayItem: any) => format(dayItem.date.toDate(), 'yyyy-MM-dd') === formatDate
    );

    dispatch(openBottomSheet({ route: 'calendarTabScreen', data: findDayData, date }));
  };

  return (
    <>
      {datesOfWeek.map((date, index) => (
        //주
        <View key={index} style={{ backgroundColor: themeMode.secondary }}>
          {/* 일 */}
          <View style={styles.weekContainer}>
            {date.map((dayDate, index) => (
              <Pressable
                key={index}
                onPress={() => dateOnPress(dayDate)}
                style={styles.dateWrapper}
              >
                {isSameMonth(monthStart, dayDate) && (
                  <>
                    <Text
                      style={[
                        styles.dateText,
                        isToday(dayDate)
                          ? { color: '#4C63FF', fontWeight: 'bold' }
                          : { color: themeMode.subTint }
                      ]}
                    >
                      {format(dayDate, 'd')}
                    </Text>
                    <View style={{ minHeight: 50 }}>
                      {dailyTotalTime(dayDate, data) > 0 && (
                        <Text style={[styles.priceText, { color: themeMode.pressIcon }]}>
                          {calculatePayment(dailyTotalTime(dayDate, data))}
                        </Text>
                      )}
                    </View>
                  </>
                )}
              </Pressable>
            ))}
          </View>
          {/* 주 */}
          <View style={[styles.total, { backgroundColor: themeMode.card }]}>
            <Text style={[styles.totalPriceText, { color: themeMode.tint }]}>
              {weeklyTotalTime(date, data) > 0 && calculatePayment(weeklyTotalTime(date, data))}
            </Text>
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
    fontWeight: '400',
    marginBottom: 10
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
