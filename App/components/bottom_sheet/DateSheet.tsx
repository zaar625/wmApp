import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { closeBottomSheet } from '../../state/slice/bottomSheet';
import SvgIcon from '../SvgIcon';

const DateSheet = () => {
  const dispatch = useDispatch();
  return (
    <View style={{ padding: 20 }}>
      <View style={styles.header}>
        <Text style={styles.title}>4일 수요일 근로 상세</Text>
        <Pressable onPress={() => dispatch(closeBottomSheet())}>
          <SvgIcon name="close" color={'#FFF'} />
        </Pressable>
      </View>
      <View style={styles.totalWorkHourWrapper}>
        <Text style={{ color: '#FFF' }}>총 근무시간: 12H</Text>
        <Text style={{ color: '#FFF' }}>+ 45,000</Text>
      </View>
      <WorkInfoCard />
      <WorkInfoCard />
      <WorkInfoCard />
    </View>
  );
};

const WorkInfoCard = () => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.storeWorkHourWrapper}>
        <Text style={[{ color: '#FFF' }, styles.storeText]}>카페이루</Text>
        <Text style={{ color: '#FFF' }}>18:00 - 22:00 (4H)</Text>
      </View>
      <Text style={{ color: '#FFF' }}>+ 15,000</Text>
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
