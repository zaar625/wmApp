import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { closeBottomSheet } from '../../state/slice/bottomSheet';
import SvgIcon from '../SvgIcon';
import { TWorkData, dailyTime } from '../../util/time';
import { format } from 'date-fns';
import { dailyTotalTime, changeTime } from '../../util/time';
import themeChange from '../../util/theme';
import { calculatePayment } from '../../util/calculatePayment';

const DateSheet = ({ data, date }: { data: TWorkData[]; date: Date }) => {
  const dispatch = useDispatch();
  const themeMode = themeChange();

  const getTotalHourForDate = () => {
    if (data.length === 0) return 0;

    const dailyTime = dailyTotalTime(date, data);

    return dailyTime;
  };

  const { hour, minute } = changeTime(getTotalHourForDate());

  return (
    <View style={{ padding: 20 }}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: themeMode.tint }]}>{`${format(
          date,
          'd'
        )}일 근로 상세`}</Text>
        <Pressable onPress={() => dispatch(closeBottomSheet())}>
          <SvgIcon name="close" color={themeMode.tint} />
        </Pressable>
      </View>
      <View style={styles.totalWorkHourWrapper}>
        <Text style={{ color: themeMode.tint }}>{`총 근무시간: ${hour}시간 ${minute}분`}</Text>
        <Text style={{ color: themeMode.tint }}>+ {calculatePayment(getTotalHourForDate())}원</Text>
      </View>
      {data?.map((workItem: TWorkData, index: number) => (
        <WorkInfoCard workItem={workItem} key={index} />
      ))}
    </View>
  );
};

const WorkInfoCard = ({ workItem }: { workItem: TWorkData }) => {
  const { end, start } = workItem;

  const themeMode = themeChange();
  const dailyTotalMinute = dailyTime(start, end);

  const { hour, minute } = changeTime(dailyTotalMinute?.totalMin);

  return (
    <>
      {dailyTotalMinute && (
        <View style={[styles.cardContainer, { backgroundColor: themeMode.card }]}>
          <Text style={[{ color: themeMode.tint }, styles.storeText]}>{`카페이루`}</Text>
          <View style={[styles.timeWrapper]}>
            <View style={styles.iconWrapper}>
              <SvgIcon name="clock_line" width={15} height={15} style={styles.icon} />
              <Text
                style={{ color: themeMode.tint }}
              >{`${dailyTotalMinute.startWork} ~ ${dailyTotalMinute.endWork}`}</Text>
            </View>
            <View style={styles.iconWrapper}>
              <SvgIcon name="money_line" width={18} height={18} style={styles.icon} />
              <Text style={{ color: themeMode.tint }}>
                총 {calculatePayment(dailyTotalMinute.totalMin)}원
              </Text>
            </View>
          </View>
        </View>
      )}
    </>
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
    marginBottom: 20
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
    paddingVertical: 10,
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
    fontSize: 16,
    marginBottom: 15
  },
  timeWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  iconWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginRight: 5
  }
});
