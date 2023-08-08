import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import themeChange from '../../../util/theme';
import SvgIcon from '../../../components/SvgIcon';
import { SemiTitle } from '../../../components/Title';

const PayRoll = () => {
  const themeMode = themeChange();
  return (
    <View style={[styles.container, { backgroundColor: themeMode.secondary }]}>
      <View style={styles.header}>
        <SemiTitle title="매장별 예상 급여" />
        <SvgIcon name="arrow_right" color={themeMode.pressIcon} />
      </View>
      <View style={styles.imageWrapper}>
        <Image
          source={require('../../../assets/img/money.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={{ color: themeMode.subTint }}>{`이번달에는${`\n`}835,000원 벌었어요.`}</Text>
      </View>
      <View style={styles.imageWrapper}>
        <Image
          source={require('../../../assets/img/clock.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <Text
          style={[{ color: themeMode.subTint }]}
        >{`총 근로시간은${`\n`}15시간 40분이예요.`}</Text>
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
  }
});
