import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SmallTitle } from '../../../common-components/Title';
import ShareItem from './ShareItem';
import SvgIcon from '../../../common-components/SvgIcon';
import themeChange from '../../../util/theme';
import { useTotalLogsData } from '../../../api/store/hooks/useLogsData';

const ShareContents = () => {
  const themeMode = themeChange();
  const { data } = useTotalLogsData();

  const render = () => {
    if (data && data.length > 0) {
      return data.map((item, index) => <ShareItem key={index} item={item} />);
    } else {
      return (
        <View style={styles.nonData}>
          <Text style={{ color: themeMode.subTint }}>금일 전달사항이 없습니다.</Text>
        </View>
      );
    }
  };

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
      {render()}
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
  },
  nonData: {
    alignSelf: 'center',
    marginVertical: 20
  }
});
