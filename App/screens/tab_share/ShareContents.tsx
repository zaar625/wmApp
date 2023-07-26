import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { SemiTitle } from '../../components/Title';
import ShareItem from './ShareItem';
import ArrowIcon from '../../assets/icon/arrow_right.svg';
import themeChange from '../../util/theme';

import { colors } from '../../theme';

const ShareContents = () => {
  const themeMode = themeChange();
  return (
    <View style={{ backgroundColor: themeMode.secondary }}>
      <View style={[styles.titleHeader, styles.titleWrapper]}>
        <View style={styles.titleWrapper}>
          <Image source={require('../../assets/img/target.png')} style={styles.image} />
          <SemiTitle title="금일 전달 사항" />
        </View>
        <Pressable style={styles.btn}>
          <Text style={[styles.btnText, { color: themeMode.subTint }]}>전체보기</Text>
          <ArrowIcon style={styles.icon} color={themeMode.subTint} />
        </Pressable>
      </View>
      <ShareItem />
      <ShareItem />
      <ShareItem />
    </View>
  );
};

export default ShareContents;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark.secondary
  },
  titleHeader: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginLeft: 5
  },
  btnText: {
    fontWeight: '600'
  }
});
