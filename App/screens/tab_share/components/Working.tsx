import { StyleSheet, FlatList, Text, View, Image } from 'react-native';
import React from 'react';
import WorkingCard from './WorkingCard';
import { deviceWidth, deviceheight } from '../../../theme';
import { format } from 'date-fns';
import { useWorkingDate } from '../../../api/store/hooks/useMonthlyWork';
import { TWorkData } from '../../../util/time';
import themeChange from '../../../util/theme';

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

  const todayWorks = findTodayData(data)?.sort((a, b) => {
    const timestampA = a.date.seconds;
    const timestampB = b.date.seconds;

    return timestampB - timestampA; // 최신 날짜 순으로 정렬
  });

  const CARD_GAP = 8;
  const NEXT_CARD_OFFSET = 16;

  return (
    <FlatList
      bounces={false}
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
      ListEmptyComponent={EmptyCard}
      renderItem={({ item }) => <WorkingCard item={item} />}
    />
  );
};

const EmptyCard = () => {
  const themeMode = themeChange();
  return (
    <View style={[styles.container, { backgroundColor: themeMode.secondary }]}>
      <View style={styles.storeWrapper}>
        <Image
          source={require('../../../assets/img/store.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={[styles.storeName, { color: themeMode.tint }]}>근무 이력</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={[styles.nonText, { color: themeMode.subTint }]}>
          금일 근무 이력이 없습니다.
        </Text>
      </View>
    </View>
  );
};

export default Working;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 20,
    width: deviceWidth - 40,
    minHeight: deviceheight * 0.192
  },
  storeWrapper: {
    flexDirection: 'row'
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10
  },
  nonText: {
    // alignSelf: 'center'
  }
});
