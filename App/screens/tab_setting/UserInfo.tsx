import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SvgIcon from '../../components/SvgIcon';
import themeChange from '../../util/theme';

const UserInfo = () => {
  const themeMode = themeChange();
  return (
    <View style={[styles.container, { backgroundColor: themeMode.secondary }]}>
      <View style={styles.imageWrapper}>
        <SvgIcon name="user" />
      </View>
      <Pressable style={styles.userInfoWrapper}>
        <View>
          <Text style={[styles.name, { color: themeMode.tint }]}>이상윤</Text>
          <Text style={styles.subtext}>내정보 수정하기</Text>
        </View>
        <SvgIcon name="arrow_right" color={'#BAC0CE'} />
      </Pressable>
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10
  },
  imageWrapper: {
    backgroundColor: '#B8BABF',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginRight: 20
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center'
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10
  },
  subtext: {
    color: '#BAC0CE'
  }
});
