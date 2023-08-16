import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import themeChange from '../../../util/theme';
import SvgIcon from '../../../common-components/SvgIcon';
import { SemiTitle } from '../../../common-components/Title';
import format from 'date-fns/format';
import { useWorkingDate } from '../../../api/store/hooks/useMonthlyWork';
import { monthlyTotalHour, changeTime } from '../../../util/time';
import { calculatePayment } from '../../../util/calculatePayment';
const PayRoll = () => {
  const themeMode = themeChange();
  const query = format(new Date(), 'yyyy-MM');
  const { data } = useWorkingDate(query);

  const totalTime = monthlyTotalHour(data);

  const totalPayment = totalTime ? calculatePayment(totalTime) : 0;
  const { hour, minute } = changeTime(totalTime);

  return (
    <View style={[styles.container, { backgroundColor: themeMode.secondary }]}>
      <View style={styles.header}>
        <SemiTitle title="월별 예상 급여" />
        <SvgIcon name="arrow_right" color={themeMode.pressIcon} />
      </View>
      <View style={styles.imageWrapper}>
        <Image
          source={require('../../../assets/img/money.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={{ color: themeMode.subTint }}>
          이번달에는{`\n`}
          <Text style={[styles.boldText, { color: themeMode.tint }]}>{totalPayment}원 </Text>
          벌었어요.
        </Text>
      </View>
      <View style={styles.imageWrapper}>
        <Image
          source={require('../../../assets/img/clock.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={[{ color: themeMode.subTint }]}>
          총 근로시간은{`\n`}
          <Text style={[styles.boldText, { color: themeMode.tint }]}>
            {hour}시간 {minute}분
          </Text>
          이예요.
        </Text>
      </View>
    </View>
  );
};

export default PayRoll;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 5,
    borderRadius: 15
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10
  },
  imageWrapper: {
    flexDirection: 'row',
    marginBottom: 15
  },
  boldText: {
    fontWeight: '700'
  }
});
