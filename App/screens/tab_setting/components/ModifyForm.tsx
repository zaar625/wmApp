import { StyleSheet, Text, View, TextInput, TextInputProps } from 'react-native';
import React, { useState } from 'react';

interface IModifyFormProps extends TextInputProps {
  label: string;
}

const ModifyForm = ({ label, ...props }: IModifyFormProps) => {
  const [inputFocusActive, setInputFocusActive] = useState(false);

  const onFocusInput = () => {
    setInputFocusActive(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...props}
        onBlur={() => setInputFocusActive(false)}
        onFocus={onFocusInput}
        style={[styles.input, inputFocusActive ? styles.focusInput : null]}
      />
    </View>
  );
};

export default ModifyForm;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 30
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
