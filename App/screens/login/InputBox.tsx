import {
  NativeSyntheticEvent,
  TextInputSelectionChangeEventData,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  KeyboardTypeOptions,
  TextInputEndEditingEventData
} from 'react-native';
import React, { useState } from 'react';
import ErrorGuide from '../../common-components/ErrorGuide';
import themeChange from '../../util/theme';

import SvgIcon from '../../common-components/SvgIcon';

interface Props {
  defaultValue?: any;
  onSubmitEditing?: (e: any) => void;
  placeholder: string;
  label: string;
  eyeIconVisible: boolean;
  closeIconVisible: boolean;
  keyboardType?: KeyboardTypeOptions;
  onEndEditing?: (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => void;
  onSelectionChange?: (e: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => void;
  errorType?: { errType: any; handler: React.Dispatch<React.SetStateAction<any>> };
}

export default React.forwardRef(function InputBox(
  { eyeIconVisible, closeIconVisible, ...props }: Props,
  ref: any
) {
  const themeMode = themeChange();

  const [inputFocusActive, setInputFocusActive] = useState(false);
  const [inputText, setInputText] = useState('');
  const [passwordView, setPasswordView] = useState(true);

  const errorObj = props.errorType?.errType;

  const inputFocused = () => {
    setInputFocusActive(true);
    if (props.errorType) {
      props.errorType.handler({ ...props.errorType.errType, error: false });
    }
  };

  const onChangeText = (inputText: string) => {
    setInputText(inputText);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: themeMode.tint }]}>{props.label}</Text>
      <View>
        <TextInput
          ref={ref}
          {...props}
          style={[
            styles.input,
            inputFocusActive && styles.focusedInput,
            errorObj?.error && styles.errorInput,
            { color: themeMode.tint }
          ]}
          onFocus={inputFocused}
          onBlur={() => setInputFocusActive(false)}
          onChangeText={onChangeText}
          autoCapitalize="none"
          value={inputText}
          secureTextEntry={
            props.label === '비밀번호' || props.label === '비밀번호 확인' ? passwordView : false
          }
        />
        {inputText.length > 0 && (
          <View style={styles.iconWrapper}>
            {eyeIconVisible && (
              <Pressable onPress={() => setPasswordView(!passwordView)} hitSlop={15}>
                <SvgIcon
                  name="eye"
                  width={20}
                  height={20}
                  color={themeMode.pressIcon}
                  style={{ marginRight: 10 }}
                />
              </Pressable>
            )}
            {closeIconVisible && (
              <Pressable onPress={() => setInputText('')} hitSlop={15}>
                <SvgIcon name="close_round" width={20} height={20} color={'#FFF'} />
              </Pressable>
            )}
          </View>
        )}
      </View>
      {errorObj?.error && <ErrorGuide message={errorObj.errorMessage} />}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    marginBottom: 20
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
  errorWrapper: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center'
  },
  errorMessage: {
    fontSize: 13,
    color: '#FB6464'
  }
});
