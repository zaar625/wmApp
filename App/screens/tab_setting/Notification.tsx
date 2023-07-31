import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SemiTitle } from '../../components/Title';
import Switch from '../../components/Switch';
import themeChange from '../../util/theme';

const Notification = () => {
  const themeMode = themeChange();
  return (
    <View style={[styles.container, { backgroundColor: themeMode.secondary }]}>
      <View style={styles.headerWrapper}>
        <SemiTitle title="앱 알림" />
        <Text style={styles.subText}>
          알림을 끄면 수정요청 완료 여부 및 전달사항 알림을 보내지 않아요.
        </Text>
      </View>
      <View style={styles.btnWrapper}>
        <Text style={[styles.btnText, { color: themeMode.tint }]}>푸쉬 알림 받기</Text>
        <Switch />
      </View>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 10
  },
  headerWrapper: {
    marginBottom: 20
  },
  subText: {
    fontSize: 12,
    color: '#D9D9D9'
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  btnText: {
    fontSize: 16,
    fontWeight: '500'
  }
});
