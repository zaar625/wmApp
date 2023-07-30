import { StyleSheet, Text, View } from 'react-native';
import { ko } from 'date-fns/locale';
import React, { useEffect } from 'react';
import {
  startOfWeek,
  endOfMonth,
  startOfMonth,
  endOfWeek,
  addDays,
  startOfDay,
  format,
  eachWeekOfInterval,
  isSameMonth
} from 'date-fns';

const Dates = ({ currentMonth }: { currentMonth: Date }) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const weeksInMonth = eachWeekOfInterval({ start: monthStart, end: monthEnd });

  let days = [];

  for (let i = 0; i < weeksInMonth.length; i++) {
    const week = [...Array(7)].map((_, index) => addDays(weeksInMonth[i], index));
    days.push(week);
  }

  return (
    <>
      {days.map((dateOfweeks, index) => (
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {dateOfweeks.map(date => (
              <View style={{ flex: 1, borderWidth: 1 }}>
                {isSameMonth(monthStart, date) && (
                  <>
                    <Text style={{ textAlign: 'right' }}>{format(date, 'd')}</Text>
                    <View style={{ height: 50, backgroundColor: '#afafaf' }}>
                      <Text style={{ alignSelf: 'center' }}>11,000</Text>
                    </View>
                  </>
                )}
              </View>
            ))}
          </View>
          <View style={{ backgroundColor: '#626060', height: 20 }}></View>
        </View>
      ))}
    </>
  );
};

export default Dates;

const styles = StyleSheet.create({});
