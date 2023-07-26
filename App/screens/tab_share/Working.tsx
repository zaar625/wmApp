import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import themeChange from '../../util/theme';
import ArrowIcon from '../../assets/icon/arrow_right.svg';

import { colors } from '../../theme';

const Working = () => {
  const themeMode = themeChange();

  return (
    <View style={[styles.container, { backgroundColor: themeMode.secondary }]}>
      <View style={styles.working}>
        <Text style={[styles.storeName, { color: themeMode.tint }]}>카페이루</Text>
        <Pressable style={styles.requireBtn}>
          <Text style={[{ color: themeMode.subTint }, styles.btnText]}>출퇴근 수정 요청</Text>
          <ArrowIcon style={styles.icon} color={themeMode.subTint} />
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
    padding: 20,
    marginBottom: 20
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  working: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  requireBtn: {
    flexDirection: 'row',
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
    fontWeight: '600'
  }
});
