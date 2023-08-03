import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../type';
import InputBox from '../login/InputBox';
import Button from '../../components/buttons/Button';
import { userSaveInfo } from '../../state/slice/user';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../state/store';
import { signUp } from '../../api/auth';
import ErrorGuide from '../../components/ErrorGuide';
import { openModal, closeModal } from '../../state/slice/modal';
import { ERROR_MESSEGE } from '../../constant';
import SvgIcon from '../../components/SvgIcon';
import themeChange from '../../util/theme';
import { createUser } from '../../api/users';

const PasswordForm = () => {
  const themeMode = themeChange();

  const [inputFocusActive, setInputFocusActive] = useState(false);
  const [inputText, setInputText] = useState('');
  const [passwordView, setPasswordView] = useState(true);
  const [btnActive, setBtnActive] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { email, password, name, phone } = useSelector((state: RootState) => state.user);

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

  const userSignUp = async () => {
    const signUpForm = { email, password };
    try {
      const { user } = await signUp(signUpForm);
      console.log('user:', user.uid);
      console.log(email, password, name, phone);
      if (user) {
        dispatch(
          openModal({
            modalType: 'OneBtnModal',
            isOpen: true,
            contents: {
              title: '회원가입이 완료되었습니다.',
              content: `안녕하세요. 이상윤님${'\n'}앱을 이용해주셔서 감사합니다.`,
              onPress() {
                dispatch(closeModal());
                navigation.navigate('bottomTab');
                createUser({ id: user.uid, name, email, phone });
              }
            }
          })
        );
      }
    } catch (e: any) {
      console.log(e);
      dispatch(
        openModal({
          modalType: 'OneBtnModal',
          isOpen: true,
          contents: {
            title: ERROR_MESSEGE[e.code],
            content: `이미 가입이 되어있습니다.${'\n'}비밀번호를 잊으셨다면 비밀번호 찾기를 해주세요.`,
            onPress() {
              dispatch(closeModal());
              navigation.navigate('employeeLoginPage');
            }
          }
        })
      );
    } finally {
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={[styles.label, { color: themeMode.tint }]}>비밀번호</Text>
        <View style={styles.firstPasswordInputWrapper}>
          <View>
            <TextInput
              ref={passwordInputRef}
              placeholder="비밀번호를 입력해주세요."
              style={[
                styles.input,
                inputFocusActive && styles.focusedInput,
                { color: themeMode.tint }
              ]}
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
                  <SvgIcon
                    name="eye"
                    width={20}
                    height={20}
                    color={themeMode.pressIcon}
                    style={{ marginRight: 10 }}
                  />
                </Pressable>

                <Pressable onPress={() => setInputText('')} hitSlop={15}>
                  <SvgIcon name="close_round" width={20} height={20} color={'#FFF'} />
                </Pressable>
              </View>
            )}
            {passwordInputError.error && <ErrorGuide message={passwordInputError.errorMessage} />}
          </View>
          <View style={styles.checkPasswordWrapper}>
            {passwordType.map((item, index) => (
              <View key={item.name} style={styles.checkIconWrapper}>
                <SvgIcon
                  name="check_round"
                  width={15}
                  height={15}
                  color={passwordType[index].useable ? '#00B712' : themeMode.pressIcon}
                  style={{ marginRight: 3 }}
                />
                <Text
                  style={{ color: passwordType[index].useable ? '#00B712' : themeMode.pressIcon }}
                >
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
              dispatch(userSaveInfo({ password: text }));
            }
          }}
          errorType={{ errType: passwordCheckError, handler: setPasswordCheckError }}
        />
      </View>
      <Button
        name="가입하기"
        onPress={() => {
          if (btnActive && checkedPassword()) {
            userSignUp();
          }
        }}
      />
    </View>
  );
};

export default PasswordForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  form: {
    paddingVertical: 20,
    marginBottom: 20,
    paddingHorizontal: 20
  },
  label: {
    marginBottom: 20
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#202632',
    paddingBottom: 10,
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
