import { StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenTitle } from '../../components/Title';
import PasswordForm from './PasswordForm';
import { colors } from '../../theme';

const SignInStep02Page = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <ScreenTitle title="비밀번호 입력" />
        <PasswordForm />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignInStep02Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.primary
  }
});
