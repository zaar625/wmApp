import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import EyeIcon from '../../assets/icon/eye.svg';
import CloseIcon from '../../assets/icon/close.svg';
import CheckIcon from '../../assets/icon/check_round.svg';
import InputBox from '../login/InputBox';
import NomalButton from '../../components/buttons/NomarButton';
import { userSaveInfo } from '../../state/slice/user';

import { useDispatch } from 'react-redux';
import ErrorGuide from '../../components/ErrorGuide';

const PasswordForm = () => {
  const [inputFocusActive, setInputFocusActive] = useState(false);
  const [inputText, setInputText] = useState('');
  const [passwordView, setPasswordView] = useState(true);
  const [btnActive, setBtnActive] = useState(false);

  const dispatch = useDispatch();

  const passwordInputRef = useRef<null | TextInput>(null);
  const checkedPasswordRef = useRef<null | TextInput>(null);

  const [passwordCheckError, setPasswordCheckError] = useState({
    error: false,
    errorMessage: '입력하신 비밀번호가 달라요!'
  });

  const [passwordInputError, setPasswordInputError] = useState({
    error: false,
    errorMessage: '비밀번호 조합을 확인해 주세요!'
  });

  const [passwordType, setPasswordType] = useState([
    { name: '영문', useable: false },
    { name: '숫자', useable: false },
    { name: '8-12자', useable: false }
  ]);

  const passwordRegExp = (text: string) => {
    const newPasswordData = [...passwordType];

    let includeEng = text.search(/[a-z]/gi);
    let includeNum = text.search(/[0-9]/g);
    let totalLength = text.trim().length >= 8 && text.trim().length < 13;

    if (!text.length) newPasswordData.forEach(el => (el.useable = false));

    includeEng === -1 ? (newPasswordData[0].useable = false) : (newPasswordData[0].useable = true);
    includeNum === -1 ? (newPasswordData[1].useable = false) : (newPasswordData[1].useable = true);
    totalLength ? (newPasswordData[2].useable = true) : (newPasswordData[2].useable = false);

    setPasswordType(newPasswordData);
  };

  const checkedPassword = () => {
    const IsusablePassword = passwordType.every(type => type.useable === true);

    return IsusablePassword;
  };

  const inputFocused = () => {
    setInputFocusActive(true);
    passwordRegExp(inputText);
    setPasswordInputError({ ...passwordInputError, error: false });
  };

  const onChangeText = (inputText: string) => {
    setInputText(inputText);
    passwordRegExp(inputText);
  };

  useEffect(() => {
    passwordInputRef.current?.focus();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.label}>비밀번호</Text>
        <View style={styles.firstPasswordInputWrapper}>
          <View>
            <TextInput
              ref={passwordInputRef}
              placeholder="비밀번호를 입력해주세요."
              style={[styles.input, inputFocusActive && styles.focusedInput]}
              onFocus={inputFocused}
              onBlur={() => setInputFocusActive(false)}
              onChangeText={onChangeText}
              autoCapitalize="none"
              value={inputText}
              secureTextEntry={passwordView}
              onEndEditing={() => {
                if (checkedPassword()) {
                  checkedPasswordRef.current?.focus();
                } else {
                  setPasswordInputError({ ...passwordInputError, error: true });
                }
              }}
            />
            {inputText.length > 0 && (
              <View style={styles.iconWrapper}>
                <Pressable onPress={() => setPasswordView(!passwordView)} hitSlop={15}>
                  <EyeIcon width={20} height={20} color={'#797979'} style={{ marginRight: 10 }} />
                </Pressable>

                <Pressable onPress={() => setInputText('')} hitSlop={15}>
                  <CloseIcon width={20} height={20} color={'#fff'} />
                </Pressable>
              </View>
            )}
            {passwordInputError.error && <ErrorGuide message={passwordInputError.errorMessage} />}
          </View>
          <View style={styles.checkPasswordWrapper}>
            {passwordType.map((item, index) => (
              <View key={item.name} style={styles.checkIconWrapper}>
                <CheckIcon
                  width={15}
                  height={15}
                  color={passwordType[index].useable ? '#00B712' : '#797979'}
                  style={{ marginRight: 3 }}
                />
                <Text style={{ color: passwordType[index].useable ? '#00B712' : '#797979' }}>
                  {item.name}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <InputBox
          ref={checkedPasswordRef}
          label="비밀번호 확인"
          placeholder="비밀번호를 재 입력해주세요"
          eyeIconVisible
          closeIconVisible
          onEndEditing={({ nativeEvent: { text } }) => {
            if (text !== inputText) {
              setBtnActive(false);
              dispatch(userSaveInfo(''));
              setPasswordCheckError({ ...passwordCheckError, error: true });
            } else {
              setBtnActive(true);
              dispatch(userSaveInfo(text));
            }
          }}
          errorType={{ errType: passwordCheckError, handler: setPasswordCheckError }}
        />
      </View>
      <NomalButton
        name="가입하기"
        onPress={() => {
          if (btnActive && checkedPassword()) {
            console.log('회원가입이 완료되었습니다.');
          }
        }}
      />
    </>
  );
};

export default PasswordForm;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    marginBottom: 20,
    paddingHorizontal: 20
  },
  label: {
    marginBottom: 20,
    color: '#fff'
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#202632',
    paddingBottom: 10,
    color: '#fff',
    fontSize: 16
  },
  focusedInput: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#326273'
  },
  errorInput: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#FB6464'
  },
  iconWrapper: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0
  },

  checkPasswordWrapper: {
    flexDirection: 'row',
    marginTop: 10
  },
  checkIconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5
  },
  checkIconText: {
    color: '#797979'
  },
  firstPasswordInputWrapper: {
    marginBottom: 40
  }
});
