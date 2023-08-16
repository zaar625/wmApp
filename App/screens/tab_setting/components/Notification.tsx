import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SmallTitle } from '../../../common-components/Title';
import Switch from '../../../common-components/Switch';
import themeChange from '../../../util/theme';

const Notification = () => {
  const themeMode = themeChange();
  return (
    <View style={[styles.container, { backgroundColor: themeMode.secondary }]}>
      <View style={styles.header}>
        <Image
          source={require('../../../assets/img/bell.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.headerTitle}>
          <SmallTitle title="앱 알림" style={{ marginBottom: 5 }} />
          <Text style={[styles.subText, { color: themeMode.subTint }]}>
            수정요청 완료 및 전달사항 알림을 보내지 않아요.
          </Text>
        </View>
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
    marginBottom: 20,
    borderRadius: 15
  },
  header: {
    flexDirection: 'row'
  },
  headerTitle: {
    marginBottom: 20
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10
  },
  subText: {
    fontSize: 12
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  btnText: {
    fontWeight: '500'
  }
});
