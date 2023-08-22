import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
  Image
} from 'react-native';
import React, { useState } from 'react';
import { useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationHeader from '../../common-components/NavigationHeader';
import { RootStackParamList } from '../../type';
import SvgIcon from '../../common-components/SvgIcon';
import ModifyForm from './components/ModifyForm';
import { onLaunchImageLibrary } from '../../util/onLaunchImageLibrary';
import { onImageResizer } from '../../util/onImageResizer';
import { IUserInfo } from '../../type';
import Button from '../../common-components/buttons/Button';
import themeChange from '../../util/theme';

type MyInfoModifyScreenRouteProp = RouteProp<RootStackParamList, 'myInfoModifyScreen'>;

const MyInfoModifyScreen = () => {
  const themeMode = themeChange();
  const { params } = useRoute<MyInfoModifyScreenRouteProp>();

  const [userInfo, setUserInfo] = useState<IUserInfo>({
    name: '이상윤',
    phone: '010-4008-2360',
    email: 'zaar625@naver.com',
    image: null
  });

  const onEndEditing = (e: NativeSyntheticEvent<TextInputEndEditingEventData>, type: string) => {
    const textValue = e.nativeEvent.text;

    setUserInfo({ ...userInfo, [type]: textValue });
  };

  const onUserImagePress = async () => {
    const uri = await onLaunchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
      presentationStyle: 'pageSheet'
    });

    if (uri) {
      const resizeImage = await onImageResizer(uri);
      setUserInfo({ ...userInfo, image: resizeImage[0].uri });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[styles.container, { backgroundColor: themeMode.primary }]}>
        <NavigationHeader header={params.header} />
        <View style={styles.contentsContainr}>
          <View>
            <Pressable style={styles.userImageWrapper} onPress={onUserImagePress}>
              {userInfo.image ? (
                <Image source={{ uri: userInfo.image }} resizeMode="cover" style={styles.image} />
              ) : (
                <SvgIcon name="user" width={36} height={36} />
              )}

              <View style={[styles.imageBtn, { backgroundColor: themeMode.primary }]}>
                <SvgIcon name="plus_round" color={'#D9D9D9'} />
              </View>
            </Pressable>

            <ModifyForm
              onEndEditing={e => onEndEditing(e, 'name')}
              placeholder="이름을 입력해주세요"
              defaultValue={userInfo.name}
              label="이름"
            />
            <ModifyForm
              onEndEditing={e => onEndEditing(e, 'phone')}
              keyboardType="number-pad"
              placeholder="휴대폰 번호를 입력해주세요"
              defaultValue={userInfo.phone}
              label="전화번호"
            />
            <ModifyForm
              onEndEditing={e => onEndEditing(e, 'email')}
              placeholder="이메일을 입력해주세요"
              defaultValue={userInfo.email}
              label="이메일"
            />
          </View>
          <Button name="수정하기" onPress={() => {}} />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default MyInfoModifyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentsContainr: {
    flex: 1,
    justifyContent: 'space-between'
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 100
  },
  userImageWrapper: {
    width: 70,
    height: 70,
    backgroundColor: '#B8BABF',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 50
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
