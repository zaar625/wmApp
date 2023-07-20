import { StyleSheet, View } from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../state/store';
import signUp, { userInfo } from '../../state/slice/signUp';

import { NavigationScreenProps } from '../../type';

import ScreenTitle from '../../components/ScreenTitle';
import InputBox from '../login/InputBox';
import NomalButton from '../../components/buttons/NomarButton';
import ErrorGuide from '../../components/ErrorGuide';

import { colors } from '../../theme';
import { TextInput } from 'react-native-gesture-handler';
import useInputError from '../../hooks/useInputError';

const SingInStep01 = ({ navigation }: NavigationScreenProps) => {
  const user = useSelector((state: RootState) => state.signUp);
  const dispatch = useDispatch();
  const [requiredAllchecked, setRequiredAllchecked] = useState<null | boolean>(null);

  const [userInfo, setUserInfo] = useState<{ [key: string]: string }>({
    name: '',
    email: '',
    phone: ''
  });
  console.log(userInfo);

  const { setInputError, inputError } = useInputError({
    error: false,
    errorMessage: '올바른 이메일 형식이 아닙니다.'
  });

  const nameInputRef = useRef<null | TextInput>(null);
  const emailInputRef = useRef<null | TextInput>(null);
  const phoneInputRef = useRef<null | TextInput>(null);

  const checkedEmail = (email: string) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;

    const checkedValue = emailRegex.test(email);

    if (!checkedValue) {
      setInputError({ ...inputError, error: true });
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
    const allChecked = userInfoValues.every(info => info.length !== 0);
    if (allChecked) {
      navigation.navigate('signInStep02Page');
    } else {
      setRequiredAllchecked(false);
    }
  };

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  useEffect(() => {
    setRequiredAllchecked(null);
  }, [userInfo]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <ScreenTitle title="회원정보 입력" />
        <View style={styles.form}>
          <InputBox
            ref={nameInputRef}
            label="이름"
            placeholder="이름을 입력해주세요."
            onSubmitEditing={() => {
              inputSubmit({ next: 'email' });
            }}
            onEndEditing={({ nativeEvent: { text } }) => {
              if (!text.length) {
                setInputError({ error: true, errorMessage: '이름을 입력해주세요.' });
              } else {
                setUserInfo({ ...userInfo, name: text });
              }
            }}
            eyeIconVisible={false}
            closeIconVisible={true}
            errorType={{ errType: inputError, handler: setInputError }}
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
            errorType={{ errType: inputError, handler: setInputError }}
          />

          <InputBox
            ref={phoneInputRef}
            label="휴대폰 번호"
            placeholder="휴대폰 번호를 입력해주세요."
            eyeIconVisible={false}
            closeIconVisible={false}
            keyboardType="number-pad"
            onEndEditing={({ nativeEvent: { text } }) => setUserInfo({ ...userInfo, phone: text })}
            onSelectionChange={({ nativeEvent: { selection } }) => {
              const { end: phoneNumLengthValue } = selection;
              if (phoneNumLengthValue === 11) Keyboard.dismiss();
            }}
          />
        </View>
        {requiredAllchecked === false && (
          <ErrorGuide message="앗! 작성하하신 것에 문제가 있어요!" style={styles.errorMessage} />
        )}
        <NomalButton name="다음" onPress={onNextBtn} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SingInStep01;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.primary
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
