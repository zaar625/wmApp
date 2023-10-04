import { StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenTitle } from '../../common-components/Title';
import PasswordForm from './PasswordForm';
import themeChange from '../../util/theme';
import Loader from '../../common-components/Loader';

const SignInStep02Page = () => {
  const themeMode = themeChange();
  const [loading, setIsLoading] = useState(false);
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={[styles.container, { backgroundColor: themeMode.primary }]}>
          <ScreenTitle title="비밀번호 입력" style={{ paddingHorizontal: 20 }} />
          <PasswordForm setIsLoading={setIsLoading} />
        </SafeAreaView>
      </TouchableWithoutFeedback>
      {loading && <Loader />}
    </>
  );
};

export default SignInStep02Page;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
