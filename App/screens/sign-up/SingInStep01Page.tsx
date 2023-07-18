import { StyleSheet, Text, View, Platform, ScrollView } from 'react-native';
import React, { useRef, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';

import ScreenTitle from '../../components/ScreenTitle';
import InputBox from '../login/InputBox';
import NomalButton from '../../components/buttons/NomarButton';

import { colors } from '../../theme';
import { TextInput } from 'react-native-gesture-handler';

const SingInStep01 = () => {
  const nameInputRef = useRef<null | TextInput>(null);
  const emailInputRef = useRef<null | TextInput>(null);
  const phoneInputRef = useRef<null | TextInput>(null);

  const inputSubmit = ({ next }: { next: string }) => {
    if (next === 'email') emailInputRef.current?.focus();
    if (next === 'password') phoneInputRef.current?.focus();
  };

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <ScreenTitle title="회원정보 입력" />
        <View style={styles.form}>
          <InputBox
            ref={nameInputRef}
            label="이름"
            placeholder="이름을 입력해주세요."
            onSubmitEditing={() => inputSubmit({ next: 'email' })}
            eyeIconVisible={false}
            closeIconVisible={true}
          />
          <InputBox
            ref={emailInputRef}
            label="이메일"
            placeholder="이메일을 입력해주세요."
            onSubmitEditing={() => inputSubmit({ next: 'password' })}
            eyeIconVisible={false}
            closeIconVisible={true}
          />
          <InputBox
            ref={phoneInputRef}
            label="휴대폰 번호"
            placeholder="휴대폰 번호를 입력해주세요."
            eyeIconVisible={false}
            closeIconVisible={false}
            keyboardType="number-pad"
            onSelectionChange={({ nativeEvent: { selection } }) => {
              const { end: phoneNumLengthValue } = selection;
              if (phoneNumLengthValue === 11) Keyboard.dismiss();
            }}
          />
        </View>
        <NomalButton name="다음" onPress={() => {}} />
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
  }
});
