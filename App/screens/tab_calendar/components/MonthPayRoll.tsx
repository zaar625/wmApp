import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import themeChange from '../../../util/theme';
import { SemiTitle } from '../../../common-components/Title';
import { format } from 'date-fns';
import { useWorkingDate } from '../../../api/store/hooks/useMonthlyWork';
import { monthlyTotalHour } from '../../../util/time';
import { calculatePayment } from '../../../util/calculatePayment';

const MonthPayRoll = ({ currentDate }: { currentDate: Date }) => {
  const apiQuery = format(currentDate, 'yyyy-MM');

  const { data } = useWorkingDate(apiQuery);

  const themeMode = themeChange();
  const month = format(currentDate, 'M');

  const monthlyTotalTime = monthlyTotalHour(data);

  const hour = monthlyTotalTime ? Number((monthlyTotalTime / 60).toFixed(1)) : 0;

  const totalPayment = monthlyTotalTime ? calculatePayment(hour) : 0;

  return (
    <View style={[styles.container, { backgroundColor: themeMode.secondary }]}>
      <SemiTitle title={`${month}월 수입`} style={{ marginBottom: 20 }} />

      <View style={[styles.imageWrapper, { marginBottom: 20 }]}>
        <Image
          source={require('../../../assets/img/money.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <View>
          <Text style={[{ color: themeMode.subTint }]}>당월에는</Text>
          <Text style={[{ color: themeMode.subTint }]}>
            <Text style={[{ color: themeMode.tint }, styles.bold]}>{totalPayment}</Text> 원
            벌었어요.
          </Text>
        </View>
      </View>

      <View style={styles.imageWrapper}>
        <Image
          source={require('../../../assets/img/clock.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <View>
          <Text style={[{ color: themeMode.subTint }]}>당월 총 근로시간은</Text>
          <Text style={[{ color: themeMode.subTint }]}>
            <Text style={[{ color: themeMode.tint }, styles.bold]}>{hour} 시간</Text> 근무 했어요.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MonthPayRoll;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 40
  },
  image: {
    width: 35,
    height: 35,
    marginRight: 10
  },
  imageWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  bold: {
    fontWeight: '700'
    // textDecorationLine: 'underline'
  }
});
