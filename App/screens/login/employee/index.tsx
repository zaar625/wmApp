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

import ScreenTitle from '../../../components/ScreenTitle';
import InputBox from '../InputBox';
import NomalButton from '../../../components/buttons/NomarButton';
import Button from '../../../components/buttons/Button';
import { useDispatch } from 'react-redux';

export default function EmployeeLoginPage({ navigation }: NavigationScreenProps) {
  const dispatch = useDispatch();
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

  const errorHandler = (error: unknown) => {
    const a = ERROR_MESSEGE[e.code];
    console.log(a);
    // 변수 a 에 이메일단어가 들어가면, 비밀번호가 들어가면, 할 액션을 취하시오
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
    } catch (error) {
      errorHandler(error);
    } finally {
      console.log('finally');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.bg}>
        <ScreenTitle title="로그인하기" />
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
            />
            <InputBox
              ref={passwordInputRef}
              placeholder="비밀번호를 입력해주세요."
              label="비밀번호"
              eyeIconVisible
              closeIconVisible
              onEndEditing={({ nativeEvent: { text } }) => {
                console.log('?');
                setLoginform({ ...loginform, password: text });
              }}
            />
          </View>
          {/* 회원가입 및 비밀번호 */}
          <View>
            <View style={styles.subBtn}>
              <Pressable onPress={() => navigation.navigate('singInStep01Page')}>
                <Text style={[styles.subBtnText]}>회원가입</Text>
              </Pressable>
              <View
                style={{
                  height: '60%',
                  backgroundColor: '#C9C9C9',
                  width: 1,
                  marginHorizontal: 10
                }}
              />
              <Text style={styles.subBtnText}>비밀번호찾기</Text>
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
    color: '#fff',
    fontSize: 12
  }
});
