import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import React, { useState } from 'react';
import { useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationHeader from '../../common/NavigationHeader';
import { RootStackParamList } from '../../type';
import SvgIcon from '../../components/SvgIcon';
import ModifyInput from './components/ModifyInput';

import themeChange from '../../util/theme';

type MyInfoModifyScreenRouteProp = RouteProp<RootStackParamList, 'myInfoModifyScreen'>;

const MyInfoModifyScreen = () => {
  const themeMode = themeChange();
  const { params } = useRoute<MyInfoModifyScreenRouteProp>();

  const [userInfo, setUserInfo] = useState({
    name: '이상윤',
    phone: '010-4008-2360',
    email: 'zaar625@naver.com'
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[styles.container, { backgroundColor: themeMode.primary }]}>
        <NavigationHeader header={params.header} />

        <Pressable style={styles.userImageWrapper}>
          <SvgIcon name="user" width={36} height={36} />
          <View style={[styles.imageBtn, { backgroundColor: themeMode.primary }]}>
            <SvgIcon name="plus_round" color={'#D9D9D9'} />
          </View>
        </Pressable>

        <ModifyInput />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default MyInfoModifyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  userImageWrapper: {
    width: 70,
    height: 70,
    backgroundColor: '#B8BABF',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  imageBtn: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 100,
    bottom: -5,
    right: -5,
    padding: 6
  }
});
