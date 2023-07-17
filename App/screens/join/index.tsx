import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import ScreenTitle from '../../components/ScreenTitle';
import InputBox from '../login/InputBox';
import Certification from './Certification';
import Button from '../../components/Button';
import auth from '@react-native-firebase/auth';
import { signUp } from '../../api/auth';

const JoinPage = () => {
  const signIn = async () => {
    const { email, password } = form;
    const info = { email, password };
    try {
      const { user } = await signUp(info);
      await user.sendEmailVerification({
        handleCodeInApp: true,
        url: 'work-magement-app.web.app'
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const inputTextHandler = (name: string) => (value: string) => {
    setForm({ ...form, [name]: value });
  };

  console.log(form);
  return (
    <SafeAreaView style={styles.bg}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <ScreenTitle title="회원정보입력" />
          <InputBox placeholder="이름을 입력해주세요." label="이름" />
          <InputBox
            placeholder="이메일을 입력해주세요."
            label="이메일"
            onChangeText={inputTextHandler('email')}
            value={form.email}
          />
          {/* <Certification /> */}
          <InputBox
            placeholder="비밀번호를 입력해주세요."
            label="비밀번호"
            onChangeText={inputTextHandler('password')}
            value={form.password}
          />
          <InputBox placeholder="입력한 비밀번호를 재 입력해주세요." label="비밀번호 확인" />
        </ScrollView>
      </KeyboardAvoidingView>
      <Button name="가입하기" onPress={signIn} />
    </SafeAreaView>
  );
};

export default JoinPage;

const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#30394B',
    flex: 1,
    paddingHorizontal: 20
  }
});
