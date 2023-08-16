import { StyleSheet, FlatList, Text, View } from 'react-native';
import React from 'react';
import WorkingCard from './WorkingCard';
import { deviceWidth } from '../../../theme';
import { format } from 'date-fns';
import { useWorkingDate } from '../../../api/store/hooks/useMonthlyWork';
import { TWorkData } from '../../../util/time';

const Working = () => {
  const query = format(new Date(), 'yyyy-MM');
  const { data } = useWorkingDate(query);

  function findTodayData(data: TWorkData[] | undefined) {
    if (!data) return;

    const findToday = data.filter(dateWorkInfo => {
      // const today = format(new Date(), 'yyyy-MM-dd');
      const today = '2023-08-15';
      return today === format(dateWorkInfo.date.toDate(), 'yyyy-MM-dd');
    });

    return findToday;
  }

  const todayWorks = findTodayData(data);

  const CARD_GAP = 8;
  const NEXT_CARD_OFFSET = 16;

  return (
    <FlatList
      automaticallyAdjustContentInsets={false}
      contentContainerStyle={{
        paddingHorizontal: NEXT_CARD_OFFSET + CARD_GAP / 2
      }}
      decelerationRate="fast"
      horizontal
      pagingEnabled
      snapToInterval={deviceWidth - 60 + CARD_GAP}
      snapToAlignment="start"
      showsHorizontalScrollIndicator={false}
      data={todayWorks}
      renderItem={({ item }) => <WorkingCard item={item} />}
    />
  );
};

export default Working;

const styles = StyleSheet.create({});
