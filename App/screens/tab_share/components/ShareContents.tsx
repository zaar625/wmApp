import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { SmallTitle } from '../../../components/Title';
import ShareItem from './ShareItem';
import SvgIcon from '../../../components/SvgIcon';
import themeChange from '../../../util/theme';

const ShareContents = () => {
  const themeMode = themeChange();
  return (
    <View style={[styles.container, { backgroundColor: themeMode.secondary }]}>
      <View style={[styles.titleHeader, styles.titleWrapper]}>
        <View style={styles.titleWrapper}>
          <Image source={require('../../../assets/img/note.png')} style={styles.image} />
          <SmallTitle title="금일 전달 사항" />
        </View>
        <Pressable style={styles.btn}>
          <Text style={[styles.btnText, { color: themeMode.pressIcon }]}>전체보기</Text>
          <SvgIcon name="arrow_right" style={styles.icon} color={themeMode.pressIcon} />
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
    marginBottom: 20,
    paddingTop: 15,
    borderRadius: 15
  },

  titleHeader: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10
  },
  titleWrapper: {
    flexDirection: 'row'
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
    fontWeight: '400',
    fontSize: 12
  }
});
