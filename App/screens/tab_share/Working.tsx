import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ArrowIcon from '../../assets/icon/arrow_right.svg';

import { colors } from '../../theme';

const Working = () => {
  return (
    <View style={styles.container}>
      <View style={styles.working}>
        <Text style={styles.storeName}>카페이루</Text>
        <Pressable style={styles.requireBtn}>
          <Text style={styles.btnText}>출퇴근 수정 요청</Text>
          <ArrowIcon />
        </Pressable>
      </View>

      <View style={styles.workState}>
        <View style={styles.round} />
        <Text style={[styles.baseText]}>근무중</Text>
      </View>

      <View style={styles.time}>
        <Text style={[styles.baseText, styles.marginRight]}>출근:</Text>
        <Text style={[styles.baseText, styles.marginRight]}>23.07.23</Text>
        <Text style={[styles.baseText, styles.marginRight]}>10시 30분</Text>
      </View>

      <View style={styles.time}>
        <Text style={[styles.baseText, styles.marginRight]}>퇴근:</Text>
        <Text style={[styles.baseText, styles.marginRight]}>23.07.23</Text>
        <Text style={[styles.baseText, styles.marginRight]}>17시 30분</Text>
      </View>
    </View>
  );
};

export default Working;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark.secondary,
    padding: 20,
    marginBottom: 20
  },
  storeName: {
    fontSize: 18,
    color: '#fff',
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
  btnText: {
    color: '#BAC0CE',
    fontSize: 14
  },
  baseText: {
    color: '#fff',
    fontSize: 16
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
  }
});
