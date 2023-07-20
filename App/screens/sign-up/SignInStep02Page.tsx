import { StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import ScreenTitle from '../../components/ScreenTitle';
import PasswordForm from './PasswordForm';
import { colors } from '../../theme';
import NomalButton from '../../components/buttons/NomarButton';

const SignInStep02Page = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <ScreenTitle title="비밀번호 입력" />
        <PasswordForm />
        <NomalButton
          name="가입하기"
          onPress={() => {
            console.log('가입하기');
          }}
        />
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
