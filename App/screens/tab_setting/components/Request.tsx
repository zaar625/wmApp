import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { SmallTitle } from '../../../components/Title';
import themeChange from '../../../util/theme';
import SvgIcon from '../../../components/SvgIcon';

import RequestDetailCard from './RequestDetailCard';

const Request = () => {
  const themeMode = themeChange();
  return (
    <View style={[styles.container, { backgroundColor: themeMode.secondary }]}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Image
            source={require('../../../assets/img/eraser.png')}
            style={styles.image}
            resizeMode="contain"
          />
          <View>
            <SmallTitle title="수정요청 건" style={{ marginBottom: 5 }} />
            <Text style={[styles.subDesc, { color: themeMode.subTint }]}>
              해당 월에 대한 요청 건만 보여드려요.
            </Text>
          </View>
        </View>
        <View style={styles.btnWrapper}>
          <Text style={[styles.btnText, { color: themeMode.pressIcon }]}>더보기</Text>
          <SvgIcon name="arrow_right" color={themeMode.pressIcon} />
        </View>
      </View>

      <View style={styles.cardsContainer}>
        <RequestDetailCard />
        <RequestDetailCard />
        <RequestDetailCard />
      </View>
    </View>
  );
};

export default Request;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderRadius: 15
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10
  },
  headerTitle: {
    flexDirection: 'row'
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10
  },

  btnWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  btnText: {
    color: '#BAC0CE',
    fontSize: 12,
    marginRight: 10
  },
  subDesc: {
    fontSize: 12
  },
  cardsContainer: {
    marginVertical: 10
  }
});
