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
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import PageTitle from '../../components/PageTitle';
import InputBox from '../login/InputBox';
import Certification from './Certification';
import Button from '../../components/Button';

const JoinPage = () => {
  const signIn = () => {
    console.log('signIn');
  };

  return (
    <SafeAreaView style={styles.bg}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <PageTitle title="회원정보입력" />
          <InputBox placeholder="이름을 입력해주세요." label="이름" />
          <InputBox placeholder="이메일을 입력해주세요." label="이메일" />
          <Certification />
          <InputBox placeholder="비밀번호를 입력해주세요." label="비밀번호" />
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
