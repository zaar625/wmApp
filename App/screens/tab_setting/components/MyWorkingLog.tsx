import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import themeChange from '../../../util/theme';
import { SmallTitle } from '../../../common-components/Title';
import SvgIcon from '../../../common-components/SvgIcon';

const MyWorkingLog = () => {
  const themeMode = themeChange();
  return (
    <View style={[styles.container, { backgroundColor: themeMode.secondary }]}>
      <View style={styles.headerTitle}>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <Image source={require('../../../assets/img/calendar.png')} style={styles.image} />
          <View>
            <SmallTitle title="근무 이력" style={{ marginBottom: 5 }} />
            <Text style={[styles.subDesc, { color: themeMode.subTint }]}>
              매장별 근무이력을 달력에 한눈에 볼 수 있어요.
            </Text>
          </View>
        </View>
        <SvgIcon name="arrow_right" color={themeMode.pressIcon} />
      </View>
    </View>
  );
};

export default MyWorkingLog;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10
  },
  subDesc: {
    fontSize: 12
  }
});
