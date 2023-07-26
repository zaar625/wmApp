import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import themeChange from '../../util/theme';
import { SemiTitle } from '../../components/Title';
import { deviceheight } from '../../theme';

const PayRoll = () => {
  const themeMode = themeChange();
  return (
    <View style={[styles.container, { backgroundColor: themeMode.secondary }]}>
      <SemiTitle title="매장별 예상 급여" />
      <Text style={[styles.titleDesc, { color: themeMode.desc }]}>
        현재 이번달 총 근무시간과 예상급여 금액이예요.
      </Text>
      <StorePaymentCard />
    </View>
  );
};

const StorePaymentCard = () => {
  const themeMode = themeChange();
  return (
    <View style={[styles.cardWrapper, { backgroundColor: themeMode.primary }]}>
      <View style={styles.contentTitle}>
        <Text style={{ color: themeMode.tint }}>카페이루</Text>
        <Text style={{ color: themeMode.tint }}>총 15시간 45분 근무하였습니다.</Text>
      </View>
      <Text style={styles.moneyText}>835,000원</Text>
    </View>
  );
};

export default PayRoll;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 20
  },
  titleDesc: {
    marginBottom: 15
  },
  cardWrapper: {
    height: deviceheight * 0.105,
    backgroundColor: '#30394B',
    borderRadius: 10,
    padding: 15,
    justifyContent: 'space-between'
  },
  contentTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  moneyText: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'right'
  }
});
