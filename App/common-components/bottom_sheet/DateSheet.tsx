import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { closeBottomSheet } from '../../state/slice/bottomSheet';
import SvgIcon from '../SvgIcon';
import { TWorkData, dailyTime } from '../../util/time';
import { format } from 'date-fns';
import { dailyTotalTime, changeTime } from '../../util/time';
import themeChange from '../../util/theme';
import { calculatePayment } from '../../util/calculatePayment';
import { imagePath } from '../../assets/img/imagePath';

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
  const { end, start, storeInfo } = workItem;

  const storeTypeImage = imagePath[storeInfo.class];

  const themeMode = themeChange();
  const dailyTotalMinute = dailyTime(start, end);

  const { hour, minute } = changeTime(dailyTotalMinute?.totalMin);

  return (
    <>
      {dailyTotalMinute && (
        <View style={[styles.cardContainer, { backgroundColor: themeMode.card }]}>
          <View style={[styles.imageBackground, { backgroundColor: themeMode.secondary }]}>
            <Image source={storeTypeImage} style={{ width: 35, height: 35 }} />
          </View>
          <View style={styles.workInfoContainer}>
            <Text style={[{ color: themeMode.tint }, styles.storeText]}>{storeInfo.name}</Text>
            <View style={[styles.timeInfoWrapper]}>
              <View style={styles.iconWrapper}>
                <SvgIcon
                  name="clock_line"
                  width={15}
                  height={15}
                  style={styles.icon}
                  color={themeMode.pressIcon}
                />
                <Text
                  style={{ color: themeMode.pressIcon, fontSize: 13 }}
                >{`${dailyTotalMinute.startWork} ~ ${dailyTotalMinute.endWork}`}</Text>
              </View>
              <View style={styles.iconWrapper}>
                <SvgIcon
                  name="money_line"
                  width={18}
                  height={18}
                  style={styles.icon}
                  color={themeMode.pressIcon}
                />
                <Text style={{ color: themeMode.pressIcon, fontSize: 13 }}>
                  총 {calculatePayment(dailyTotalMinute.totalMin)}원
                </Text>
              </View>
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
  imageBackground: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginRight: 10
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 20
  },
  workInfoContainer: {
    justifyContent: 'space-around',
    flex: 1
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
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row'
  },
  storeWorkHourWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  storeText: {
    fontWeight: '600',
    fontSize: 14
  },
  timeInfoWrapper: {
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
