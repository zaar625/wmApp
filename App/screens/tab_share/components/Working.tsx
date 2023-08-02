import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import themeChange from '../../../util/theme';
import SvgIcon from '../../../components/SvgIcon';
import { useDispatch } from 'react-redux';
import { openBottomSheet } from '../../../state/slice/bottomSheet';
import { useRoute } from '@react-navigation/native';

const Working = () => {
  const themeMode = themeChange();
  const route = useRoute();
  const dispatch = useDispatch();

  const modifyRequestOnPress = () => {
    dispatch(openBottomSheet({ route: 'shareTabScreen' }));
  };

  return (
    <View style={[styles.container, { backgroundColor: themeMode.secondary }]}>
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
        <View style={styles.round} />
        <Text style={{ color: themeMode.tint }}>근무중</Text>
      </View>

      <View style={styles.time}>
        <Text style={[{ color: themeMode.tint }, styles.marginRight]}>출근:</Text>
        <Text style={[{ color: themeMode.tint }, styles.marginRight]}>23.07.23</Text>
        <Text style={[{ color: themeMode.tint }, styles.marginRight]}>10시 30분</Text>
      </View>

      <View style={styles.time}>
        <Text style={[{ color: themeMode.tint }, styles.marginRight]}>퇴근:</Text>
        <Text style={[{ color: themeMode.tint }, styles.marginRight]}>23.07.23</Text>
        <Text style={[{ color: themeMode.tint }, styles.marginRight]}>17시 30분</Text>
      </View>
    </View>
  );
};

export default Working;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 15,
    marginBottom: 20,
    borderRadius: 15
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
