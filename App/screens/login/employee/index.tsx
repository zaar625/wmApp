import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Pressable
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationScreenProps } from '../../../type';
import { signIn } from '../../../api/auth';
import { ERROR_MESSEGE } from '../../../constant';
import { ScreenTitle } from '../../../common-components/Title';
import InputBox from '../InputBox';
import Button from '../../../common-components/buttons/Button';
import themeChange from '../../../util/theme';

export default function EmployeeLoginPage({ navigation }: NavigationScreenProps) {
  const themeMode = themeChange();
  const emailInputRef = useRef<null | TextInput>(null);
  const passwordInputRef = useRef<null | TextInput>(null);

  const [loginform, setLoginform] = useState({
    email: '',
    password: ''
  });

  const [emailSignInError, setemailSignInError] = useState({
    error: false,
    errorMessage: '일치하는 계정이 없습니다!'
  });
  const [passwordSignInError, setPasswordSignInError] = useState({
    error: false,
    errorMessage: '비밀번호가 틀렸습니다. 다시 입력해주세요!'
  });

  const errorHandler = (error: any) => {
    const firebaseError = ERROR_MESSEGE[error.code];
    const msgRegex = /이메일|계정/g;
    if (msgRegex.test(firebaseError)) {
      setemailSignInError({ error: true, errorMessage: firebaseError });
    } else {
      setPasswordSignInError({ error: true, errorMessage: firebaseError });
    }
  };

  const inputSubmit = () => {
    passwordInputRef.current?.focus();
  };

  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  const login = async () => {
    try {
      const { user } = await signIn(loginform);
      if (user) {
        navigation.reset({ index: 0, routes: [{ name: 'bottomTab' }] });
      }
    } catch (error) {
      console.log(error);
      errorHandler(error);
    } finally {
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[styles.bg, { backgroundColor: themeMode.primary }]}>
        <ScreenTitle title="로그인하기" style={{ paddingHorizontal: 20 }} />
        <View style={styles.content}>
          <View style={styles.form}>
            <InputBox
              ref={emailInputRef}
              onSubmitEditing={inputSubmit}
              placeholder="이메일을 입력해주세요."
              label="이메일"
              eyeIconVisible={false}
              closeIconVisible
              onEndEditing={({ nativeEvent: { text } }) => {
                setLoginform({ ...loginform, email: text });
              }}
              errorType={{ errType: emailSignInError, handler: setemailSignInError }}
            />
            <InputBox
              ref={passwordInputRef}
              placeholder="비밀번호를 입력해주세요."
              label="비밀번호"
              eyeIconVisible
              closeIconVisible
              onEndEditing={({ nativeEvent: { text } }) => {
                setLoginform({ ...loginform, password: text });
              }}
              errorType={{ errType: passwordSignInError, handler: setPasswordSignInError }}
            />
          </View>
          {/* 하단 회원가입 및 비밀번호 */}
          <View>
            <View style={styles.subBtn}>
              <Pressable onPress={() => navigation.navigate('singInStep01Page')}>
                <Text style={[styles.subBtnText, { color: themeMode.tint }]}>회원가입</Text>
              </Pressable>
              <View
                style={{
                  height: '60%',
                  backgroundColor: '#C9C9C9',
                  width: 1,
                  marginHorizontal: 10
                }}
              />
              <Text style={[styles.subBtnText, { color: themeMode.tint }]}>비밀번호찾기</Text>
            </View>
            <Button name="로그인" onPress={login} />
          </View>
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
  content: {
    justifyContent: 'space-between',
    flex: 1
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
    marginBottom: 20
  },
  subBtnText: {
    fontSize: 12
  }
});
