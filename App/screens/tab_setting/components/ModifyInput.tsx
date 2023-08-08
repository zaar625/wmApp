import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState } from 'react';

const ModifyInput = () => {
  const [inputFocusActive, setInputFocusActive] = useState(false);

  const onFocusInput = () => {
    setInputFocusActive(true);
  };

  const onEndEditing = () => {
    setInputFocusActive(false);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>이름</Text>
      <TextInput
        defaultValue="이상윤"
        onFocus={onFocusInput}
        onEndEditing={onEndEditing}
        placeholder="이름을 입력해주세요."
        style={[styles.input, inputFocusActive ? styles.focusInput : null]}
      />
    </View>
  );
};

export default ModifyInput;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20
  },
  label: {
    color: '#FFF',
    marginBottom: 20
  },
  input: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#202632',
    color: '#FFF'
  },
  focusInput: {
    borderBottomWidth: 2,
    borderBottomColor: '#326273'
  }
});
