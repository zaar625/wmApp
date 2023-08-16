import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SvgIcon from '../../../common-components/SvgIcon';
import themeChange from '../../../util/theme';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../type';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const UserInfo = () => {
  const themeMode = themeChange();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={[styles.container, { backgroundColor: themeMode.secondary }]}>
      <View style={styles.imageWrapper}>
        <SvgIcon name="user" />
      </View>
      <Pressable
        onPress={() => navigation.navigate('myInfoModifyScreen', { header: '내 정보 수정' })}
        style={styles.userInfoWrapper}
      >
        <View>
          <Text style={[styles.name, { color: themeMode.tint }]}>이상윤</Text>
          <Text style={{ color: themeMode.subTint }}>내정보 수정하기</Text>
        </View>
        <SvgIcon name="arrow_right" color={themeMode.pressIcon} />
      </Pressable>
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
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
  }
});
