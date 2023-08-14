import { Pressable, StyleSheet, Text, View } from 'react-native';
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
import { useDispatch } from 'react-redux';
import { openBottomSheet } from '../../state/slice/bottomSheet';
import { useWorkingDate } from '../../api/store/hooks/useDateWork';
import { dailyTotalHour, weeklyTotalHour } from './handler/totalHourhandler';

const Dates = ({ currentDate }: { currentDate: Date }) => {
  const { data } = useWorkingDate(format(currentDate, 'yyyy-MM'));

  const themeMode = themeChange();
  const dispatch = useDispatch();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  // const startDate = startOfWeek(monthStart);
  // const endDate = endOfWeek(monthEnd);

  const weeklyStartDates = eachWeekOfInterval({ start: monthStart, end: monthEnd }); //당월 시작하는 주의 첫번째값

  let datesOfWeek: Date[][] = [];

  for (let i = 0; i < weeklyStartDates.length; i++) {
    const week = [...Array(7)].map((_, index) => addDays(weeklyStartDates[i], index));
    datesOfWeek.push(week);
  }

  const dateOnPress = (date: Date) => {
    const formatDate = format(date, 'yyyy-MM-dd');

    const findDayData = data?.filter(
      (dayItem: any) => format(dayItem.date.toDate(), 'yyyy-MM-dd') === formatDate
    );

    dispatch(openBottomSheet({ route: 'calendarTabScreen', data: findDayData, date }));
  };

  return (
    <>
      {datesOfWeek.map((date, index) => (
        <View key={index} style={{ backgroundColor: themeMode.secondary }}>
          <View style={styles.weekContainer}>
            {date.map((dayDate, index) => (
              <Pressable
                key={index}
                onPress={() => dateOnPress(dayDate)}
                style={styles.dateWrapper}
              >
                {isSameMonth(monthStart, dayDate) && (
                  <>
                    <Text style={[styles.dateText, { color: themeMode.subTint }]}>
                      {format(dayDate, 'd')}
                    </Text>
                    <View style={{ minHeight: 50 }}>
                      {dailyTotalHour(dayDate, data) > 0 && (
                        <Text style={[styles.priceText, { color: themeMode.subTint }]}>
                          {dailyTotalHour(dayDate, data)}
                        </Text>
                      )}
                    </View>
                  </>
                )}
              </Pressable>
            ))}
          </View>
          <View style={[styles.total, { backgroundColor: themeMode.card }]}>
            <Text style={[styles.totalPriceText, { color: themeMode.tint }]}>
              {weeklyTotalHour(date, data)}
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
