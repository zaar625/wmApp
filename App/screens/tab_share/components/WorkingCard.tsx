import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React from 'react';
import SvgIcon from '../../../common-components/SvgIcon';
import themeChange from '../../../util/theme';
import { useDispatch } from 'react-redux';
import { openBottomSheet } from '../../../state/slice/bottomSheet';
import { deviceWidth } from '../../../theme';
import { TWorkData } from '../../../util/time';
import { format } from 'date-fns';

const WorkingCard = ({ item, length }: { item: TWorkData; length: number | undefined }) => {
  const themeMode = themeChange();
  const dispatch = useDispatch();
  const { start, end } = item;

  console.log(length);
  const startWork = start ? format(start.toDate(), 'HH시 mm분') : '-';
  const endWork = end ? format(end.toDate(), 'HH시 mm분') : '-';

  const isWorking = !start || !end;

  const modifyRequestOnPress = () => {
    dispatch(openBottomSheet({ route: 'shareTabScreen', data: item }));
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themeMode.secondary,
          width: length && length < 2 ? deviceWidth - 40 : deviceWidth - 60
        }
      ]}
    >
      <View style={styles.header}>
        <View style={styles.storeWrapper}>
          <Image
            source={require('../../../assets/img/store.png')}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={[styles.storeName, { color: themeMode.tint }]}>카페이루</Text>
        </View>
        <Pressable style={styles.requireBtn} onPress={modifyRequestOnPress}>
          <Text style={[{ color: themeMode.pressIcon }, styles.btnText]}>출퇴근 수정 요청</Text>
          <SvgIcon name="arrow_right" style={styles.icon} color={themeMode.pressIcon} />
        </Pressable>
      </View>

      <View style={styles.workState}>
        <View style={[styles.round, { backgroundColor: isWorking ? '#52C648' : 'gray' }]} />
        <Text style={{ color: themeMode.tint }}>{isWorking ? '근무중' : '근무중 아님'}</Text>
      </View>

      <View style={styles.time}>
        <Text style={[{ color: themeMode.tint }, styles.marginRight]}>출근:</Text>
        <Text style={[{ color: themeMode.tint }, styles.marginRight]}>{startWork}</Text>
      </View>

      <View style={styles.time}>
        <Text style={[{ color: themeMode.tint }, styles.marginRight]}>퇴근:</Text>
        <Text style={[{ color: themeMode.tint }, styles.marginRight]}>{endWork}</Text>
      </View>
    </View>
  );
};

export default WorkingCard;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 15,
    marginBottom: 20,
    borderRadius: 15,
    marginRight: 20,
    width: deviceWidth - 60
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20
  },
  requireBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  round: {
    borderRadius: 100,
    backgroundColor: '#52C648',
    width: 8,
    height: 8,
    marginRight: 10
  },
  workState: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },
  marginRight: {
    marginRight: 15
  },
  icon: {
    marginLeft: 5
  },
  btnText: {
    fontWeight: '400',
    fontSize: 12
  }
});
