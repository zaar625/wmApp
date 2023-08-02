import { StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenTitle } from '../../components/Title';
import PasswordForm from './PasswordForm';
import themeChange from '../../util/theme';

const SignInStep02Page = () => {
  const themeMode = themeChange();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[styles.container, { backgroundColor: themeMode.primary }]}>
        <ScreenTitle title="비밀번호 입력" style={{ paddingHorizontal: 20 }} />
        <PasswordForm />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignInStep02Page;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
