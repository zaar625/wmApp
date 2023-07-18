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

import EyeIcon from '../../assets/icon/eye.svg';
import CloseIcon from '../../assets/icon/close.svg';

interface Props {
  onSubmitEditing?: (e: any) => void;
  placeholder: string;
  label: string;
  eyeIconVisible: boolean;
  closeIconVisible: boolean;
  keyboardType?: KeyboardTypeOptions;
  onEndEditing?: (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => void;
  onSelectionChange?: (e: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => void;
}

export default React.forwardRef(function InputBox(
  { eyeIconVisible, closeIconVisible, ...args }: Props,
  ref: any
) {
  const [inputFocusActive, setInputFocusActive] = useState(false);
  const [inputText, setInputText] = useState('');
  const [passwordView, setPasswordView] = useState(true);

  const inputFocused = () => {
    setInputFocusActive(true);
  };

  const onChangeText = (inputText: string) => {
    setInputText(inputText);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{args.label}</Text>
      <View>
        <TextInput
          ref={ref}
          {...args}
          style={[styles.input, inputFocusActive && styles.focusedInput]}
          onFocus={inputFocused}
          onBlur={() => setInputFocusActive(false)}
          onChangeText={onChangeText}
          autoCapitalize="none"
          value={inputText}
          secureTextEntry={args.label === '비밀번호' ? passwordView : false}
        />
        {inputText.length > 0 && (
          <View style={styles.iconWrapper}>
            {eyeIconVisible && (
              <Pressable onPress={() => setPasswordView(!passwordView)} hitSlop={15}>
                <EyeIcon width={20} height={20} color={'#797979'} style={{ marginRight: 10 }} />
              </Pressable>
            )}
            {closeIconVisible && (
              <Pressable onPress={() => setInputText('')} hitSlop={15}>
                <CloseIcon width={20} height={20} color={'#fff'} />
              </Pressable>
            )}
          </View>
        )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    marginBottom: 20
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
    borderBottomWidth: 2,
    borderBottomColor: '#326273'
  },
  iconWrapper: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0
  }
});
