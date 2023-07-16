import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageTitle from '../../components/PageTitle';

import InputBox from '../login/InputBox';
import Certification from './Certification';

const JoinPage = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.bg}>
        <PageTitle title="회원정보입력" />
        <InputBox placeholder="이름을 입력해주세요." label="이름" />
        <InputBox placeholder="이메일을 입력해주세요." label="이메일" />
        <Certification />
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
