import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { closeBottomSheet } from '../../state/slice/bottomSheet';
import SvgIcon from '../SvgIcon';
import { TWorkData, dailyTime } from '../calender/handler/totalHourhandler';
import { format } from 'date-fns';
import { dailyTotalHour } from '../calender/handler/totalHourhandler';

const DateSheet = ({ data }: any) => {
  const FIRSTDATA = 0;
  const selectedDate = data[FIRSTDATA].date.toDate();
  const dailyHour = dailyTotalHour(selectedDate, data);

  const dispatch = useDispatch();
  return (
    <View style={{ padding: 20 }}>
      <View style={styles.header}>
        <Text style={styles.title}>{`${format(selectedDate, 'd')}일 근로 상세`}</Text>
        <Pressable onPress={() => dispatch(closeBottomSheet())}>
          <SvgIcon name="close" color={'#FFF'} />
        </Pressable>
      </View>
      <View style={styles.totalWorkHourWrapper}>
        <Text style={{ color: '#FFF' }}>{`총 근무시간: ${dailyHour}H`}</Text>
        <Text style={{ color: '#FFF' }}>{`+ ${Math.floor(dailyHour * 9250)}원`}</Text>
      </View>
      {data.map((workItem: TWorkData, index: number) => (
        <WorkInfoCard workItem={workItem} key={index} />
      ))}
    </View>
  );
};

const WorkInfoCard = ({ workItem }: { workItem: TWorkData }) => {
  const { date, end, start, storeName } = workItem;

  const { startWork, endWork, totalHour } = dailyTime(start, end);
  return (
    <View style={styles.cardContainer}>
      <View style={styles.storeWorkHourWrapper}>
        <Text style={[{ color: '#FFF' }, styles.storeText]}>카페이루</Text>
        <Text style={{ color: '#FFF' }}>{`${startWork} ~ ${endWork} (${totalHour}H)`}</Text>
      </View>
      <Text style={{ color: '#FFF' }}>{`+ ${totalHour * 9620}`}</Text>
    </View>
  );
};

export default DateSheet;

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 20,
    color: '#FFF'
  },
  totalWorkHourWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomColor: '#202632'
  },
  cardContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#202632',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10
  },
  storeWorkHourWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  storeText: {
    marginRight: 10,
    fontWeight: '600',
    fontSize: 16
  }
});
