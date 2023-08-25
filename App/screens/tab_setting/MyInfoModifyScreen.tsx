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
import React, { useEffect, useState } from 'react';
import { useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationHeader from '../../common-components/NavigationHeader';
import { RootStackParamList } from '../../type';
import SvgIcon from '../../common-components/SvgIcon';
import ModifyForm from './components/ModifyForm';
import { onLaunchImageLibrary } from '../../util/onLaunchImageLibrary';
import { onImageResizer } from '../../util/onImageResizer';
import Button from '../../common-components/buttons/Button';
import themeChange from '../../util/theme';
import auth from '@react-native-firebase/auth';
import { useGetUserProfile } from '../../api/store/hooks/useGetuUserProfile';
import { profileImageUpLoad } from './handlers/profileImageUpLoad';
import { useUpdateProfile } from '../../api/store/hooks/useUpdateProfile';
import { useDispatch } from 'react-redux';
import { openModal, closeModal } from '../../state/slice/modal';
import { useNavigation } from '@react-navigation/native';
import { logOut } from '../../api/auth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type MyInfoModifyScreenRouteProp = RouteProp<RootStackParamList, 'myInfoModifyScreen'>;

const MyInfoModifyScreen = () => {
  const themeMode = themeChange();
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { params } = useRoute<MyInfoModifyScreenRouteProp>();
  const { mutate } = useUpdateProfile();

  const user = auth().currentUser;
  const { data } = useGetUserProfile(user?.uid);

  const [userInfo, setUserInfo] = useState<any>();

  useEffect(() => {
    setUserInfo(data);
  }, [data]);

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

      setUserInfo({ ...userInfo, photoURL: resizeImage[0].uri });
    }
  };

  const upLoadProfile = async () => {
    const uploadImage = await profileImageUpLoad(userInfo?.photoURL);

    mutate(
      { ...userInfo, photoURL: uploadImage },
      {
        onSuccess: () => {
          dispatch(
            openModal({
              modalType: 'OneBtnModal',
              isOpen: true,
              contents: {
                title: '수정이 완료되었습니다.',
                content: `나의 정보가 수정되었습니다.`,
                onPress() {
                  dispatch(closeModal());
                  navigation.goBack();
                }
              }
            })
          );
        }
      }
    );
  };

  const logOutOnPress = () => {
    dispatch(
      openModal({
        type: 'TwoBtnModal',
        contents: {
          title: '로그아웃을 하시겠어요?',
          content: `수정하지 않은 정보는 유실됩니다.`,
          buttons: {
            취소: () => dispatch(closeModal()),
            로그아웃: () =>
              logOut().then(() => {
                navigation.reset({ index: 0, routes: [{ name: 'employeeLoginPage' }] });
                dispatch(closeModal());
              })
          }
        }
      })
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[styles.container, { backgroundColor: themeMode.primary }]}>
        <NavigationHeader header={params.header} />
        <View style={styles.contentsContainr}>
          <View>
            <Pressable style={styles.userImageWrapper} onPress={onUserImagePress}>
              {userInfo?.photoURL ? (
                <Image
                  source={{ uri: userInfo.photoURL }}
                  resizeMode="cover"
                  style={styles.image}
                />
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
              defaultValue={userInfo?.name}
              label="이름"
            />
            <ModifyForm
              onEndEditing={e => onEndEditing(e, 'phone')}
              keyboardType="number-pad"
              placeholder="휴대폰 번호를 입력해주세요"
              defaultValue={userInfo?.phone}
              label="전화번호"
            />
            <ModifyForm
              editable={false}
              placeholder="이메일을 입력해주세요"
              defaultValue={userInfo?.email}
              label="이메일"
            />

            <Pressable onPress={logOutOnPress}>
              <Text style={[styles.logOut, { color: themeMode.subTint }]}>로그아웃</Text>
            </Pressable>
          </View>
          <Button name="수정하기" onPress={upLoadProfile} />
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
  },
  logOut: {
    alignSelf: 'center',
    textDecorationLine: 'underline',
    fontSize: 12
  }
});
