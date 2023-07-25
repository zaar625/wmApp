import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { SemiTitle } from '../../components/Title';
import ShareItem from './ShareItem';
import ArrowIcon from '../../assets/icon/arrow_right.svg';

import { colors } from '../../theme';

const ShareContents = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.titleHader, styles.titleWrapper]}>
        <View style={styles.titleWrapper}>
          <Image source={require('../../assets/img/target.png')} style={styles.image} />
          <SemiTitle title="금일 전달 사항" />
        </View>
        <Pressable style={styles.btn}>
          <Text style={styles.btnText}>전체보기</Text>
          <ArrowIcon />
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
  titleHader: {
    justifyContent: 'space-between',
    padding: 20
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
  btnText: {
    color: '#BAC0CE'
  }
});
