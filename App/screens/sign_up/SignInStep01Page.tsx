import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, TextInput } from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { signUpUserInfo } from '../../state/slice/signUp';
import { NavigationScreenProps } from '../../type';
import { ScreenTitle } from '../../common-components/Title';
import InputBox from '../login/InputBox';
import Button from '../../common-components/buttons/Button';
import themeChange from '../../util/theme';

const SingInStep01 = ({ navigation }: NavigationScreenProps) => {
  const dispatch = useDispatch();
  const themeMode = themeChange();

  const [userInfo, setUserInfo] = useState<{ [key: string]: string }>({
    name: '',
    email: '',
    phone: ''
  });

  const [nameInputError, setNameInputError] = useState({
    error: false,
    errorMessage: '이름이 입력되지 않았어요!'
  });
  const [phoneInputError, setPhoneInputError] = useState({
    error: false,
    errorMessage: '휴대폰 번호가 잘못입력되었어요!'
  });
  const [emailInputError, setEmailInputError] = useState({
    error: false,
    errorMessage: '이메일 형식을 다시한번 확인해주세요!'
  });

  const nameInputRef = useRef<null | TextInput>(null);
  const emailInputRef = useRef<null | TextInput>(null);
  const phoneInputRef = useRef<null | TextInput>(null);

  const checkedEmail = (email: string) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;

    const checkedValue = emailRegex.test(email);

    if (!checkedValue) {
      setEmailInputError({ ...emailInputError, error: true });
      setUserInfo({ ...userInfo, email: '' });
    } else {
      setUserInfo({ ...userInfo, email });
      inputSubmit({ next: 'password' });
    }
  };

  const inputSubmit = ({ next }: { next: string }) => {
    if (next === 'email') emailInputRef.current?.focus();
    if (next === 'password') phoneInputRef.current?.focus();
  };

  const onNextBtn = () => {
    const userInfoValues = Object.values(userInfo);
    const allIsTruthy = userInfoValues.every(info => info.length !== 0);
    if (allIsTruthy) {
      dispatch(signUpUserInfo(userInfo));
      navigation.navigate('signInStep02Page');
    }
  };

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[styles.container, { backgroundColor: themeMode.primary }]}>
        <ScreenTitle title="회원정보 입력" style={{ paddingHorizontal: 20 }} />
        <View style={styles.content}>
          <View style={styles.form}>
            <InputBox
              ref={nameInputRef}
              label="이름"
              placeholder="이름을 입력해주세요."
              onEndEditing={({ nativeEvent: { text } }) => {
                if (!text.length) {
                  setNameInputError({ ...nameInputError, error: true });
                  setUserInfo({ ...userInfo, name: '' });
                } else {
                  inputSubmit({ next: 'email' });
                  setUserInfo({ ...userInfo, name: text });
                }
              }}
              eyeIconVisible={false}
              closeIconVisible={true}
              errorType={{ errType: nameInputError, handler: setNameInputError }}
            />

            <InputBox
              ref={emailInputRef}
              label="이메일"
              placeholder="이메일을 입력해주세요."
              onEndEditing={({ nativeEvent: { text } }) => {
                checkedEmail(text);
              }}
              eyeIconVisible={false}
              closeIconVisible={true}
              errorType={{ errType: emailInputError, handler: setEmailInputError }}
            />

            <InputBox
              ref={phoneInputRef}
              label="휴대폰 번호"
              placeholder="휴대폰 번호를 입력해주세요."
              eyeIconVisible={false}
              closeIconVisible={false}
              keyboardType="number-pad"
              onEndEditing={({ nativeEvent: { text } }) => {
                if (text.length !== 11) {
                  setPhoneInputError({ ...phoneInputError, error: true });
                  setUserInfo({ ...userInfo, phone: '' });
                } else setUserInfo({ ...userInfo, phone: text });
              }}
              onSelectionChange={({ nativeEvent: { selection } }) => {
                const { end: phoneNumLengthValue } = selection;
                if (phoneNumLengthValue === 11) Keyboard.dismiss();
              }}
              errorType={{ errType: phoneInputError, handler: setPhoneInputError }}
            />
          </View>

          <Button name="다음" onPress={onNextBtn} />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SingInStep01;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    justifyContent: 'space-between'
  },
  form: {
    paddingHorizontal: 20
  },
  propsStyle: {
    paddingVertical: 20,
    marginBottom: 20
  },
  errorMessage: {
    marginBottom: 10,
    alignSelf: 'center'
  }
});
