import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { SemiTitle } from '../../components/Title';
import { colors, deviceheight, fontSizes } from '../../theme';

const PayRoll = () => {
  return (
    <View style={styles.container}>
      <SemiTitle title="매장별 예상 급여" />
      <Text style={styles.titleDesc}>현재 이번달 총 근무시간과 예상급여 금액이예요.</Text>
      <StorePaymentCard />
    </View>
  );
};

const StorePaymentCard = () => {
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.contentTitle}>
        <Text style={styles.contentText}>카페이루</Text>
        <Text style={styles.contentText}>총 15시간 45분 근무하였습니다.</Text>
      </View>
      <Text style={styles.moneyText}>835,000원</Text>
    </View>
  );
};

export default PayRoll;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.dark.secondary,
    marginBottom: 20
  },
  titleDesc: {
    color: '#D9D9D9',
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
  contentText: {
    color: '#fff'
  },
  moneyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'right'
  }
});
