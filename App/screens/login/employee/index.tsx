import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Pressable
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationScreenProps } from '../../../type';

import ScreenTitle from '../../../components/ScreenTitle';
import InputBox from '../InputBox';
import NomalButton from '../../../components/buttons/NomarButton';

export default function EmployeeLoginPage({ navigation }: NavigationScreenProps) {
  const emailInputRef = useRef<null | TextInput>(null);
  const passwordInputRef = useRef<null | TextInput>(null);

  const inputSubmit = () => {
    passwordInputRef.current?.focus();
  };

  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.bg}>
        <ScreenTitle title="로그인하기" />

        <View style={styles.form}>
          <InputBox
            ref={emailInputRef}
            onSubmitEditing={inputSubmit}
            placeholder="이메일을 입력해주세요."
            label="이메일"
            eyeIconVisible={false}
            closeIconVisible
          />
          <InputBox
            ref={passwordInputRef}
            placeholder="비밀번호를 입력해주세요."
            label="비밀번호"
            eyeIconVisible
            closeIconVisible
          />
        </View>

        <NomalButton name="로그인" onPress={() => {}} />
        {/* 회원가입 및 비밀번호 */}
        <View style={styles.subBtn}>
          <Pressable onPress={() => navigation.navigate('singInStep01Page')}>
            <Text style={[styles.subBtnText]}>회원가입</Text>
          </Pressable>
          <View
            style={{ height: '60%', backgroundColor: '#C9C9C9', width: 1, marginHorizontal: 10 }}
          />
          <Text style={styles.subBtnText}>비밀번호찾기</Text>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#30394B',
    flex: 1
  },
  titleText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 36,
    marginBottom: 40
  },
  form: {
    paddingHorizontal: 20
  },
  Btn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    backgroundColor: '#326273',
    borderRadius: 10,
    marginHorizontal: 20
  },
  btnText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff'
  },
  subBtn: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  subBtnText: {
    color: '#fff',
    fontSize: 12
  }
});
