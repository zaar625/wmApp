import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SvgIcon from '../SvgIcon';
import themeChange from '../../util/theme';
import Confirm from '../../screens/tab_setting/components/Confirm';
import format from 'date-fns/format';
import NomalButton from '../buttons/NomarButton';
import { useDispatch } from 'react-redux';
import { closeBottomSheet } from '../../state/slice/bottomSheet';

const EditWorkingInfoSheet = ({ data }: any) => {
  const { after, before, start, end } = data;
  const dispatch = useDispatch();
  const themeMode = themeChange();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: themeMode.tint }]}>근태수정 상세</Text>
        <SvgIcon name="close" color={themeMode.pressIcon} />
      </View>

      <View style={[styles.storeWrapper, { borderBottomColor: themeMode.card }]}>
        <Text style={[styles.storeName, { color: themeMode.tint }]}>{after.storeInfo.name}</Text>
        <Confirm confirm={data.confirm} />
      </View>

      <View style={[styles.cardContainer]}>
        <View>
          {/* 수정 후 */}
          <Text style={[styles.bold, { color: '#00B712' }]}>수정 후</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 20
            }}
          >
            <View style={styles.iconWrapper}>
              <SvgIcon
                name="calendar"
                color={themeMode.tint}
                width={20}
                height={20}
                style={styles.icon}
              />
              <Text style={[{ color: themeMode.tint }]}>
                {format(after.date.toDate(), 'yyyy년 MM월 dd일')}
              </Text>
            </View>
            <View style={styles.iconWrapper}>
              <SvgIcon
                name="clock_line"
                color={themeMode.tint}
                width={16}
                height={16}
                style={styles.icon}
              />
              <Text style={[{ color: themeMode.tint }]}>
                {format(after.start.toDate(), 'HH시 mm분')} ~{' '}
                {format(after.end.toDate(), 'HH시 mm분')}
              </Text>
            </View>
          </View>

          {/* 수정 전 */}
          <Text style={[styles.bold, { color: '#C65252' }]}>수정 전</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 20
            }}
          >
            <View style={styles.iconWrapper}>
              <SvgIcon
                name="calendar"
                color={themeMode.subTint}
                width={20}
                height={20}
                style={styles.icon}
              />
              <Text style={[{ color: themeMode.subTint }]}>
                {format(before.date.toDate(), 'yyyy년 MM월 dd일')}
              </Text>
            </View>
            <View style={styles.iconWrapper}>
              <SvgIcon
                name="clock_line"
                color={themeMode.subTint}
                width={16}
                height={16}
                style={styles.icon}
              />
              <Text style={[{ color: themeMode.subTint }]}>
                {format(before.start.toDate(), 'HH시 mm분')} ~{' '}
                {format(before.end.toDate(), 'HH시 mm분')}
              </Text>
            </View>
          </View>
        </View>
        {/* 사유 */}

        <Text style={{ color: themeMode.tint }}>{data.reason}</Text>
      </View>

      <Pressable
        style={{
          alignSelf: 'flex-end',
          padding: 10,
          marginBottom: 20,
          marginRight: 10
        }}
      >
        <Text style={[styles.cancelBtn, { color: themeMode.subTint }]}>요청취소</Text>
      </Pressable>
      <NomalButton name="확인" onPress={() => dispatch(closeBottomSheet())} />
    </View>
  );
};

export default EditWorkingInfoSheet;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    marginBottom: 15
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 16,
    fontWeight: '600'
  },
  storeWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    paddingHorizontal: 20
  },
  storeName: {
    fontWeight: '500'
  },

  cardContainer: {
    paddingHorizontal: 20,

    marginVertical: 15
  },
  icon: {
    marginRight: 5
  },
  iconWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  bold: {
    fontWeight: '700',
    marginBottom: 10
  },

  cancelBtn: {
    textDecorationLine: 'underline',
    fontWeight: '600',

    fontSize: 12
  }
});
