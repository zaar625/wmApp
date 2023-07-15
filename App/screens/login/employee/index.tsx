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

import InputBox from '../InputBox';

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
        <Text style={styles.titleText}>로그인하기</Text>

        <InputBox
          ref={emailInputRef}
          onSubmitEditing={inputSubmit}
          placeholder="이메일을 입력해주세요."
          label="이메일"
        />
        <InputBox ref={passwordInputRef} placeholder="비밀번호를 입력해주세요." label="비밀번호" />

        <Pressable style={({ pressed }) => [styles.Btn, { opacity: pressed ? 0.6 : 1 }]}>
          <Text style={styles.btnText}>로그인</Text>
        </Pressable>
        {/* 회원가입 및 비밀번호 */}
        <View style={styles.subBtn}>
          <Pressable onPress={() => navigation.navigate('joinPage')}>
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
    flex: 1,
    paddingHorizontal: 20
  },
  titleText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 36,
    marginBottom: 40
  },
  Btn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    backgroundColor: '#326273',
    borderRadius: 10
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
