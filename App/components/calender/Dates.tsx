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

// 시간함수 테스트용
import { monthTotalHour, dailyWorkInfo } from './handler/totalHourhandler';

const Dates = ({ currentDate }: { currentDate: Date }) => {
  const { data } = useWorkingDate(format(currentDate, 'yyyy-MM'));

  const dailWorkData = dailyWorkInfo('6', data);
  console.log(monthTotalHour(dailWorkData));

  const themeMode = themeChange();
  const dispatch = useDispatch();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  // const startDate = startOfWeek(monthStart);
  // const endDate = endOfWeek(monthEnd);

  const weeksInMonth = eachWeekOfInterval({ start: monthStart, end: monthEnd }); //당월 시작하는 주의 첫번째값

  let datesOfWeek = [];

  for (let i = 0; i < weeksInMonth.length; i++) {
    const week = [...Array(7)].map((_, index) => addDays(weeksInMonth[i], index));
    datesOfWeek.push(week);
  }

  const dateOnPress = () => {
    dispatch(openBottomSheet({ route: 'calendarTabScreen' }));
  };

  const dailyTotalHour = (day: string) => {
    const dailWorkData = dailyWorkInfo(day, data);

    return monthTotalHour(dailWorkData);
  };

  return (
    <>
      {datesOfWeek.map((date, index) => (
        <View key={index} style={{ backgroundColor: themeMode.secondary }}>
          <View style={styles.weekContainer}>
            {date.map((date, index) => (
              <Pressable key={index} onPress={dateOnPress} style={styles.dateWrapper}>
                {isSameMonth(monthStart, date) && (
                  <>
                    <Text style={[styles.dateText, { color: themeMode.subTint }]}>
                      {format(date, 'd')}
                    </Text>
                    <View style={{ minHeight: 50 }}>
                      <Text style={[styles.priceText, { color: themeMode.subTint }]}>
                        + {dailyTotalHour(format(date, 'd')) * 9250}
                      </Text>
                    </View>
                  </>
                )}
              </Pressable>
            ))}
          </View>
          <View style={[styles.total, { backgroundColor: themeMode.card }]}>
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
